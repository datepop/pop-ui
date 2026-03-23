import { decorateHashtags } from '@pop-ui/editor-core';
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Editor, Element as SlateElement, Path, Transforms } from 'slate';
import { Slate, Editable, ReactEditor } from 'slate-react';

import { useHtmlPaste, useKeyboardHandler } from '../hooks';
import {
  createSlateEditor,
  dataUrlToBlob,
  findDataUrlImageNode,
  getPlainText,
  hasDataUrlImage,
  slateFragmentToHtml,
} from '../utils';
import {
  Leaf,
  PElement,
  H1Element,
  H2Element,
  H3Element,
  UlElement,
  OlElement,
  LiElement,
  ImgElement,
  SpotElement,
  AElement,
  HrElement,
  BlockquoteElement,
  DropIndicator,
} from './elements';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useEditorMethods } from './hooks/useEditorMethods';
import { InlineToolbar } from './InlineToolbar';
import { EditorToolbar } from './Toolbar';
import { CompositionProvider, useComposition } from '../contexts/CompositionContext';

import type { IEditorRef, ISpotInsertData } from './hooks/useEditorMethods';
import type { IInlineToolbarConfig } from './InlineToolbar';
import type { IToolbarConfig } from './Toolbar';
import type {
  IBlocksConfig,
  IProcessedImage,
  IPElement,
  TEditorElement,
  TCustomEditor,
} from '../types';
import type { Descendant } from 'slate';
import type { RenderElementProps, RenderLeafProps } from 'slate-react';

export type { IEditorRef, ISpotInsertData, IToolbarConfig, IInlineToolbarConfig };

/** scrollIntoView 호출까지의 딜레이 — DOM 업데이트 완료 대기 (ms) */
const SCROLL_INTO_VIEW_DELAY_MS = 100;
/** 에디터 하단 클릭 영역 높이 — 마지막 블록 아래 빈 공간 */
const BOTTOM_CLICK_AREA_HEIGHT = '50vh';

export interface IEditorProps {
  value: TEditorElement[];
  onChange: (value: TEditorElement[]) => void;
  enabledBlocks?: IBlocksConfig;
  placeholder?: string;
  onNavigateToTitle?: () => void;
  onProcessImages?: (urls: string[]) => Promise<IProcessedImage[]>;
  onProcessImageFiles?: (files: File[]) => Promise<IProcessedImage[]>;
  /** insertTrigger가 변경될 때마다 커서 위치에 빈 단락을 삽입합니다 */
  insertTrigger?: unknown;
  /** 내장 툴바 활성화. true이면 기본 설정, IToolbarConfig 객체로 커스텀 가능 */
  toolbar?: boolean | IToolbarConfig;
  /** 텍스트 선택 시 플로팅 인라인 툴바 활성화. true이면 기본 설정, IInlineToolbarConfig 객체로 커스텀 가능 */
  inlineToolbar?: boolean | IInlineToolbarConfig;
  /** 블록 간 marginBottom (px, 기본값: 16) */
  blockSpacing?: number;
  /** 텍스트 줄간격 (기본값: '175%') */
  lineHeight?: number | string;
}

const DEFAULT_ENABLED_BLOCKS: IBlocksConfig = {
  heading: true,
  list: true,
  blockquote: true,
  hr: true,
  image: true,
  spot: true,
  link: true,
};

const EditorInner = forwardRef<IEditorRef, IEditorProps>(
  (
    {
      value,
      onChange,
      enabledBlocks = DEFAULT_ENABLED_BLOCKS,
      placeholder = '내용을 입력해주세요',
      onNavigateToTitle,
      onProcessImages,
      onProcessImageFiles,
      insertTrigger,
      toolbar,
      inlineToolbar,
      blockSpacing,
      lineHeight,
    },
    ref,
  ) => {
    const toolbarConfig: IToolbarConfig | null =
      toolbar === true ? {} : toolbar && typeof toolbar === 'object' ? toolbar : null;
    const inlineToolbarConfig: IInlineToolbarConfig | null =
      inlineToolbar === true
        ? {}
        : inlineToolbar && typeof inlineToolbar === 'object'
          ? inlineToolbar
          : null;
    const editor = useMemo<TCustomEditor>(() => createSlateEditor(), []);
    const previousInsertTrigger = useRef(insertTrigger);
    const previousValue = useRef(value);
    const { setIsComposing } = useComposition();
    const [isFocused, setIsFocused] = useState(false);
    const { editorWrapperRef, getDragAttributes, getDropIndicatorPosition } =
      useDragAndDrop(editor);

    useEffect(() => {
      if (value !== previousValue.current && editor.children !== value) {
        previousValue.current = value;
        Editor.withoutNormalizing(editor, () => {
          const length = editor.children.length;
          for (let i = 0; i < length; i++) {
            Transforms.removeNodes(editor, { at: [0] });
          }
          if (value.length > 0) {
            Transforms.insertNodes(editor, value, { at: [0] });
          }
          Transforms.deselect(editor);
        });
      }
    }, [value, editor]);

    useEffect(() => {
      if (insertTrigger !== undefined && insertTrigger !== previousInsertTrigger.current) {
        previousInsertTrigger.current = insertTrigger;
        const newParagraph: IPElement = { type: 'p', children: [{ text: '' }] };
        if (editor.selection) {
          const nextPath = Path.next(editor.selection.anchor.path.slice(0, 1));
          const insertAt = nextPath[0];
          Transforms.insertNodes(editor, newParagraph, { at: nextPath });
          Transforms.select(editor, Editor.start(editor, [insertAt]));
          ReactEditor.focus(editor);
          setTimeout(() => {
            try {
              const node = editor.children[insertAt];
              ReactEditor.toDOMNode(editor, node)?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            } catch {
              /* ignore */
            }
          }, SCROLL_INTO_VIEW_DELAY_MS);
        } else {
          const insertAt = editor.children.length;
          Transforms.insertNodes(editor, newParagraph, { at: [insertAt] });
          Transforms.select(editor, Editor.start(editor, [insertAt]));
          ReactEditor.focus(editor);
          setTimeout(() => {
            try {
              const node = editor.children[insertAt];
              ReactEditor.toDOMNode(editor, node)?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            } catch {
              /* ignore */
            }
          }, SCROLL_INTO_VIEW_DELAY_MS);
        }
      }
    }, [insertTrigger, editor]);

    useEditorMethods({ editor, ref });

    const renderElement = useCallback(
      (props: RenderElementProps) => {
        let enhancedProps = props;
        try {
          const path = ReactEditor.findPath(editor, props.element);
          if (path.length === 1) {
            const dragAttrs = getDragAttributes(path[0], props.element.type as string);
            enhancedProps = {
              ...props,
              attributes: {
                ...props.attributes,
                ...dragAttrs,
              } as RenderElementProps['attributes'],
            };
          }
        } catch {
          /* ignore */
        }

        switch (enhancedProps.element.type) {
          case 'p':
            return <PElement {...enhancedProps} />;
          case 'h1':
            return <H1Element {...enhancedProps} />;
          case 'h2':
            return <H2Element {...enhancedProps} />;
          case 'h3':
            return <H3Element {...enhancedProps} />;
          case 'ul':
            return <UlElement {...enhancedProps} />;
          case 'ol':
            return <OlElement {...enhancedProps} />;
          case 'li':
            return <LiElement {...enhancedProps} />;
          case 'img':
            return <ImgElement {...enhancedProps} />;
          case 'a':
            return <AElement {...enhancedProps} />;
          case 'hr':
            return <HrElement {...enhancedProps} />;
          case 'blockquote':
            return <BlockquoteElement {...enhancedProps} />;
          case 'spot':
            return <SpotElement {...enhancedProps} />;
          default:
            return <PElement {...enhancedProps} />;
        }
      },
      [editor, getDragAttributes],
    );

    const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

    const handleChange = (newValue: Descendant[]) => {
      onChange(newValue as TEditorElement[]);
    };

    const { handleKeyDown: handleBlockKeyDown } = useKeyboardHandler({
      editor,
      enabledBlocks,
      onNavigateToTitle,
    });

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.metaKey || e.ctrlKey) {
          if (e.key === 'b') {
            e.preventDefault();
            if (Editor.marks(editor)?.bold) {
              Editor.removeMark(editor, 'bold');
            } else {
              Editor.addMark(editor, 'bold', true);
            }
            return;
          }
          if (e.key === 'i') {
            e.preventDefault();
            if (Editor.marks(editor)?.italic) {
              Editor.removeMark(editor, 'italic');
            } else {
              Editor.addMark(editor, 'italic', true);
            }
            return;
          }
          if (e.key === 'u') {
            e.preventDefault();
            if (Editor.marks(editor)?.underline) {
              Editor.removeMark(editor, 'underline');
            } else {
              Editor.addMark(editor, 'underline', true);
            }
            return;
          }
        }
        handleBlockKeyDown(e);
      },
      [editor, handleBlockKeyDown],
    );

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    const handleCopy = useCallback(
      async (event: React.ClipboardEvent) => {
        const { selection } = editor;
        if (!selection) return;
        const fragment = editor.getFragment();
        if (!hasDataUrlImage(fragment)) return;
        event.preventDefault();
        try {
          const html = slateFragmentToHtml(fragment, { excludeDataUrlImages: true });
          const plainText = getPlainText(fragment);
          const clipboardItems: Record<string, Blob> = {
            'text/html': new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([plainText], { type: 'text/plain' }),
          };
          const imgNode = findDataUrlImageNode(fragment);
          if (imgNode?.src) {
            const imageBlob = dataUrlToBlob(imgNode.src);
            clipboardItems[imageBlob.type] = imageBlob;
          }
          await navigator.clipboard.write([new ClipboardItem(clipboardItems)]);
        } catch {
          const f = editor.getFragment();
          await navigator.clipboard.writeText(getPlainText(f));
        }
      },
      [editor],
    );

    const { handlePaste } = useHtmlPaste({
      editor,
      enabled: true,
      onProcessImages,
      onProcessImageFiles,
    });

    const handleBottomAreaClick = useCallback(() => {
      const lastIndex = editor.children.length - 1;
      const lastNode = editor.children[lastIndex];
      if (SlateElement.isElement(lastNode) && lastNode.type === 'p') {
        Transforms.select(editor, Editor.end(editor, [lastIndex]));
        ReactEditor.focus(editor);
        return;
      }
      const newParagraph: IPElement = { type: 'p', children: [{ text: '' }] };
      const insertAt = editor.children.length;
      Transforms.insertNodes(editor, newParagraph, { at: [insertAt] });
      Transforms.select(editor, Editor.start(editor, [insertAt]));
      ReactEditor.focus(editor);
    }, [editor]);

    return (
      <div
        ref={editorWrapperRef}
        data-editor-wrapper="true"
        style={{ flex: 1, width: '100%', position: 'relative' }}
      >
        {toolbarConfig !== null && (
          <EditorToolbar
            editor={editor}
            enabledBlocks={enabledBlocks}
            config={toolbarConfig}
            onProcessImageFiles={onProcessImageFiles}
          />
        )}
        <div
          style={
            {
              padding: '16px',
              '--editor-block-spacing': `${blockSpacing ?? 16}px`,
              '--editor-list-gap': `${Math.round((blockSpacing ?? 16) * 0.625 * 2) / 2}px`,
              '--editor-hr-padding': `${Math.round((blockSpacing ?? 16) * 1.875 * 2) / 2}px`,
              '--editor-line-height': `${lineHeight ?? '175%'}`,
            } as React.CSSProperties
          }
        >
          <Slate editor={editor} initialValue={value} onChange={handleChange}>
            {inlineToolbarConfig !== null && <InlineToolbar config={inlineToolbarConfig} />}
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              decorate={decorateHashtags}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              onCopy={handleCopy}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              placeholder={!isFocused ? placeholder : ''}
              style={{ outline: 'none' }}
            />
          </Slate>
          <DropIndicator position={getDropIndicatorPosition()} />
          <div
            onClick={handleBottomAreaClick}
            style={{ height: BOTTOM_CLICK_AREA_HEIGHT, cursor: 'text' }}
          />
        </div>
      </div>
    );
  },
);

EditorInner.displayName = 'EditorInner';

export const EditorComponent = forwardRef<IEditorRef, IEditorProps>((props, ref) => (
  <CompositionProvider>
    <EditorInner {...props} ref={ref} />
  </CompositionProvider>
));

EditorComponent.displayName = 'Editor';
