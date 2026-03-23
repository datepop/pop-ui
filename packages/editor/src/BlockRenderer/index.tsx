import { IllustrationMappinMint } from '@pop-ui/foundation';
import React from 'react';

import { sanitizeHref } from '../utils/sanitizeHref';

import type {
  TEditorElement,
  ICustomText,
  IPElement,
  IH1Element,
  IH2Element,
  IH3Element,
  IUlElement,
  IOlElement,
  IImgElement,
  IAElement,
  IHrElement,
  IBlockquoteElement,
  ISpotElement,
} from '../types';

// ============ ClassNames ============

export interface IBlockClassNames {
  wrapper?: string;
  paragraph?: string;
  heading1?: string;
  heading2?: string;
  heading3?: string;
  list?: string;
  listItem?: string;
  image?: string;
  imageCaption?: string;
  spot?: string;
  blockquote?: string;
  hr?: string;
  link?: string;
  bold?: string;
  italic?: string;
  hashtag?: string;
}

// ============ Props ============

export interface IBlockRendererProps {
  content: TEditorElement[];
  classNames?: IBlockClassNames;
  /** heading 레벨 오프셋. 0(기본)이면 h1→h1, 1이면 h1→h2. 최대 h6까지. */
  headingOffset?: number;
  onHashtagClick?: (hashtag: string) => void;
  onSpotClick?: (spotId: number) => void;
  onImageClick?: (src: string) => void;
}

// ============ Hashtag text splitter ============

const HASHTAG_REGEX = /#([\w가-힣ㄱ-ㅎㅏ-ㅣ]+)/g;

interface ITextSegment {
  text: string;
  isHashtag: boolean;
  hashtag?: string;
}

function splitHashtags(text: string): ITextSegment[] {
  const segments: ITextSegment[] = [];
  let lastIndex = 0;
  HASHTAG_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = HASHTAG_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), isHashtag: false });
    }
    segments.push({ text: match[0], isHashtag: true, hashtag: match[1] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), isHashtag: false });
  }
  return segments;
}

// ============ Inline text renderer ============

function renderInlineText(
  node: ICustomText,
  index: number,
  classNames: IBlockClassNames,
  onHashtagClick?: (hashtag: string) => void,
): React.ReactNode {
  const segments = splitHashtags(node.text);

  const content = segments.map((seg, i) => {
    if (seg.isHashtag && seg.hashtag) {
      return (
        <span
          key={i}
          className={classNames.hashtag}
          onClick={onHashtagClick ? () => onHashtagClick(seg.hashtag!) : undefined}
          style={onHashtagClick ? { cursor: 'pointer' } : undefined}
        >
          {seg.text}
        </span>
      );
    }
    return seg.text;
  });

  const textStyle: React.CSSProperties = {
    color: node.color,
    textDecoration: node.underline ? 'underline' : undefined,
  };

  let el: React.ReactNode = (
    <span key={index} style={textStyle}>
      {content}
    </span>
  );

  if (node.bold) {
    el = <strong className={classNames.bold}>{el}</strong>;
  }
  if (node.italic) {
    el = <em className={classNames.italic}>{el}</em>;
  }
  if (node.href) {
    el = (
      <a
        href={sanitizeHref(node.href) ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames.link}
      >
        {el}
      </a>
    );
  }

  return el;
}

function renderChildren(
  children: ICustomText[],
  classNames: IBlockClassNames,
  onHashtagClick?: (hashtag: string) => void,
): React.ReactNode[] {
  return children.map((child, i) => renderInlineText(child, i, classNames, onHashtagClick));
}

// ============ Block renderers ============

function renderParagraph(
  el: IPElement,
  classNames: IBlockClassNames,
  onHashtagClick?: (h: string) => void,
): React.ReactNode {
  return (
    <p className={classNames.paragraph}>
      {renderChildren(el.children, classNames, onHashtagClick)}
    </p>
  );
}

function renderHeading(
  el: IH1Element | IH2Element | IH3Element,
  classNames: IBlockClassNames,
  onHashtagClick?: (h: string) => void,
  headingOffset = 0,
): React.ReactNode {
  const baseLevel = Number(el.type[1]) as 1 | 2 | 3;
  const level = Math.min(baseLevel + headingOffset, 6) as 1 | 2 | 3 | 4 | 5 | 6;
  const Tag = `h${level}` as const;
  const classMap = { h1: classNames.heading1, h2: classNames.heading2, h3: classNames.heading3 };

  return (
    <Tag
      className={classMap[el.type]}
      {...(headingOffset > 0 ? { 'data-original-type': el.type } : {})}
    >
      {renderChildren(el.children, classNames, onHashtagClick)}
    </Tag>
  );
}

function renderUl(
  el: IUlElement,
  classNames: IBlockClassNames,
  onHashtagClick?: (h: string) => void,
): React.ReactNode {
  return (
    <ul className={classNames.list}>
      {el.children.map((li, i) => (
        <li key={i} className={classNames.listItem}>
          {renderChildren(li.children, classNames, onHashtagClick)}
        </li>
      ))}
    </ul>
  );
}

function renderOl(
  el: IOlElement,
  classNames: IBlockClassNames,
  onHashtagClick?: (h: string) => void,
): React.ReactNode {
  return (
    <ol className={classNames.list}>
      {el.children.map((li, i) => (
        <li key={i} className={classNames.listItem}>
          {renderChildren(li.children, classNames, onHashtagClick)}
        </li>
      ))}
    </ol>
  );
}

function renderImg(
  el: IImgElement,
  classNames: IBlockClassNames,
  onImageClick?: (src: string) => void,
): React.ReactNode {
  return (
    <figure>
      <img
        src={el.src}
        alt={el.alt ?? ''}
        className={classNames.image}
        onClick={onImageClick ? () => onImageClick(el.src) : undefined}
        style={onImageClick ? { cursor: 'pointer' } : undefined}
      />
      {el.caption && <figcaption className={classNames.imageCaption}>{el.caption}</figcaption>}
    </figure>
  );
}

function renderA(el: IAElement, classNames: IBlockClassNames): React.ReactNode {
  const href = sanitizeHref(el.href);
  if (!href) {
    return <span className={classNames.link}>{el.href}</span>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classNames.link}>
      {href}
    </a>
  );
}

function renderHr(el: IHrElement, classNames: IBlockClassNames): React.ReactNode {
  return <hr className={classNames.hr} data-variant={el.variant ?? 'default'} />;
}

function renderBlockquote(
  el: IBlockquoteElement,
  classNames: IBlockClassNames,
  onHashtagClick?: (h: string) => void,
): React.ReactNode {
  return (
    <blockquote className={classNames.blockquote} data-variant={el.variant ?? 'default'}>
      {renderChildren(el.children, classNames, onHashtagClick)}
    </blockquote>
  );
}

function renderSpot(
  el: ISpotElement,
  classNames: IBlockClassNames,
  onSpotClick?: (id: number) => void,
): React.ReactNode {
  return (
    <div
      className={classNames.spot}
      onClick={onSpotClick ? () => onSpotClick(el.spotId) : undefined}
      style={onSpotClick ? { cursor: 'pointer' } : undefined}
      data-spot-id={el.spotId}
    >
      {el.spotThumbnail ? (
        <img src={el.spotThumbnail} alt={el.spotName ?? ''} />
      ) : (
        <IllustrationMappinMint size={32} />
      )}
      <div>
        {el.spotName && <span>{el.spotName}</span>}
        {el.spotAddress && <span>{el.spotAddress}</span>}
      </div>
    </div>
  );
}

// ============ Main component ============

export const BlockRenderer = ({
  content,
  classNames = {},
  headingOffset = 0,
  onHashtagClick,
  onSpotClick,
  onImageClick,
}: IBlockRendererProps) => {
  return (
    <div className={classNames.wrapper}>
      {content.map((block, i) => {
        switch (block.type) {
          case 'p':
            return (
              <React.Fragment key={i}>
                {renderParagraph(block as IPElement, classNames, onHashtagClick)}
              </React.Fragment>
            );
          case 'h1':
          case 'h2':
          case 'h3':
            return (
              <React.Fragment key={i}>
                {renderHeading(
                  block as IH1Element | IH2Element | IH3Element,
                  classNames,
                  onHashtagClick,
                  headingOffset,
                )}
              </React.Fragment>
            );
          case 'ul':
            return (
              <React.Fragment key={i}>
                {renderUl(block as IUlElement, classNames, onHashtagClick)}
              </React.Fragment>
            );
          case 'ol':
            return (
              <React.Fragment key={i}>
                {renderOl(block as IOlElement, classNames, onHashtagClick)}
              </React.Fragment>
            );
          case 'img':
            return (
              <React.Fragment key={i}>
                {renderImg(block as IImgElement, classNames, onImageClick)}
              </React.Fragment>
            );
          case 'a':
            return (
              <React.Fragment key={i}>{renderA(block as IAElement, classNames)}</React.Fragment>
            );
          case 'hr':
            return (
              <React.Fragment key={i}>{renderHr(block as IHrElement, classNames)}</React.Fragment>
            );
          case 'blockquote':
            return (
              <React.Fragment key={i}>
                {renderBlockquote(block as IBlockquoteElement, classNames, onHashtagClick)}
              </React.Fragment>
            );
          case 'spot':
            return (
              <React.Fragment key={i}>
                {renderSpot(block as ISpotElement, classNames, onSpotClick)}
              </React.Fragment>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
