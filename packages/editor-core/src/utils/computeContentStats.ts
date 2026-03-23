import type { TEditorElement, ICustomText, IContentStats } from '../types';

const HASHTAG_REGEX = /#([\w가-힣ㄱ-ㅎㅏ-ㅣ]+)/g;

const VOID_ELEMENT_TYPES = ['img', 'a', 'hr', 'spot'] as const;
const LIST_ELEMENT_TYPES = ['ul', 'ol'] as const;

/**
 * Slate AST를 순회하여 글자수, 해시태그, 스팟 ID를 계산 (순수 함수)
 */
export const computeContentStats = (content: TEditorElement[]): IContentStats => {
  let charCount = 0;
  const hashtagSet = new Set<string>();
  const spotIds: number[] = [];

  const countText = (text: string) => {
    charCount += text.length;
    HASHTAG_REGEX.lastIndex = 0;
    let match;
    while ((match = HASHTAG_REGEX.exec(text)) !== null) {
      hashtagSet.add(match[1]);
    }
  };

  for (const node of content) {
    // spot: ID 수집
    if (node.type === 'spot') {
      spotIds.push(node.spotId);
      continue;
    }

    // void 요소는 텍스트 카운트 제외
    if ((VOID_ELEMENT_TYPES as readonly string[]).includes(node.type)) {
      continue;
    }

    // ul/ol: children이 ILiElement[]
    if ((LIST_ELEMENT_TYPES as readonly string[]).includes(node.type)) {
      if (node.type === 'ul' || node.type === 'ol') {
        for (const li of node.children) {
          for (const textNode of li.children) {
            countText((textNode as ICustomText).text);
          }
        }
      }
      continue;
    }

    // p, h1, h2, h3, blockquote: children이 ICustomText[]
    if ('children' in node) {
      for (const child of node.children) {
        if ('text' in child) {
          countText((child as ICustomText).text);
        }
      }
    }
  }

  return {
    charCount,
    hashtags: Array.from(hashtagSet),
    spotIds,
  };
};
