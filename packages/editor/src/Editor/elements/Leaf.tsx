import { ColorAqua500 } from '@pop-ui/foundation';
import React from 'react';

import { sanitizeHref } from '../../utils/sanitizeHref';

import type { ICustomText } from '../../types';
import type { RenderLeafProps } from 'slate-react';

type TExtendedLeaf = RenderLeafProps['leaf'] & { hashtag?: boolean };

/**
 * Leaf 렌더러 - 해시태그, 인라인 링크, 볼드/이탤릭/밑줄/색상 스타일링 처리
 */
export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  const extendedLeaf = leaf as TExtendedLeaf;
  const customLeaf = leaf as ICustomText;

  const style: React.CSSProperties = {};

  // 해시태그 색상이 우선 (데코레이터), 아니면 사용자 지정 색상
  if (extendedLeaf.hashtag) {
    style.color = ColorAqua500;
  } else if (customLeaf.color) {
    style.color = customLeaf.color;
  }

  if (customLeaf.bold) {
    style.fontWeight = 'bold';
  }
  if (customLeaf.italic) {
    style.fontStyle = 'italic';
  }
  if (customLeaf.underline) {
    style.textDecoration = 'underline';
  }

  if (customLeaf.href) {
    return (
      <a
        {...attributes}
        href={sanitizeHref(customLeaf.href) ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          ...style,
          textDecoration: 'underline',
          color: style.color ?? 'inherit',
          opacity: 0.6,
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <span {...attributes} style={style}>
      {children}
    </span>
  );
};
