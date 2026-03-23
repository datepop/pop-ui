import {
  ColorGray100,
  ColorGray900,
  IconLink,
  IconListBullet,
  IconListNumber,
  IconMapMarker,
  IconMinus,
  IconPhoto,
  IconQuote,
  IconText,
} from '@pop-ui/foundation';
import React, { useEffect, useRef, useState } from 'react';

import {
  BLOCKQUOTE_ICON_SOLID,
  BODY_ICON,
  HEADING_ICON_MAP,
  HEADING_LABEL_MAP,
  HR_ICON_DEFAULT,
  HR_ICON_SHORT,
} from './icons';
import {
  DropdownItem,
  Separator,
  ToolbarButton,
  ToolbarContext,
  ToolbarDropdownButton,
} from './ToolbarComponents';
import { HEADING_FACTORY, insertBlock, insertImageUrls } from './toolbarInsertHelpers';
import { TOOLBAR_CSS } from './toolbarStyles';
import { sanitizeHref } from '../../utils/sanitizeHref';
import { insertNodesWithFocus, prepareInsertPosition } from '../hooks/insertUtils';

import type {
  IBlockquoteElement,
  IBlocksConfig,
  IHrElement,
  IAElement,
  ILiElement,
  IOlElement,
  IPElement,
  ISpotElement,
  IUlElement,
  TCustomEditor,
  THeadingLevel,
} from '../../types';
import type { ISpotInsertData } from '../hooks/useEditorMethods';
import type { IEditorProps } from '../index';

// ─── Public API ────────────────────────────────────────────────────────────────

export interface IToolbarConfig {
  onInsertImage?: () => Promise<string[] | null | undefined>;
  onInsertLink?: () => Promise<string | null | undefined>;
  onInsertSpot?: () => Promise<ISpotInsertData[] | null | undefined>;
  /** true이면 제목 드롭다운이 제목(h1) / 본문(p) 두 가지로만 표시됩니다. */
  singleHeading?: boolean;
  /** true이면 버튼을 아이콘만 표시합니다 (텍스트 레이블 숨김). */
  iconOnly?: boolean;
}

// ─── Types ────────────────────────────────────────────────────────────────────

type TDropdownId = 'heading' | 'list' | 'hr' | 'blockquote';

// ─── Main component ───────────────────────────────────────────────────────────

interface IEditorToolbarProps {
  editor: TCustomEditor;
  enabledBlocks: IBlocksConfig;
  config: IToolbarConfig;
  onProcessImageFiles?: IEditorProps['onProcessImageFiles'];
  /** 좌우 패딩 (px). Editor의 padding 값이 전달된다 */
  horizontalPadding?: number;
}

export const EditorToolbar = ({
  editor,
  enabledBlocks,
  config,
  onProcessImageFiles,
  horizontalPadding,
}: IEditorToolbarProps) => {
  const [openDropdownId, setOpenDropdownId] = useState<TDropdownId | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const openDropdownIdRef = useRef<TDropdownId | null>(null);

  useEffect(() => {
    openDropdownIdRef.current = openDropdownId;
  });

  // Close dropdown on outside click — listener registered once at mount via ref
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!openDropdownIdRef.current) return;
      if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openDropdownIdRef.current) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ─── enabledBlocks derived flags ──────────────────────────────────────────

  const headingCfg = enabledBlocks.heading;
  const allowedHeadings: THeadingLevel[] = Array.isArray(headingCfg)
    ? headingCfg
    : headingCfg !== false
      ? ['h1', 'h2', 'h3']
      : [];
  const showHeading = allowedHeadings.length > 0;

  const listCfg = enabledBlocks.list;
  const allowedLists: ('ul' | 'ol')[] = Array.isArray(listCfg)
    ? listCfg
    : listCfg !== false
      ? ['ul', 'ol']
      : [];
  const showList = allowedLists.length > 0;

  const hrCfg = enabledBlocks.hr;
  const allowedHr: ('default' | 'short')[] = Array.isArray(hrCfg)
    ? hrCfg
    : hrCfg !== false
      ? ['default', 'short']
      : [];
  const showHr = allowedHr.length > 0;

  const blockquoteCfg = enabledBlocks.blockquote;
  const allowedBlockquotes: ('default' | 'solid')[] = Array.isArray(blockquoteCfg)
    ? blockquoteCfg
    : blockquoteCfg !== false
      ? ['default', 'solid']
      : [];
  const showBlockquote = allowedBlockquotes.length > 0;
  const showLink = enabledBlocks.link !== false;
  const showImage =
    enabledBlocks.image !== false && (!!onProcessImageFiles || !!config.onInsertImage);
  const showSpot = enabledBlocks.spot !== false && !!config.onInsertSpot;

  const closeDropdown = () => setOpenDropdownId(null);
  const toggleDropdown = (id: TDropdownId) =>
    setOpenDropdownId((prev) => (prev === id ? null : id));

  // ─── Handlers (unified handle* naming) ───────────────────────────────────

  const handleHeading = (level: THeadingLevel) => {
    insertBlock(editor, HEADING_FACTORY[level]());
    closeDropdown();
  };

  const handleParagraph = () => {
    insertBlock(editor, { type: 'p', children: [{ text: '' }] } as IPElement);
    closeDropdown();
  };

  const handleList = (type: 'ul' | 'ol') => {
    const node = {
      type,
      children: [{ type: 'li', children: [{ text: '' }] } as ILiElement],
    } as IUlElement | IOlElement;
    insertBlock(editor, node, 'child');
    closeDropdown();
  };

  const handleHr = (variant: IHrElement['variant']) => {
    insertBlock(editor, { type: 'hr', variant, children: [{ text: '' }] }, 'next');
    closeDropdown();
  };

  const handleBlockquote = (variant: IBlockquoteElement['variant']) => {
    insertBlock(editor, { type: 'blockquote', variant, children: [{ text: '' }] });
    closeDropdown();
  };

  const handleLink = async () => {
    const rawHref = config.onInsertLink
      ? await config.onInsertLink()
      : window.prompt('URL을 입력하세요');
    if (!rawHref) return;
    const href = sanitizeHref(rawHref);
    if (!href) return;
    insertBlock(editor, { type: 'a', href, children: [{ text: href }] } as IAElement);
  };

  const handleImage = async () => {
    if (config.onInsertImage) {
      const urls = await config.onInsertImage();
      if (!urls || urls.length === 0) return;
      insertImageUrls(editor, urls);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0 || !onProcessImageFiles) return;
    e.target.value = '';
    const processed = await onProcessImageFiles(files);
    const urls = processed.map((img) => img.newSrc).filter(Boolean);
    if (urls.length === 0) return;
    insertImageUrls(editor, urls);
  };

  const handleSpot = async () => {
    if (!config.onInsertSpot) return;
    const spots = await config.onInsertSpot();
    if (!spots || spots.length === 0) return;
    const { insertAt, needsTrailingTextBlock } = prepareInsertPosition(editor);
    insertNodesWithFocus(
      editor,
      spots.map(
        (spot) =>
          ({
            type: 'spot',
            spotId: spot.id,
            spotName: spot.name,
            spotAddress: spot.address,
            spotThumbnail: spot.thumbnail,
            children: [{ text: '' }],
          }) as ISpotElement,
      ),
      insertAt,
      needsTrailingTextBlock,
    );
  };

  // ─── Build toolbar groups ─────────────────────────────────────────────────
  // Each group is an array of adjacent buttons with no internal separators.
  // A Separator is inserted only between groups.
  //
  // iconOnly mode differences:
  //   heading  → individual flat button per allowed level (no dropdown)
  //   list     → individual UL / OL flat buttons (no dropdown)
  //   hr       → single flat button, inserts default variant (no dropdown)

  const iconOnly = !!config.iconOnly;
  const defaultHeadingLevel = allowedHeadings[0] ?? 'h1';

  const toolbarGroups: React.ReactNode[][] = [];

  if (showHeading) {
    if (iconOnly) {
      if (config.singleHeading) {
        toolbarGroups.push([
          <ToolbarButton
            key="heading-h1"
            icon={HEADING_ICON_MAP['h1']}
            label="제목"
            onClick={() => handleHeading('h1')}
          />,
          <ToolbarButton
            key="heading-p"
            icon={<IconText size={20} color={ColorGray900} />}
            label="본문"
            onClick={handleParagraph}
          />,
        ]);
      } else {
        toolbarGroups.push(
          allowedHeadings.map((level) => (
            <ToolbarButton
              key={`heading-${level}`}
              icon={HEADING_ICON_MAP[level]}
              label={HEADING_LABEL_MAP[level]}
              onClick={() => handleHeading(level)}
            />
          )),
        );
      }
    } else {
      toolbarGroups.push([
        <ToolbarDropdownButton
          key="heading"
          icon={<IconText size={20} color={ColorGray900} />}
          label="제목"
          ariaLabel="제목 옵션"
          isOpen={openDropdownId === 'heading'}
          onMainClick={() => handleHeading(defaultHeadingLevel)}
          onChevronClick={() => toggleDropdown('heading')}
        >
          {config.singleHeading ? (
            <>
              {allowedHeadings.includes('h1') && (
                <DropdownItem
                  icon={<IconText size={20} color={ColorGray900} />}
                  label="제목"
                  onClick={() => handleHeading('h1')}
                />
              )}
              <DropdownItem icon={BODY_ICON} label="본문" onClick={handleParagraph} />
            </>
          ) : (
            <>
              {allowedHeadings.map((level) => (
                <DropdownItem
                  key={`heading-${level}`}
                  icon={HEADING_ICON_MAP[level]}
                  label={HEADING_LABEL_MAP[level]}
                  onClick={() => handleHeading(level)}
                />
              ))}
            </>
          )}
        </ToolbarDropdownButton>,
      ]);
    }
  }

  if (showImage) {
    toolbarGroups.push([
      <React.Fragment key="image">
        <ToolbarButton
          icon={<IconPhoto size={20} color={ColorGray900} />}
          label="이미지"
          onClick={handleImage}
        />
        {!config.onInsertImage && (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        )}
      </React.Fragment>,
    ]);
  }

  if (showSpot) {
    toolbarGroups.push([
      <ToolbarButton
        key="spot"
        icon={<IconMapMarker size={20} color={ColorGray900} />}
        label="장소"
        onClick={handleSpot}
      />,
    ]);
  }

  if (showList) {
    if (iconOnly) {
      toolbarGroups.push([
        ...(allowedLists.includes('ul')
          ? [
              <ToolbarButton
                key="list-ul"
                icon={<IconListBullet size={20} color={ColorGray900} />}
                label="순서 없는 리스트"
                onClick={() => handleList('ul')}
              />,
            ]
          : []),
        ...(allowedLists.includes('ol')
          ? [
              <ToolbarButton
                key="list-ol"
                icon={<IconListNumber size={20} color={ColorGray900} />}
                label="순서 있는 리스트"
                onClick={() => handleList('ol')}
              />,
            ]
          : []),
      ]);
    } else {
      const defaultListType = allowedLists[0];
      toolbarGroups.push([
        <ToolbarDropdownButton
          key="list"
          icon={<IconListBullet size={20} color={ColorGray900} />}
          label="리스트"
          ariaLabel="리스트 옵션"
          isOpen={openDropdownId === 'list'}
          onMainClick={() => handleList(defaultListType)}
          onChevronClick={() => toggleDropdown('list')}
        >
          {allowedLists.includes('ul') && (
            <DropdownItem
              icon={<IconListBullet size={20} color={ColorGray900} />}
              label="순서 없는 리스트"
              onClick={() => handleList('ul')}
            />
          )}
          {allowedLists.includes('ol') && (
            <DropdownItem
              icon={<IconListNumber size={20} color={ColorGray900} />}
              label="순서 있는 리스트"
              onClick={() => handleList('ol')}
            />
          )}
        </ToolbarDropdownButton>,
      ]);
    }
  }

  if (showLink) {
    toolbarGroups.push([
      <ToolbarButton
        key="link"
        icon={<IconLink size={20} color={ColorGray900} />}
        label="링크"
        onClick={handleLink}
      />,
    ]);
  }

  if (showHr) {
    const defaultHrVariant = allowedHr[0];
    toolbarGroups.push(
      iconOnly
        ? [
            <ToolbarButton
              key="hr"
              icon={<IconMinus size={20} color={ColorGray900} />}
              label="구분선"
              onClick={() => handleHr(defaultHrVariant)}
            />,
          ]
        : [
            <ToolbarDropdownButton
              key="hr"
              icon={<IconMinus size={20} color={ColorGray900} />}
              label="구분선"
              ariaLabel="구분선 옵션"
              isOpen={openDropdownId === 'hr'}
              onMainClick={() => handleHr(defaultHrVariant)}
              onChevronClick={() => toggleDropdown('hr')}
            >
              {allowedHr.includes('default') && (
                <DropdownItem
                  icon={HR_ICON_DEFAULT}
                  label="기본"
                  onClick={() => handleHr('default')}
                />
              )}
              {allowedHr.includes('short') && (
                <DropdownItem icon={HR_ICON_SHORT} label="짧게" onClick={() => handleHr('short')} />
              )}
            </ToolbarDropdownButton>,
          ],
    );
  }

  if (showBlockquote) {
    const defaultBlockquoteVariant = allowedBlockquotes[0];
    toolbarGroups.push([
      <ToolbarDropdownButton
        key="blockquote"
        icon={<IconQuote size={20} color={ColorGray900} />}
        label="인용구"
        ariaLabel="인용구 옵션"
        isOpen={openDropdownId === 'blockquote'}
        onMainClick={() => handleBlockquote(defaultBlockquoteVariant)}
        onChevronClick={() => toggleDropdown('blockquote')}
      >
        {allowedBlockquotes.includes('default') && (
          <DropdownItem
            icon={<IconQuote size={20} color={ColorGray900} />}
            label="기본"
            onClick={() => handleBlockquote('default')}
          />
        )}
        {allowedBlockquotes.includes('solid') && (
          <DropdownItem
            icon={BLOCKQUOTE_ICON_SOLID}
            label="강조"
            onClick={() => handleBlockquote('solid')}
          />
        )}
      </ToolbarDropdownButton>,
    ]);
  }

  return (
    <ToolbarContext.Provider value={iconOnly}>
      <style>{TOOLBAR_CSS}</style>
      <div
        ref={toolbarRef}
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: '#ffffff',
          borderBottom: `1px solid ${ColorGray100}`,
          padding: horizontalPadding != null ? `8px ${horizontalPadding}px` : '8px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 0,
        }}
      >
        {toolbarGroups.flatMap((group, i) => [
          ...group,
          ...(i < toolbarGroups.length - 1 ? [<Separator key={`sep-${i}`} />] : []),
        ])}
      </div>
    </ToolbarContext.Provider>
  );
};
