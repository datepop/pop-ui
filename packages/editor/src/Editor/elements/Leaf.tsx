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

  // 시맨틱 태그로 마크 래핑 (복사/붙여넣기 시 마크 보존)
  let content = children;
  if (customLeaf.bold) {
    content = <strong>{content}</strong>;
  }
  if (customLeaf.italic) {
    content = <em>{content}</em>;
  }
  if (customLeaf.underline) {
    content = <u style={{ textUnderlinePosition: 'from-font' }}>{content}</u>;
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
          textUnderlinePosition: 'from-font',
          color: style.color ?? 'inherit',
          opacity: 0.5,
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <span {...attributes} style={style}>
      {content}
    </span>
  );
};
