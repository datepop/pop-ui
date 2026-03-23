import { IllustrationMappinMint } from '@pop-ui/foundation';
import React from 'react';
import { Transforms } from 'slate';
import { useSelected, ReactEditor, useSlateStatic } from 'slate-react';

import { DeleteButton } from './DeleteButton';

import type { ISpotElement } from '../../types';
import type { RenderElementProps } from 'slate-react';

export const SpotElement = ({ attributes, children, element }: RenderElementProps) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  if (element.type !== 'spot') return null;

  const spotElement = element as ISpotElement;

  const handleRemove = () => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.removeNodes(editor, { at: path });
  };

  const handleSpotClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const path = ReactEditor.findPath(editor, element);
    Transforms.select(editor, path);
    ReactEditor.focus(editor);
  };

  return (
    <div {...attributes}>
      <div
        contentEditable={false}
        onClick={handleSpotClick}
        style={{
          width: '100%',
          marginBottom: 'var(--editor-block-spacing)',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
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
          {/* 썸네일 / 아이콘 */}
          <div
            style={{
              width: '40px',
              height: '40px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {spotElement.spotThumbnail ? (
              <img
                src={spotElement.spotThumbnail}
                alt={spotElement.spotName || '스팟'}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <IllustrationMappinMint size={32} />
            )}
          </div>

          {/* 스팟 정보 */}
          <div
            style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}
          >
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#1F2937',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block',
              }}
            >
              {spotElement.spotName || '스팟 이름'}
            </span>
            {spotElement.spotAddress && (
              <span
                style={{
                  fontSize: '12px',
                  color: '#9CA3AF',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'block',
                }}
              >
                {spotElement.spotAddress}
              </span>
            )}
          </div>

          <DeleteButton onClick={handleRemove} aria-label="스팟 삭제" variant="inline" />
        </div>
      </div>
      <div style={{ display: 'none' }}>{children}</div>
    </div>
  );
};
