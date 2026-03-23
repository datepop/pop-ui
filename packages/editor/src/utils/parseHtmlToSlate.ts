import { sanitizeHref } from './sanitizeHref';

import type {
  ICustomText,
  IParseHtmlToSlateResult,
  IPElement,
  IH1Element,
  IH2Element,
  IH3Element,
  IUlElement,
  IOlElement,
  IImgElement,
  IHrElement,
  IBlockquoteElement,
  ILiElement,
  TEditorElement,
} from '../types';

/** 지원하는 블록 레벨 HTML 태그 */
const BLOCK_TAGS = [
  'P',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'UL',
  'OL',
  'LI',
  'BLOCKQUOTE',
  'HR',
  'DIV',
  'ARTICLE',
  'SECTION',
  'HEADER',
  'FOOTER',
  'MAIN',
  'ASIDE',
  'NAV',
  'FIGURE',
  'FIGCAPTION',
  'PRE',
  'ADDRESS',
];

/** 인라인 서식 태그 */
const INLINE_TAGS = {
  BOLD: ['STRONG', 'B'],
  ITALIC: ['EM', 'I'],
  UNDERLINE: ['U', 'INS'],
  LINK: ['A'],
};

/** 무시할 태그 (완전히 제거) */
const IGNORED_TAGS = [
  'SCRIPT',
  'STYLE',
  'NOSCRIPT',
  'IFRAME',
  'OBJECT',
  'EMBED',
  'TEMPLATE',
  'HEAD',
  'META',
  'LINK',
  'TITLE',
  'BUTTON',
];

/** 무시할 클래스 패턴 (에디터 UI 요소) */
const IGNORED_CLASS_PATTERNS = [
  'se-placeholder',
  'se-blind',
  'se-cell-context-menu',
  '__se-toolbar-slot',
  'se-component-edge-button',
  'se-cell-controlbar',
  'se-cell-select-button',
  'se-cell-add-button',
  'se-cell-size-button',
  'se-cell-size-controlbar',
  'se-table-control',
  'se-image-delete-button',
  'se-set-ai-mark-button-wrapper',
  '__se-cursor-unrelated',
];

const shouldIgnoreElement = (element: Element): boolean => {
  if (element.hasAttribute('data-input-buffer')) {
    return true;
  }

  const className = element.className;
  if (typeof className === 'string') {
    for (const pattern of IGNORED_CLASS_PATTERNS) {
      if (className.includes(pattern)) {
        return true;
      }
    }
  }

  return false;
};

const checkQuotationElement = (
  element: Element,
): { isQuotation: boolean; variant: 'default' | 'solid' } => {
  const className = element.className;
  if (typeof className !== 'string') {
    return { isQuotation: false, variant: 'default' };
  }

  const isQuotation =
    className.includes('se-quotation') ||
    className.includes('se-section-quotation') ||
    className.includes('se-quote');

  if (!isQuotation) {
    return { isQuotation: false, variant: 'default' };
  }

  const isDefaultStyle = className.includes('se-l-default');
  const variant = isDefaultStyle ? 'default' : 'solid';

  return { isQuotation: true, variant };
};

const createEmptyText = (): ICustomText => ({ text: '' });

const createEmptyParagraph = (): IPElement => ({
  type: 'p',
  children: [createEmptyText()],
});

interface IInlineContext {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  href?: string;
}

const extractInlineContent = (node: Node, context: IInlineContext = {}): ICustomText[] => {
  const results: ICustomText[] = [];

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent || '';
    if (text) {
      const textNode: ICustomText = { text };
      if (context.bold) textNode.bold = true;
      if (context.italic) textNode.italic = true;
      if (context.underline) textNode.underline = true;
      if (context.color) textNode.color = context.color;
      if (context.href) textNode.href = context.href;
      results.push(textNode);
    }
    return results;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return results;
  }

  const element = node as Element;
  const tagName = element.tagName;

  if (IGNORED_TAGS.includes(tagName)) {
    return results;
  }

  if (shouldIgnoreElement(element)) {
    return results;
  }

  const newContext: IInlineContext = { ...context };

  if (INLINE_TAGS.BOLD.includes(tagName)) {
    newContext.bold = true;
  }
  if (INLINE_TAGS.ITALIC.includes(tagName)) {
    newContext.italic = true;
  }
  if (INLINE_TAGS.UNDERLINE.includes(tagName)) {
    newContext.underline = true;
  }
  if (tagName === 'SPAN') {
    const color = (element as HTMLElement).style?.color;
    if (color) {
      newContext.color = color;
    }
  }
  if (tagName === 'A') {
    const href = sanitizeHref(element.getAttribute('href'));
    if (href) {
      newContext.href = href;
    }
  }

  if (tagName === 'BR') {
    results.push({ text: '\n', ...context });
    return results;
  }

  element.childNodes.forEach((child) => {
    results.push(...extractInlineContent(child, newContext));
  });

  return results;
};

const normalizeTextChildren = (children: ICustomText[]): ICustomText[] => {
  if (children.length === 0) {
    return [createEmptyText()];
  }
  return children;
};

interface IParseContext {
  imageUrls: string[];
}

const parseElement = (
  node: Node,
  context: IParseContext,
): TEditorElement | TEditorElement[] | null => {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.trim();
    if (text) {
      return {
        type: 'p',
        children: [{ text }],
      } as IPElement;
    }
    return null;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const element = node as Element;
  const tagName = element.tagName;

  if (IGNORED_TAGS.includes(tagName)) {
    return null;
  }

  if (shouldIgnoreElement(element)) {
    return null;
  }

  if (tagName === 'IMG') {
    const src = element.getAttribute('src');
    if (src) {
      if (!src.startsWith('data:')) {
        context.imageUrls.push(src);
      }
      return {
        type: 'img',
        src,
        alt: element.getAttribute('alt') || '',
        children: [createEmptyText()],
      } as IImgElement;
    }
    return null;
  }

  if (tagName === 'HR') {
    return {
      type: 'hr',
      variant: 'default',
      children: [createEmptyText()],
    } as IHrElement;
  }

  if (/^H[1-6]$/.test(tagName)) {
    const originalType = element.getAttribute('data-original-type');
    const type =
      originalType === 'h1' || originalType === 'h2' || originalType === 'h3'
        ? originalType
        : tagName === 'H1'
          ? 'h1'
          : tagName === 'H2'
            ? 'h2'
            : 'h3';
    return {
      type,
      children: normalizeTextChildren(extractInlineContent(element)),
    } as IH1Element | IH2Element | IH3Element;
  }

  if (tagName === 'BLOCKQUOTE') {
    return {
      type: 'blockquote',
      variant: 'solid',
      children: normalizeTextChildren(extractInlineContent(element)),
    } as IBlockquoteElement;
  }

  const quotationInfo = checkQuotationElement(element);
  if (quotationInfo.isQuotation) {
    const children = extractInlineContent(element);
    if (children.length > 0 && children.some((c) => c.text.trim())) {
      return {
        type: 'blockquote',
        variant: quotationInfo.variant,
        children: normalizeTextChildren(children),
      } as IBlockquoteElement;
    }
    return null;
  }

  if (tagName === 'UL') {
    const listItems = parseListItems(element);
    if (listItems.length === 0) {
      return null;
    }
    return {
      type: 'ul',
      children: listItems,
    } as IUlElement;
  }

  if (tagName === 'OL') {
    const listItems = parseListItems(element);
    if (listItems.length === 0) {
      return null;
    }
    return {
      type: 'ol',
      children: listItems,
    } as IOlElement;
  }

  if (tagName === 'P') {
    const children = extractInlineContent(element);
    if (children.length === 0 || (children.length === 1 && !children[0].text.trim())) {
      return null;
    }
    return {
      type: 'p',
      children: normalizeTextChildren(children),
    } as IPElement;
  }

  if (
    [
      'DIV',
      'SECTION',
      'ARTICLE',
      'HEADER',
      'FOOTER',
      'MAIN',
      'ASIDE',
      'NAV',
      'FIGURE',
      'FIGCAPTION',
      'PRE',
      'ADDRESS',
      'SPAN',
      'TABLE',
      'TBODY',
      'THEAD',
      'TR',
      'TD',
      'TH',
    ].includes(tagName)
  ) {
    const results: TEditorElement[] = [];

    let hasBlockChild = false;
    element.childNodes.forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const childTag = (child as Element).tagName;
        if (BLOCK_TAGS.includes(childTag) || childTag === 'IMG') {
          hasBlockChild = true;
        }
      }
    });

    if (hasBlockChild) {
      element.childNodes.forEach((child) => {
        const parsed = parseElement(child, context);
        if (parsed) {
          if (Array.isArray(parsed)) {
            results.push(...parsed);
          } else {
            results.push(parsed);
          }
        }
      });
    } else {
      const children = extractInlineContent(element);
      if (children.length > 0 && children.some((c) => c.text.trim())) {
        results.push({
          type: 'p',
          children: normalizeTextChildren(children),
        } as IPElement);
      }
    }

    return results.length > 0 ? results : null;
  }

  const textChildren = extractInlineContent(element);
  if (textChildren.length > 0 && textChildren.some((c) => c.text.trim())) {
    return {
      type: 'p',
      children: normalizeTextChildren(textChildren),
    } as IPElement;
  }

  return null;
};

const parseListItems = (listElement: Element): ILiElement[] => {
  const items: ILiElement[] = [];

  listElement.childNodes.forEach((child) => {
    if (child.nodeType !== Node.ELEMENT_NODE) return;

    const childElement = child as Element;

    if (childElement.tagName === 'LI') {
      const nestedLists: Element[] = [];
      const inlineContent: ICustomText[] = [];

      childElement.childNodes.forEach((liChild) => {
        if (liChild.nodeType === Node.ELEMENT_NODE) {
          const liChildElement = liChild as Element;
          if (liChildElement.tagName === 'UL' || liChildElement.tagName === 'OL') {
            nestedLists.push(liChildElement);
          } else {
            inlineContent.push(...extractInlineContent(liChild));
          }
        } else {
          inlineContent.push(...extractInlineContent(liChild));
        }
      });

      if (inlineContent.length > 0 && inlineContent.some((c) => c.text.trim())) {
        items.push({
          type: 'li',
          children: normalizeTextChildren(inlineContent),
        });
      }

      nestedLists.forEach((nestedList) => {
        items.push(...parseListItems(nestedList));
      });
    }
  });

  return items;
};

/**
 * HTML 문자열을 Slate 블록 배열로 변환
 */
export const parseHtmlToSlate = (html: string): IParseHtmlToSlateResult => {
  const context: IParseContext = { imageUrls: [] };

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const results: TEditorElement[] = [];

  doc.body.childNodes.forEach((node) => {
    const parsed = parseElement(node, context);
    if (parsed) {
      if (Array.isArray(parsed)) {
        results.push(...parsed);
      } else {
        results.push(parsed);
      }
    }
  });

  const blocks = results.length === 0 ? [createEmptyParagraph()] : results;

  return {
    blocks,
    imageUrls: context.imageUrls,
  };
};

/**
 * HTML에 의미있는 콘텐츠가 있는지 확인
 */
export const hasHtmlContent = (html: string): boolean => {
  if (!html || !html.trim()) return false;

  if (!html.includes('<')) return false;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const text = doc.body.textContent?.trim();
  const hasImages = doc.body.querySelectorAll('img').length > 0;

  return Boolean(text) || hasImages;
};
