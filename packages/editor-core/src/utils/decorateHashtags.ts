import { Text as SlateText } from 'slate';

import type { Node, Path, Range } from 'slate';

/**
 * 해시태그 데코레이터
 * 텍스트에서 해시태그(#태그)를 찾아 Range로 반환
 * Slate의 decorate prop에서 사용됨
 */
export const decorateHashtags = (entry: [Node, Path]): Range[] => {
  const [node, path] = entry;
  const ranges: Range[] = [];

  if (SlateText.isText(node)) {
    const { text } = node;
    const hashtagRegex = /#([\w가-힣ㄱ-ㅎㅏ-ㅣ]+)/g;
    let match;

    while ((match = hashtagRegex.exec(text)) !== null) {
      ranges.push({
        anchor: { path, offset: match.index },
        focus: { path, offset: match.index + match[0].length },
        hashtag: true,
      } as Range & { hashtag: boolean });
    }
  }

  return ranges;
};
