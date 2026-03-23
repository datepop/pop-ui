import { ColorGray100, ColorGray900 } from '@pop-ui/foundation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Editor, Element as SlateElement, Range, Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

import { ColorPanel } from './ColorPanel';
import { LinkIcon } from './LinkIcon';
import { LinkPanel } from './LinkPanel';
import { MarkButton } from './MarkButton';
import { getMarks, toggleMark } from './markHelpers';

import type { TMarkKey } from './markHelpers';
import type { BaseSelection } from 'slate';

// ─── 스타일 상수 ───────────────────────────────────────────────────────────────

const FLOATING_BAR_STYLE: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '4px 6px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
  border: `1px solid ${ColorGray100}`,
};

const SEP: React.CSSProperties = {
  width: '1px',
  height: '16px',
  backgroundColor: ColorGray100,
  margin: '0 2px',
  flexShrink: 0,
};

/** InlineToolbar 높이 오프셋 (px) */
const INLINE_TOOLBAR_HEIGHT = 44;
/** InlineToolbar와 선택 영역 사이의 간격 (px) */
const INLINE_TOOLBAR_GAP = 8;

// ─── 메인 컴포넌트 ─────────────────────────────────────────────────────────────

export interface IInlineToolbarConfig {
  /** false로 설정하면 색상 버튼을 숨깁니다 (기본값: true) */
  color?: boolean;
  /** 커스텀 컬러 팔레트 (hex 문자열 배열). 미지정 시 기본 팔레트 사용 */
  colorPalette?: string[];
}

export const InlineToolbar = ({ config }: { config?: IInlineToolbarConfig }) => {
  const colorEnabled = config?.color !== false;
  const editor = useSlate();
  const { selection } = editor;

  const [openPanel, setOpenPanel] = useState<{ type: 'link' | 'color'; selKey: string } | null>(
    null,
  );
  const [linkUrl, setLinkUrl] = useState('');
  const savedSelRef = useRef<BaseSelection>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);

  // 선택 영역 기반 위치 계산 (렌더 중 DOM 읽기)
  const position = useMemo(() => {
    if (!selection || Range.isCollapsed(selection)) return null;

    const [voidMatch] = Editor.nodes(editor, {
      match: (n) => SlateElement.isElement(n) && Editor.isVoid(editor, n),
      at: selection,
    });
    if (voidMatch) return null;

    const domSel = window.getSelection();
    if (!domSel || domSel.rangeCount === 0) return null;

    const rect = domSel.getRangeAt(0).getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return null;

    const top =
      rect.top < INLINE_TOOLBAR_HEIGHT + INLINE_TOOLBAR_GAP
        ? rect.bottom + INLINE_TOOLBAR_GAP
        : rect.top - INLINE_TOOLBAR_HEIGHT - INLINE_TOOLBAR_GAP;

    return { top, left: rect.left + rect.width / 2 };
  }, [selection, editor]);

  // 패널을 연 시점의 selection key — 다른 곳 선택 시 자동 숨김
  const selKey = selection
    ? `${selection.anchor.path}-${selection.anchor.offset}:${selection.focus.path}-${selection.focus.offset}`
    : null;
  const showLinkPanel = openPanel?.type === 'link' && openPanel.selKey === selKey && !!position;
  const showColorPanel = openPanel?.type === 'color' && openPanel.selKey === selKey && !!position;

  // 링크 입력창 포커스 (DOM 조작 — setState 아님)
  useEffect(() => {
    if (showLinkPanel) {
      linkInputRef.current?.focus();
    }
  }, [showLinkPanel]);

  if (!position) return null;

  const marks = getMarks(editor);
  const boldActive = !!marks?.bold;
  const italicActive = !!marks?.italic;
  const underlineActive = !!marks?.underline;
  const currentHref = marks?.href;
  const currentColor = marks?.color;

  // ─── 핸들러 ──────────────────────────────────────────────────────────────

  const handleMark = (e: React.MouseEvent, key: TMarkKey) => {
    e.preventDefault();
    toggleMark(editor, key);
  };

  const handleLinkButton = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentHref) {
      Editor.removeMark(editor, 'href');
      return;
    }
    savedSelRef.current = editor.selection;
    setLinkUrl('');
    setOpenPanel((v) => (v?.type === 'link' ? null : { type: 'link', selKey: selKey ?? '' }));
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (savedSelRef.current) {
      Transforms.select(editor, savedSelRef.current);
      ReactEditor.focus(editor);
    }
    const trimmed = linkUrl.trim();
    if (trimmed) {
      const href = /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
      Editor.addMark(editor, 'href', href);
    }
    setOpenPanel(null);
    setLinkUrl('');
  };

  const handleLinkKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpenPanel(null);
      setLinkUrl('');
    }
  };

  const handleColorButton = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenPanel((v) => (v?.type === 'color' ? null : { type: 'color', selKey: selKey ?? '' }));
  };

  const handleColorSelect = (e: React.MouseEvent, color: string | null) => {
    e.preventDefault();
    if (color === null) {
      Editor.removeMark(editor, 'color');
    } else {
      Editor.addMark(editor, 'color', color);
    }
    setOpenPanel(null);
  };

  // ─── 렌더 ─────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        pointerEvents: 'auto',
      }}
    >
      {/* 메인 버튼 바 */}
      <div style={FLOATING_BAR_STYLE}>
        <MarkButton active={boldActive} ariaLabel="볼드" onMouseDown={(e) => handleMark(e, 'bold')}>
          <span style={{ fontWeight: 'bold' }}>B</span>
        </MarkButton>
        <MarkButton
          active={italicActive}
          ariaLabel="이탤릭"
          onMouseDown={(e) => handleMark(e, 'italic')}
        >
          <span style={{ fontStyle: 'italic' }}>I</span>
        </MarkButton>
        <MarkButton
          active={underlineActive}
          ariaLabel="밑줄"
          onMouseDown={(e) => handleMark(e, 'underline')}
        >
          <span style={{ textDecoration: 'underline' }}>U</span>
        </MarkButton>

        <div style={SEP} />

        {/* 링크 */}
        <MarkButton
          active={!!currentHref || showLinkPanel}
          ariaLabel={currentHref ? '링크 제거' : '링크 추가'}
          onMouseDown={handleLinkButton}
        >
          <LinkIcon />
        </MarkButton>

        {colorEnabled && (
          <>
            <div style={SEP} />

            {/* 색상 */}
            <MarkButton
              active={showColorPanel}
              ariaLabel="텍스트 색상"
              onMouseDown={handleColorButton}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: currentColor ?? ColorGray900,
                  border: `1.5px solid ${ColorGray100}`,
                }}
              />
            </MarkButton>
          </>
        )}
      </div>

      {/* 링크 입력 패널 */}
      {showLinkPanel && (
        <LinkPanel
          linkUrl={linkUrl}
          onLinkUrlChange={setLinkUrl}
          onSubmit={handleLinkSubmit}
          onKeyDown={handleLinkKeyDown}
          inputRef={linkInputRef}
        />
      )}

      {/* 색상 팔레트 패널 */}
      {colorEnabled && showColorPanel && (
        <ColorPanel
          currentColor={currentColor}
          onColorSelect={handleColorSelect}
          palette={config?.colorPalette}
        />
      )}
    </div>
  );
};
