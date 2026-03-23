import { ColorAqua500, IconLink, IconQuote, IllustrationMappinMint } from '@pop-ui/foundation';
import React, { useMemo } from 'react';

import { createBlockStyles, type IBlockStyles } from '../styles/editorStyles';
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
  /** 기본 인라인 스타일 적용 여부 (기본 true). false이면 완전 unstyled → classNames로 커스텀 */
  styled?: boolean;
  /** 블록 간 간격 (px, 기본 16). styled=true일 때만 적용 */
  blockSpacing?: number;
  /** 줄간격 (기본 '175%'). styled=true일 때만 적용 */
  lineHeight?: number | string;
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
  s: IBlockStyles | null,
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
          style={{
            ...(onHashtagClick ? { cursor: 'pointer' } : undefined),
            ...(!classNames.hashtag && s ? { color: ColorAqua500 } : undefined),
          }}
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
    textUnderlinePosition: node.underline ? 'from-font' : undefined,
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
        style={!classNames.link ? s?.inlineLink : undefined}
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
  s: IBlockStyles | null,
  onHashtagClick?: (hashtag: string) => void,
): React.ReactNode[] {
  return children.map((child, i) => renderInlineText(child, i, classNames, s, onHashtagClick));
}

// ============ Block renderers ============

function renderParagraph(
  el: IPElement,
  classNames: IBlockClassNames,
  s: IBlockStyles | null,
  onHashtagClick?: (h: string) => void,
): React.ReactNode {
  return (
    <p className={classNames.paragraph} style={!classNames.paragraph ? s?.paragraph : undefined}>
      {renderChildren(el.children, classNames, s, onHashtagClick)}
    </p>
  );
}

function renderHeading(
  el: IH1Element | IH2Element | IH3Element,
  classNames: IBlockClassNames,
  s: IBlockStyles | null,
  onHashtagClick?: (h: string) => void,
  headingOffset = 0,
): React.ReactNode {
  const baseLevel = Number(el.type[1]) as 1 | 2 | 3;
  const level = Math.min(baseLevel + headingOffset, 6) as 1 | 2 | 3 | 4 | 5 | 6;
  const Tag = `h${level}` as const;
  const classMap = { h1: classNames.heading1, h2: classNames.heading2, h3: classNames.heading3 };
  const styleMap = { h1: s?.heading1, h2: s?.heading2, h3: s?.heading3 };

  return (
    <Tag
      className={classMap[el.type]}
      style={!classMap[el.type] ? styleMap[el.type] : undefined}
      {...(headingOffset > 0 ? { 'data-original-type': el.type } : {})}
    >
      {renderChildren(el.children, classNames, s, onHashtagClick)}
    </Tag>
  );
}

function renderUl(
  el: IUlElement,
  classNames: IBlockClassNames,
  s: IBlockStyles | null,
  onHashtagClick?: (h: string) => void,
): React.ReactNode {
  return (
    <ul className={classNames.list} style={!classNames.list ? s?.ulList : undefined}>
      {el.children.map((li, i) => (
        <li
          key={i}
          className={classNames.listItem}
          style={!classNames.listItem ? s?.listItem : undefined}
        >
          {renderChildren(li.children, classNames, s, onHashtagClick)}
        </li>
      ))}
    </ul>
  );
}

function renderOl(
  el: IOlElement,
  classNames: IBlockClassNames,
  s: IBlockStyles | null,
  onHashtagClick?: (h: string) => void,
): React.ReactNode {
  return (
    <ol className={classNames.list} style={!classNames.list ? s?.olList : undefined}>
      {el.children.map((li, i) => (
        <li
          key={i}
          className={classNames.listItem}
          style={!classNames.listItem ? s?.listItem : undefined}
        >
          {renderChildren(li.children, classNames, s, onHashtagClick)}
        </li>
      ))}
    </ol>
  );
}

function renderImg(
  el: IImgElement,
  classNames: IBlockClassNames,
  s: IBlockStyles | null,
  onImageClick?: (src: string) => void,
): React.ReactNode {
  if (s && !classNames.image) {
    return (
      <figure style={s.imageWrapper}>
        <img
          src={el.src}
          alt={el.alt ?? ''}
          style={{
            ...s.image,
            ...(onImageClick ? { cursor: 'pointer' } : undefined),
          }}
          onClick={onImageClick ? () => onImageClick(el.src) : undefined}
        />
        {el.caption && <figcaption style={s.imageCaption}>{el.caption}</figcaption>}
      </figure>
    );
  }
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

function renderA(
  el: IAElement,
  classNames: IBlockClassNames,
  s: IBlockStyles | null,
): React.ReactNode {
  const href = sanitizeHref(el.href);

  if (s && !classNames.link) {
    return (
      <div style={s.card}>
        <div style={s.cardIconContainer}>
          <IconLink size={20} color={ColorAqua500} />
        </div>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}
          >
            <span style={s.cardLinkText}>{el.href}</span>
          </a>
        ) : (
          <span style={s.cardLinkText}>{el.href}</span>
        )}
      </div>
    );
  }

  if (!href) {
    return <span className={classNames.link}>{el.href}</span>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classNames.link}>
      {href}
    </a>
  );
}

function renderHr(
  el: IHrElement,
  classNames: IBlockClassNames,
  s: IBlockStyles | null,
): React.ReactNode {
  if (s && !classNames.hr) {
    const variant = el.variant ?? 'default';
    return (
      <div style={s.hrWrapper}>
        <hr style={variant === 'short' ? s.hrShort : s.hrDefault} />
      </div>
    );
  }
  return <hr className={classNames.hr} data-variant={el.variant ?? 'default'} />;
}

function renderBlockquote(
  el: IBlockquoteElement,
  classNames: IBlockClassNames,
  s: IBlockStyles | null,
  onHashtagClick?: (h: string) => void,
): React.ReactNode {
  if (s && !classNames.blockquote) {
    const variant = el.variant ?? 'default';
    if (variant === 'solid') {
      return (
        <div style={s.blockquoteSolidContainer}>
          <blockquote style={s.blockquoteText}>
            {renderChildren(el.children, classNames, s, onHashtagClick)}
          </blockquote>
        </div>
      );
    }
    // default variant
    return (
      <div style={s.blockquoteDefaultContainer}>
        <IconQuote size={16} color="#9CA3AF" />
        <blockquote style={s.blockquoteDefaultText}>
          {renderChildren(el.children, classNames, s, onHashtagClick)}
        </blockquote>
        <IconQuote size={16} color="#9CA3AF" style={{ transform: 'rotate(180deg)' }} />
      </div>
    );
  }
  return (
    <blockquote className={classNames.blockquote} data-variant={el.variant ?? 'default'}>
      {renderChildren(el.children, classNames, s, onHashtagClick)}
    </blockquote>
  );
}

function renderSpot(
  el: ISpotElement,
  classNames: IBlockClassNames,
  s: IBlockStyles | null,
  onSpotClick?: (id: number) => void,
): React.ReactNode {
  if (s && !classNames.spot) {
    return (
      <div
        style={{
          ...s.card,
          ...(onSpotClick ? { cursor: 'pointer' } : undefined),
        }}
        onClick={onSpotClick ? () => onSpotClick(el.spotId) : undefined}
        data-spot-id={el.spotId}
      >
        <div style={s.cardIconContainer}>
          <IllustrationMappinMint size={32} />
        </div>
        <div style={s.cardInfo}>
          {el.spotName && <span style={s.cardName}>{el.spotName}</span>}
          {el.spotAddress && <span style={s.cardAddress}>{el.spotAddress}</span>}
        </div>
      </div>
    );
  }
  return (
    <div
      className={classNames.spot}
      onClick={onSpotClick ? () => onSpotClick(el.spotId) : undefined}
      style={onSpotClick ? { cursor: 'pointer' } : undefined}
      data-spot-id={el.spotId}
    >
      <IllustrationMappinMint size={32} />
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
  styled = true,
  blockSpacing,
  lineHeight,
  onHashtagClick,
  onSpotClick,
  onImageClick,
}: IBlockRendererProps) => {
  const s = useMemo(
    () => (styled ? createBlockStyles({ blockSpacing, lineHeight }) : null),
    [styled, blockSpacing, lineHeight],
  );

  return (
    <div className={classNames.wrapper}>
      {content.map((block, i) => {
        switch (block.type) {
          case 'p':
            return (
              <React.Fragment key={i}>
                {renderParagraph(block as IPElement, classNames, s, onHashtagClick)}
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
                  s,
                  onHashtagClick,
                  headingOffset,
                )}
              </React.Fragment>
            );
          case 'ul':
            return (
              <React.Fragment key={i}>
                {renderUl(block as IUlElement, classNames, s, onHashtagClick)}
              </React.Fragment>
            );
          case 'ol':
            return (
              <React.Fragment key={i}>
                {renderOl(block as IOlElement, classNames, s, onHashtagClick)}
              </React.Fragment>
            );
          case 'img':
            return (
              <React.Fragment key={i}>
                {renderImg(block as IImgElement, classNames, s, onImageClick)}
              </React.Fragment>
            );
          case 'a':
            return (
              <React.Fragment key={i}>{renderA(block as IAElement, classNames, s)}</React.Fragment>
            );
          case 'hr':
            return (
              <React.Fragment key={i}>
                {renderHr(block as IHrElement, classNames, s)}
              </React.Fragment>
            );
          case 'blockquote':
            return (
              <React.Fragment key={i}>
                {renderBlockquote(block as IBlockquoteElement, classNames, s, onHashtagClick)}
              </React.Fragment>
            );
          case 'spot':
            return (
              <React.Fragment key={i}>
                {renderSpot(block as ISpotElement, classNames, s, onSpotClick)}
              </React.Fragment>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
