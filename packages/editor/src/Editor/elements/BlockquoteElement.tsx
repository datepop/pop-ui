import { IconQuote } from '@pop-ui/foundation';
import React from 'react';
import { Text as SlateText, Transforms } from 'slate';
import { useSelected, useFocused, useSlateStatic, ReactEditor } from 'slate-react';

import { DeleteButton } from './DeleteButton';
import { StyleDropdown } from './StyleDropdown';
import { useComposition } from '../../contexts/CompositionContext';

import type { IBlockquoteElement } from '../../types';
import type { RenderElementProps } from 'slate-react';

export const BlockquoteElement = ({ attributes, children, element }: RenderElementProps) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();
  const { isComposing } = useComposition();

  const blockquoteElement = element as IBlockquoteElement;
  const variant = blockquoteElement.variant ?? 'default';

  const isEmpty =
    element.children.length < 1 ||
    (element.children.length === 1 &&
      SlateText.isText(element.children[0]) &&
      element.children[0].text === '');

  const showPlaceholder = isEmpty && (focused || selected) && !isComposing;

  const handleRemove = () => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.removeNodes(editor, { at: path });
  };

  const handleVariantChange = (newVariant: string) => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(
      editor,
      { variant: newVariant as IBlockquoteElement['variant'] },
      { at: path },
    );
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const path = ReactEditor.findPath(editor, element);
    Transforms.select(editor, path);
    ReactEditor.focus(editor);
  };

  const blockquoteOptions = [
    {
      value: 'default',
      ariaLabel: '인용구',
      label: <IconQuote size={16} color="#9CA3AF" />,
    },
    {
      value: 'solid',
      ariaLabel: '선 강조 인용구',
      label: <div style={{ width: '3px', height: '16px', background: '#D1D5DB' }} />,
    },
  ];

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    marginBottom: 'var(--editor-block-spacing)',
    padding: '10px 0',
    borderRadius: '8px',
    backgroundColor: selected ? 'rgba(51, 112, 255, 0.1)' : 'transparent',
    transition: 'background-color 0.2s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    ...(variant === 'solid'
      ? { borderRadius: 0, paddingLeft: '16px', borderLeft: '3px solid #D1D5DB' }
      : {}),
  };

  return (
    <div {...attributes} style={containerStyle}>
      {variant === 'default' && (
        <div
          contentEditable={false}
          onClick={handleIconClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <IconQuote size={20} color="#9CA3AF" />
        </div>
      )}
      <blockquote
        style={{
          margin: 0,
          fontStyle: 'italic',
          color: '#374151',
          lineHeight: 'var(--editor-line-height)',
          ...(variant === 'default' ? { textAlign: 'center', padding: '24px 20px' } : {}),
        }}
      >
        {showPlaceholder && (
          <span
            contentEditable={false}
            style={{ color: '#9CA3AF', pointerEvents: 'none', userSelect: 'none' }}
          >
            내용을 입력하세요
          </span>
        )}
        {children}
      </blockquote>
      {variant === 'default' && (
        <div
          contentEditable={false}
          onClick={handleIconClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(180deg)',
            cursor: 'pointer',
          }}
        >
          <IconQuote size={20} color="#9CA3AF" />
        </div>
      )}

      {selected && (
        <div
          contentEditable={false}
          style={{
            position: 'absolute',
            top: '-80px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <StyleDropdown
            options={blockquoteOptions}
            selectedValue={variant}
            onSelect={handleVariantChange}
            tailPosition="bottom"
          />
        </div>
      )}

      {selected && (
        <DeleteButton
          onClick={handleRemove}
          aria-label="인용구 삭제"
          variant={variant === 'default' ? 'overlay' : 'absolute'}
        />
      )}
    </div>
  );
};
