import React from 'react';
import { Transforms } from 'slate';
import { useSelected, useSlateStatic, ReactEditor } from 'slate-react';

import { DeleteButton } from './DeleteButton';
import { StyleDropdown } from './StyleDropdown';

import type { IHrElement } from '../../types';
import type { RenderElementProps } from 'slate-react';

export const HrElement = ({ attributes, children, element }: RenderElementProps) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const hrElement = element as IHrElement;
  const variant = hrElement.variant || 'default';

  const handleRemove = () => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.removeNodes(editor, { at: path });
  };

  const handleVariantChange = (newVariant: string) => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, { variant: newVariant as IHrElement['variant'] }, { at: path });
  };

  const handleHrClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const path = ReactEditor.findPath(editor, element);
    Transforms.select(editor, path);
    ReactEditor.focus(editor);
  };

  const hrOptions = [
    {
      value: 'short',
      ariaLabel: '짧은 구분선',
      label: <div style={{ width: '34px', height: '1px', background: '#D1D5DB' }} />,
    },
    {
      value: 'default',
      ariaLabel: '구분선',
      label: <div style={{ width: '64px', height: '1px', background: '#D1D5DB' }} />,
    },
  ];

  return (
    <div
      {...attributes}
      onClick={handleHrClick}
      style={{
        position: 'relative',
        borderRadius: '8px',
        backgroundColor: selected ? 'rgba(51, 112, 255, 0.1)' : 'transparent',
        transition: 'background-color 0.2s',
        padding: 'var(--editor-hr-padding) 0',
        marginBottom: 'var(--editor-block-spacing)',
        cursor: 'pointer',
      }}
    >
      <hr
        contentEditable={false}
        style={{
          border: 'none',
          borderTop: '1px solid #F3F4F6',
          width: variant === 'short' ? '25%' : '100%',
          minWidth: '100px',
          margin: '0 auto',
        }}
      />
      <div style={{ display: 'none' }}>{children}</div>

      {selected && (
        <div
          contentEditable={false}
          style={{
            position: 'absolute',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <StyleDropdown
            options={hrOptions}
            selectedValue={variant}
            onSelect={handleVariantChange}
            tailPosition="bottom"
          />
        </div>
      )}

      {selected && (
        <DeleteButton onClick={handleRemove} aria-label="구분선 삭제" variant="overlay" />
      )}
    </div>
  );
};
