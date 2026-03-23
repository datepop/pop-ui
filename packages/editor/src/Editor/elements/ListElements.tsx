import type { RenderElementProps } from 'slate-react';

const ListElementBase = ({
  attributes,
  children,
  listType,
}: RenderElementProps & { listType: 'ul' | 'ol' }) => {
  const Tag = listType;
  return (
    <div
      {...attributes}
      style={{ position: 'relative', marginBottom: 'var(--editor-block-spacing)' }}
    >
      <Tag
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--editor-list-gap)',
          paddingLeft: '24px',
          margin: 0,
          listStyleType: listType === 'ul' ? 'disc' : 'decimal',
        }}
      >
        {children}
      </Tag>
    </div>
  );
};

export const UlElement = (props: RenderElementProps) => (
  <ListElementBase {...props} listType="ul" />
);

export const OlElement = (props: RenderElementProps) => (
  <ListElementBase {...props} listType="ol" />
);

export const LiElement = ({ attributes, children }: RenderElementProps) => {
  return (
    <li {...attributes} style={{ lineHeight: 'var(--editor-line-height)' }}>
      {children}
    </li>
  );
};
