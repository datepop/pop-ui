import { useCallback, useImperativeHandle, type ForwardedRef } from 'react';
import {
  Editor,
  Element as SlateElement,
  Node,
  type Point,
  Text as SlateText,
  Transforms,
} from 'slate';
import { ReactEditor } from 'slate-react';

import { insertNodesWithFocus, prepareInsertPosition } from './insertUtils';
import { sanitizeHref } from '../../utils/sanitizeHref';
import { createEmptyParagraph } from '../../utils/transforms';

import type {
  IAElement,
  IBlockquoteElement,
  IHrElement,
  IH1Element,
  IImgElement,
  ILiElement,
  IOlElement,
  ISpotElement,
  TCustomEditor,
  TEditorElement,
  IUlElement,
} from '../../types';

export interface ISpotInsertData {
  id: number;
  name: string;
  address?: string;
  thumbnail?: string;
}

export interface IEditorRef {
  focus(): void;
  scrollToHashtag(hashtag: string): boolean;
  insertTextBlockAtStart(): void;
  insertImages(imageUrls: string[]): void;
  insertSpots(spots: ISpotInsertData[]): void;
  removeSpotById(spotId: number): boolean;
  insertH1(): void;
  insertUl(): void;
  insertOl(): void;
  insertLink(href: string): void;
  insertHr(variant?: IHrElement['variant']): void;
  insertBlockquote(variant?: IBlockquoteElement['variant']): void;
}

interface IUseEditorMethodsProps {
  editor: TCustomEditor;
  ref: ForwardedRef<IEditorRef>;
}

export const useEditorMethods = ({ editor, ref }: IUseEditorMethodsProps) => {
  const prepareInsert = useCallback(() => prepareInsertPosition(editor), [editor]);

  const insertWithFocus = useCallback(
    (nodesToInsert: TEditorElement[], insertAt: number, needsTrailingTextBlock: boolean) =>
      insertNodesWithFocus(editor, nodesToInsert, insertAt, needsTrailingTextBlock),
    [editor],
  );

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        ReactEditor.focus(editor);
        Transforms.select(editor, Editor.start(editor, [0]));
      },

      scrollToHashtag: (hashtag: string) => {
        const hashtagRegex = /#([\w가-힣ㄱ-ㅎㅏ-ㅣ]+)/g;
        for (const [node, path] of Node.texts(editor)) {
          if (SlateText.isText(node)) {
            hashtagRegex.lastIndex = 0;
            let match;
            while ((match = hashtagRegex.exec(node.text)) !== null) {
              if (match[1] === hashtag) {
                const start = match.index;
                const point: Point = { path, offset: start };
                Transforms.select(editor, {
                  anchor: point,
                  focus: { path, offset: start + match[0].length },
                });
                ReactEditor.focus(editor);
                ReactEditor.toDOMNode(editor, node)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center',
                });
                return true;
              }
            }
          }
        }
        return false;
      },

      insertTextBlockAtStart: () => {
        Transforms.insertNodes(editor, createEmptyParagraph(), { at: [0] });
        ReactEditor.focus(editor);
        Transforms.select(editor, Editor.start(editor, [0]));
      },

      insertImages: (imageUrls: string[]) => {
        const nodesToInsert: TEditorElement[] = imageUrls.map(
          (url) =>
            ({
              type: 'img',
              src: url,
              children: [{ text: '' }],
            }) as IImgElement,
        );
        const { insertAt, needsTrailingTextBlock } = prepareInsert();
        insertWithFocus(nodesToInsert, insertAt, needsTrailingTextBlock);
      },

      insertSpots: (spots: ISpotInsertData[]) => {
        const nodesToInsert: TEditorElement[] = spots.map(
          (spot) =>
            ({
              type: 'spot',
              spotId: spot.id,
              spotName: spot.name,
              spotAddress: spot.address,
              spotThumbnail: spot.thumbnail,
              children: [{ text: '' }],
            }) as ISpotElement,
        );
        const { insertAt, needsTrailingTextBlock } = prepareInsert();
        insertWithFocus(nodesToInsert, insertAt, needsTrailingTextBlock);
      },

      removeSpotById: (spotId: number) => {
        for (const [node, path] of Node.elements(editor)) {
          if (SlateElement.isElement(node) && node.type === 'spot') {
            if ((node as ISpotElement).spotId === spotId) {
              Transforms.removeNodes(editor, { at: path });
              return true;
            }
          }
        }
        return false;
      },

      insertH1: () => {
        const h1Block: IH1Element = { type: 'h1', children: [{ text: '' }] };
        const { insertAt, needsTrailingTextBlock } = prepareInsert();
        const nodes: TEditorElement[] = [h1Block];
        if (needsTrailingTextBlock) nodes.push(createEmptyParagraph());
        Transforms.insertNodes(editor, nodes, { at: [insertAt] });
        Transforms.select(editor, Editor.start(editor, [insertAt]));
        ReactEditor.focus(editor);
      },

      insertUl: () => {
        const ulBlock: IUlElement = {
          type: 'ul',
          children: [{ type: 'li', children: [{ text: '' }] } as ILiElement],
        };
        const { insertAt, needsTrailingTextBlock } = prepareInsert();
        const nodes: TEditorElement[] = [ulBlock];
        if (needsTrailingTextBlock) nodes.push(createEmptyParagraph());
        Transforms.insertNodes(editor, nodes, { at: [insertAt] });
        Transforms.select(editor, Editor.start(editor, [insertAt, 0]));
        ReactEditor.focus(editor);
      },

      insertOl: () => {
        const olBlock: IOlElement = {
          type: 'ol',
          children: [{ type: 'li', children: [{ text: '' }] } as ILiElement],
        };
        const { insertAt, needsTrailingTextBlock } = prepareInsert();
        const nodes: TEditorElement[] = [olBlock];
        if (needsTrailingTextBlock) nodes.push(createEmptyParagraph());
        Transforms.insertNodes(editor, nodes, { at: [insertAt] });
        Transforms.select(editor, Editor.start(editor, [insertAt, 0]));
        ReactEditor.focus(editor);
      },

      insertLink: (rawHref: string) => {
        const href = sanitizeHref(rawHref);
        if (!href) return;
        const linkBlock: IAElement = { type: 'a', href, children: [{ text: href }] };
        const { insertAt, needsTrailingTextBlock } = prepareInsert();
        const nodes: TEditorElement[] = [linkBlock];
        if (needsTrailingTextBlock) nodes.push(createEmptyParagraph());
        Transforms.insertNodes(editor, nodes, { at: [insertAt] });
        Transforms.select(editor, Editor.start(editor, [insertAt]));
        ReactEditor.focus(editor);
      },

      insertHr: (variant: IHrElement['variant'] = 'default') => {
        const hrBlock: IHrElement = { type: 'hr', variant, children: [{ text: '' }] };
        const { insertAt, needsTrailingTextBlock } = prepareInsert();
        const nodes: TEditorElement[] = [hrBlock];
        if (needsTrailingTextBlock) nodes.push(createEmptyParagraph());
        Transforms.insertNodes(editor, nodes, { at: [insertAt] });
        const focusIndex = insertAt + 1;
        if (focusIndex < editor.children.length) {
          Transforms.select(editor, Editor.start(editor, [focusIndex]));
        }
        ReactEditor.focus(editor);
      },

      insertBlockquote: (variant: IBlockquoteElement['variant'] = 'default') => {
        const blockquoteBlock: IBlockquoteElement = {
          type: 'blockquote',
          variant,
          children: [{ text: '' }],
        };
        const { insertAt, needsTrailingTextBlock } = prepareInsert();
        const nodes: TEditorElement[] = [blockquoteBlock];
        if (needsTrailingTextBlock) nodes.push(createEmptyParagraph());
        Transforms.insertNodes(editor, nodes, { at: [insertAt] });
        Transforms.select(editor, Editor.start(editor, [insertAt]));
        ReactEditor.focus(editor);
      },
    }),
    [editor, prepareInsert, insertWithFocus],
  );
};
