import React, { useEffect, useRef } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useSelected, useSlateStatic } from 'slate-react';

import { DeleteButton } from './DeleteButton';

import type { IImgElement } from '../../types';
import type { RenderElementProps } from 'slate-react';

export const ImgElement = ({ attributes, children, element }: RenderElementProps) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const imgElement = element as IImgElement;

  // caption은 <input>의 uncontrolled 모드 + ref로 관리합니다.
  // 이유: IME(한글) 입력 중 React 리렌더가 발생하면 커서 위치가 초기화되어
  // 사용자 입력이 깨지는 문제를 방지하기 위함입니다.
  const inputRef = useRef<HTMLInputElement>(null);
  const isComposing = useRef(false);

  // undo/redo 등 외부에서 caption이 변경될 때 DOM 직접 업데이트 (setState 없음)
  useEffect(() => {
    if (inputRef.current && !isComposing.current) {
      inputRef.current.value = imgElement.caption ?? '';
    }
  }, [imgElement.caption]);

  const handleRemove = () => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.removeNodes(editor, { at: path });
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const path = ReactEditor.findPath(editor, element);
    Transforms.select(editor, path);
    ReactEditor.focus(editor);
  };

  const commitCaption = (value: string) => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, { caption: value }, { at: path });
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isComposing.current) {
      commitCaption(e.target.value);
    }
  };

  const handleCompositionStart = () => {
    isComposing.current = true;
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    isComposing.current = false;
    commitCaption(e.currentTarget.value);
  };

  return (
    <div {...attributes}>
      <div contentEditable={false} style={{ marginBottom: 'var(--editor-block-spacing)' }}>
        <div onClick={handleImageClick} style={{ borderRadius: '12px', cursor: 'pointer' }}>
          <div
            style={{
              position: 'relative',
              height: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <img
              src={imgElement.src}
              alt={imgElement.alt || '본문 이미지'}
              style={{ width: '100%', objectFit: 'cover', borderRadius: '12px', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                backgroundColor: selected ? 'rgba(51, 112, 255, 0.3)' : 'transparent',
                transition: 'background-color 0.2s',
              }}
            />
            <DeleteButton onClick={handleRemove} aria-label="이미지 삭제" variant="overlay" />
          </div>
        </div>
        <input
          ref={inputRef}
          type="text"
          defaultValue={imgElement.caption ?? ''}
          onChange={handleCaptionChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onClick={(e) => e.stopPropagation()}
          placeholder="이미지를 설명해주세요."
          style={{
            display: 'block',
            width: '100%',
            marginTop: '6px',
            padding: '0',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '13px',
            color: '#6B7280',
            textAlign: 'center',
          }}
        />
      </div>
      <div style={{ display: 'none' }}>{children}</div>
    </div>
  );
};
