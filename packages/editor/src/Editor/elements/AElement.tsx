import { ColorAqua500, IconLink } from '@pop-ui/foundation';
import { Transforms } from 'slate';
import { ReactEditor, useSelected, useSlateStatic } from 'slate-react';

import { DeleteButton } from './DeleteButton';

import type { IAElement } from '../../types';
import type { RenderElementProps } from 'slate-react';

export const AElement = ({ attributes, children, element }: RenderElementProps) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  if (element.type !== 'a') return null;

  const aElement = element as IAElement;

  const handleRemove = () => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.removeNodes(editor, { at: path });
  };

  return (
    <div {...attributes}>
      <div
        contentEditable={false}
        style={{ width: '100%', marginBottom: 'var(--editor-block-spacing)', borderRadius: '8px' }}
      >
        <a
          href={aElement.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
          onClick={(e) => e.preventDefault()}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              backgroundColor: selected ? 'rgba(51, 112, 255, 0.1)' : 'white',
              border: '1px solid #F3F4F6',
              borderRadius: '8px',
              transition: 'background-color 0.2s',
              padding: '8px 16px',
              userSelect: 'none',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
              }}
            >
              <IconLink size={20} color={ColorAqua500} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span
                style={{
                  fontSize: '14px',
                  color: '#1F2937',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'block',
                }}
              >
                {aElement.href}
              </span>
            </div>
            <DeleteButton onClick={handleRemove} aria-label="링크 삭제" variant="inline" />
          </div>
        </a>
      </div>
      <div style={{ display: 'none' }}>{children}</div>
    </div>
  );
};
