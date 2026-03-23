import { useCallback } from 'react';
import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

import { getImageFilesFromClipboard, SLATE_BLOCK_CLIPBOARD_KEY } from '../utils/clipboardUtils';
import { parseHtmlToSlate } from '../utils/parseHtmlToSlate';

import type { TCustomEditor, TEditorElement, IImgElement, IProcessedImage } from '../types';

export interface IUseHtmlPasteOptions {
  editor: TCustomEditor;
  enabled: boolean;
  onProcessImages?: (urls: string[]) => Promise<IProcessedImage[]>;
  onProcessImageFiles?: (files: File[]) => Promise<IProcessedImage[]>;
}

export interface IUseHtmlPasteReturn {
  handlePaste: (event: React.ClipboardEvent) => Promise<void>;
}

/**
 * HTML 붙여넣기 처리 커스텀 훅
 *
 * 기능:
 * 1. 기존 블록 복사/붙여넣기 (sessionStorage 기반) 지원 — copyBlockToClipboard와 쌍
 * 2. 클립보드 이미지 파일 직접 붙여넣기 (스크린샷 등)
 * 3. HTML 클립보드 데이터 파싱 및 Slate 블록으로 변환
 * 4. 외부 이미지 다운로드 및 처리 지원
 */
export const useHtmlPaste = ({
  editor,
  enabled,
  onProcessImages,
  onProcessImageFiles,
}: IUseHtmlPasteOptions): IUseHtmlPasteReturn => {
  const handlePaste = useCallback(
    async (event: React.ClipboardEvent) => {
      if (!enabled) return;

      // 1. 기존 블록 복사/붙여넣기 처리 (sessionStorage 기반)
      const blockData = sessionStorage.getItem(SLATE_BLOCK_CLIPBOARD_KEY);
      if (blockData) {
        const clipboardText = event.clipboardData.getData('text/plain');
        if (clipboardText === blockData) {
          try {
            const block = JSON.parse(blockData) as TEditorElement;
            if (block && block.type) {
              event.preventDefault();

              if (editor.selection) {
                const currentPath = editor.selection.anchor.path[0];
                const insertAt = currentPath + 1;
                Transforms.insertNodes(editor, block, { at: [insertAt] });
                Transforms.select(editor, Editor.start(editor, [insertAt]));
              } else {
                const insertAt = editor.children.length;
                Transforms.insertNodes(editor, block, { at: [insertAt] });
                Transforms.select(editor, Editor.start(editor, [insertAt]));
              }
              return;
            }
          } catch {
            // JSON 파싱 실패 시 무시
          }
        }
        sessionStorage.removeItem(SLATE_BLOCK_CLIPBOARD_KEY);
      }

      // 2. 클립보드 이미지 파일 처리 (스크린샷 등)
      const imageFiles = getImageFilesFromClipboard(event.clipboardData);
      if (imageFiles.length > 0 && onProcessImageFiles) {
        event.preventDefault();

        try {
          const processedImages = await onProcessImageFiles(imageFiles);

          if (processedImages.length > 0) {
            const imageBlocks: IImgElement[] = processedImages.map((img) => ({
              type: 'img',
              src: img.newSrc,
              alt: '',
              children: [{ text: '' }],
            }));

            const insertAt = editor.selection
              ? editor.selection.anchor.path[0] + 1
              : editor.children.length;

            Transforms.insertNodes(editor, imageBlocks, { at: [insertAt] });
            Transforms.select(editor, Editor.start(editor, [insertAt]));
            ReactEditor.focus(editor);
          }
        } catch (error) {
          console.error('Failed to process clipboard images:', error);
        }

        return;
      }

      // 3. Slate 내부 복사/붙여넣기는 기본 동작으로 위임
      const hasSlateFragment = event.clipboardData.types.includes('application/x-slate-fragment');
      if (hasSlateFragment) {
        return;
      }

      // 4. HTML 파싱 (hasHtmlContent 별도 호출 없이 결과로 판단)
      const html = event.clipboardData.getData('text/html');
      if (!html || !html.trim() || !html.includes('<')) return;

      const { blocks: parsedBlocks, imageUrls } = parseHtmlToSlate(html);

      // 파싱 결과가 빈 단락 하나뿐이면 의미있는 콘텐츠 없음
      if (
        parsedBlocks.length === 1 &&
        parsedBlocks[0].type === 'p' &&
        parsedBlocks[0].children.length === 1 &&
        parsedBlocks[0].children[0].text === ''
      ) {
        return;
      }

      event.preventDefault();

      let blocks = parsedBlocks;

      // 5. 이미지 처리
      if (imageUrls.length > 0 && onProcessImages) {
        try {
          const processedImages = await onProcessImages(imageUrls);

          blocks = blocks
            .map((block) => {
              if (block.type === 'img') {
                const imgBlock = block as IImgElement;
                const processed = processedImages.find((p) => p.originalSrc === imgBlock.src);
                if (processed) {
                  return { ...imgBlock, src: processed.newSrc };
                }
                return null;
              }
              return block;
            })
            .filter((block): block is TEditorElement => block !== null);
        } catch (error) {
          console.error('Failed to process images:', error);
          blocks = blocks.filter((block) => block.type !== 'img');
        }
      } else if (imageUrls.length > 0 && !onProcessImages) {
        blocks = blocks.filter((block) => block.type !== 'img');
      }

      if (blocks.length === 0) {
        return;
      }

      // 6. 단일 텍스트 블록이면 인라인 삽입
      const isInlineInsert =
        blocks.length === 1 &&
        !['img', 'hr', 'spot', 'a', 'ul', 'ol'].includes(blocks[0].type) &&
        editor.selection;

      if (isInlineInsert) {
        editor.insertFragment(blocks[0].children);
        return;
      }

      // 7. 현재 selection 위치에 블록 배치 삽입 (단일 operation → Undo 한 번에 취소)
      const insertAt = editor.selection
        ? editor.selection.anchor.path[0] + 1
        : editor.children.length;

      Transforms.insertNodes(editor, blocks, { at: [insertAt] });
      Transforms.select(editor, Editor.start(editor, [insertAt]));
      ReactEditor.focus(editor);
    },
    [editor, enabled, onProcessImages, onProcessImageFiles],
  );

  return { handlePaste };
};
