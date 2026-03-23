import { Text as SlateText } from 'slate';
import { useFocused } from 'slate-react';

import type { RenderElementProps } from 'slate-react';

interface IHeadingConfig {
  tag: 'h2' | 'h3' | 'h4';
  fontSize: string;
  placeholder: string;
}

const HEADING_CONFIGS: Record<'h1' | 'h2' | 'h3', IHeadingConfig> = {
  h1: { tag: 'h2', fontSize: '20px', placeholder: '소제목' },
  h2: { tag: 'h3', fontSize: '18px', placeholder: '소제목' },
  h3: { tag: 'h4', fontSize: '16px', placeholder: '소제목' },
};

const HeadingElementBase = ({
  attributes,
  children,
  element,
  config,
}: RenderElementProps & { config: IHeadingConfig }) => {
  const focused = useFocused();

  const isEmpty =
    element.children.length < 1 ||
    (element.children.length === 1 &&
      SlateText.isText(element.children[0]) &&
      element.children[0].text === '');

  const showPlaceholder = isEmpty && focused;
  const Tag = config.tag;

  return (
    <div
      {...attributes}
      style={{
        position: 'relative',
        marginBottom: 'var(--editor-block-spacing)',
        paddingTop: '8px',
      }}
    >
      <Tag
        style={{
          position: 'relative',
          fontSize: config.fontSize,
          fontWeight: 'bold',
          lineHeight: 'var(--editor-line-height)',
          margin: 0,
        }}
      >
        {showPlaceholder && (
          <span
            contentEditable={false}
            style={{
              position: 'absolute',
              color: '#9CA3AF',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {config.placeholder}
          </span>
        )}
        {children}
      </Tag>
    </div>
  );
};

export const H1Element = (props: RenderElementProps) => (
  <HeadingElementBase {...props} config={HEADING_CONFIGS.h1} />
);

export const H2Element = (props: RenderElementProps) => (
  <HeadingElementBase {...props} config={HEADING_CONFIGS.h2} />
);

export const H3Element = (props: RenderElementProps) => (
  <HeadingElementBase {...props} config={HEADING_CONFIGS.h3} />
);
