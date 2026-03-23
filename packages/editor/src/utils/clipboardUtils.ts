import { Text } from 'slate';

import type { TEditorElement, ICustomText, IImgElement } from '../types';
import type { Descendant } from 'slate';

export const SLATE_BLOCK_CLIPBOARD_KEY = 'application/x-slate-block';

/**
 * 블록을 sessionStorage + 클립보드 텍스트에 저장
 * useHtmlPaste의 블록 복사·붙여넣기 기능과 쌍을 이룸
 */
export const copyBlockToClipboard = async (block: TEditorElement): Promise<void> => {
  const json = JSON.stringify(block);
  sessionStorage.setItem(SLATE_BLOCK_CLIPBOARD_KEY, json);
  await navigator.clipboard.writeText(json);
};

/**
 * data URL을 Blob으로 변환
 */
export const dataUrlToBlob = (dataUrl: string): Blob => {
  const [header, base64] = dataUrl.split(',');
  const mimeType = header.match(/:(.*?);/)?.[1] || 'image/png';
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: mimeType });
};

/**
 * 텍스트 노드를 HTML로 변환
 */
const textToHtml = (node: ICustomText): string => {
  let html = node.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  if (node.bold) html = `<strong>${html}</strong>`;
  if (node.italic) html = `<em>${html}</em>`;
  if (node.href) html = `<a href="${node.href}">${html}</a>`;

  return html;
};

interface ISlateToHtmlOptions {
  excludeDataUrlImages?: boolean;
}

/**
 * Slate 노드를 HTML로 변환
 */
const nodeToHtml = (node: Descendant, options: ISlateToHtmlOptions = {}): string => {
  if (Text.isText(node)) {
    return textToHtml(node as ICustomText);
  }

  const element = node as TEditorElement;
  const children =
    element.children?.map((child) => nodeToHtml(child as Descendant, options)).join('') || '';

  switch (element.type) {
    case 'p':
      return `<p>${children}</p>`;
    case 'h1':
      return `<h1>${children}</h1>`;
    case 'h2':
      return `<h2>${children}</h2>`;
    case 'h3':
      return `<h3>${children}</h3>`;
    case 'img':
      if (options.excludeDataUrlImages && element.src?.startsWith('data:image/')) {
        return '';
      }
      return `<img src="${element.src}" alt="${element.alt || ''}" />`;
    case 'blockquote':
      return `<blockquote>${children}</blockquote>`;
    case 'ul':
      return `<ul>${children}</ul>`;
    case 'ol':
      return `<ol>${children}</ol>`;
    case 'li':
      return `<li>${children}</li>`;
    case 'hr':
      return '<hr />';
    case 'spot':
      return `<p><strong>${element.spotName || ''}</strong><br />${element.spotAddress || ''}</p>`;
    default:
      return children;
  }
};

/**
 * Slate fragment를 HTML로 변환
 */
export const slateFragmentToHtml = (
  fragment: Descendant[],
  options: ISlateToHtmlOptions = {},
): string => {
  return fragment.map((node) => nodeToHtml(node, options)).join('');
};

/**
 * 텍스트 노드에서 평문 추출
 */
const extractText = (node: Descendant): string => {
  if (Text.isText(node)) {
    return node.text;
  }

  const element = node as TEditorElement;

  if (element.type === 'img') {
    return element.alt || '[이미지]';
  }

  if (element.type === 'spot') {
    return `${element.spotName || ''}\n${element.spotAddress || ''}`;
  }

  if (element.type === 'hr') {
    return '---';
  }

  const children =
    element.children?.map((child) => extractText(child as Descendant)).join('') || '';
  return children;
};

/**
 * Slate fragment에서 평문 텍스트 추출
 */
export const getPlainText = (fragment: Descendant[]): string => {
  return fragment.map(extractText).join('\n');
};

/**
 * Fragment에서 첫 번째 data URL 이미지 노드 찾기
 */
export const findDataUrlImageNode = (fragment: Descendant[]): IImgElement | undefined => {
  for (const node of fragment) {
    if (!Text.isText(node)) {
      const element = node as TEditorElement;
      if (element.type === 'img' && element.src?.startsWith('data:image/')) {
        return element as IImgElement;
      }
    }
  }
  return undefined;
};

/**
 * Fragment에 data URL 이미지가 있는지 확인
 */
export const hasDataUrlImage = (fragment: Descendant[]): boolean => {
  return fragment.some((node) => {
    if (!Text.isText(node)) {
      const element = node as TEditorElement;
      return element.type === 'img' && element.src?.startsWith('data:image/');
    }
    return false;
  });
};

/**
 * 클립보드에서 이미지 파일 추출
 */
export const getImageFilesFromClipboard = (clipboardData: DataTransfer): File[] => {
  const imageFiles: File[] = [];

  if (clipboardData.items) {
    for (const item of clipboardData.items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          imageFiles.push(file);
        }
      }
    }
  }

  if (imageFiles.length === 0 && clipboardData.files) {
    for (const file of clipboardData.files) {
      if (file.type.startsWith('image/')) {
        imageFiles.push(file);
      }
    }
  }

  return imageFiles;
};
