import { useState } from 'react';

import { ImageInput } from '.';

import type { ImageInputItem } from './types';
import type { ImageInputChangeMeta } from './types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const stackStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '24px',
} as const;

const SAMPLE_ITEMS: ImageInputItem[] = [
  { id: 'item-1', url: 'https://picsum.photos/seed/a/300/300' },
  { id: 'item-2', url: 'https://picsum.photos/seed/b/300/300' },
  { id: 'item-3', url: 'https://picsum.photos/seed/c/300/300' },
];

export default {
  title: 'Core/ImageInput',
  component: ImageInput,
  args: {
    value: [],
    width: 320,
    height: 120,
    gap: 8,
  },
} satisfies Meta<typeof ImageInput>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: StoryObj<typeof ImageInput> = {
  args: {
    value: SAMPLE_ITEMS.slice(0, 1),
    minLength: 1,
    maxLength: 5,
    hasIcon: true,
    hasLink: false,
    hasEdit: false,
    canDelete: true,
    readOnly: false,
    isLoading: false,
    errorMsg: '',
    placeholder: '이미지를 추가하세요',
  },
};

// ─── Interactive ─────────────────────────────────────────────────────────────

export const Interactive: StoryObj<typeof ImageInput> = {
  render: () => {
    const [items, setItems] = useState<ImageInputItem[]>(SAMPLE_ITEMS.slice(0, 2));

    return (
      <div style={stackStyle}>
        <p style={{ margin: 0, fontSize: 12, color: '#666' }}>현재 아이템 수: {items.length}</p>
        <ImageInput
          value={items}
          onChange={(nextValue) => setItems(nextValue)}
          maxLength={5}
          hasIcon
          canDelete
          placeholder="이미지를 추가하세요"
        />
      </div>
    );
  },
};

// ─── ReadOnly ─────────────────────────────────────────────────────────────────

export const ReadOnly: StoryObj<typeof ImageInput> = {
  render: () => (
    <div style={stackStyle}>
      <ImageInput
        value={SAMPLE_ITEMS}
        readOnly
        hasLink
        onLinkClick={(item) => alert(`링크 클릭: ${item.id}`)}
        placeholder="이미지를 추가하세요"
      />
    </div>
  ),
};

// ─── ErrorState ──────────────────────────────────────────────────────────────

export const ErrorState: StoryObj<typeof ImageInput> = {
  render: () => (
    <div style={stackStyle}>
      <ImageInput
        value={[]}
        minLength={2}
        errorMsg="이미지를 최소 2장 이상 등록해 주세요."
        placeholder="이미지를 추가하세요"
      />
      <ImageInput
        value={SAMPLE_ITEMS.slice(0, 1)}
        minLength={3}
        errorMsg="필수 이미지가 부족합니다."
        placeholder="이미지를 추가하세요"
      />
    </div>
  ),
};

// ─── LoadingState ─────────────────────────────────────────────────────────────

// isLoading(global): 모든 타일 + Dropzone 비활성화
export const LoadingState: StoryObj<typeof ImageInput> = {
  render: () => (
    <div style={stackStyle}>
      <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
        isLoading (global) — 모든 타일 로딩, 추가 불가
      </p>
      <ImageInput
        value={SAMPLE_ITEMS.slice(0, 2)}
        isLoading
        maxLength={5}
        placeholder="이미지를 추가하세요"
      />
    </div>
  ),
};

// item.isLoading (per-item): 특정 타일만 로딩, 추가는 가능
export const PerItemLoadingState: StoryObj<typeof ImageInput> = {
  render: () => (
    <div style={stackStyle}>
      <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
        item.isLoading (per-item) — 첫 번째 타일만 로딩, 추가/다른 타일은 정상
      </p>
      <ImageInput
        value={[
          { id: 'item-1', url: 'https://picsum.photos/seed/a/300/300', isLoading: true },
          { id: 'item-2', url: 'https://picsum.photos/seed/b/300/300' },
        ]}
        maxLength={5}
        canDelete
        placeholder="이미지를 추가하세요"
      />
    </div>
  ),
};

// ─── WithCrop ────────────────────────────────────────────────────────────────

export const WithCrop: StoryObj<typeof ImageInput> = {
  render: () => {
    const [items, setItems] = useState<ImageInputItem[]>(SAMPLE_ITEMS.slice(0, 2));

    return (
      <div style={stackStyle}>
        <ImageInput
          value={items}
          onChange={(nextValue) => setItems(nextValue)}
          hasEdit
          canDelete
          maxLength={5}
          placeholder="이미지를 추가하세요"
        />
      </div>
    );
  },
};

// ─── MaxedOut ────────────────────────────────────────────────────────────────

export const MaxedOut: StoryObj<typeof ImageInput> = {
  render: () => (
    <div style={stackStyle}>
      <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
        maxLength=3, 이미지 3장 — 추가 슬롯 없음
      </p>
      <ImageInput value={SAMPLE_ITEMS} maxLength={3} canDelete placeholder="이미지를 추가하세요" />
    </div>
  ),
};

// ─── PositionMode ───────────────────────────────────────────────────────────

const POSITION_LABELS = ['상품이미지 1', '상품이미지 2', '상품이미지 3', '영상 썸네일'];

const logStyle = {
  margin: 0,
  padding: '8px 12px',
  fontSize: 11,
  fontFamily: 'monospace',
  background: '#f5f5f5',
  borderRadius: 4,
  maxHeight: 100,
  overflow: 'auto',
} as const;

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
} as const;

const labelStyle = { margin: 0, fontSize: 13, fontWeight: 600 } as const;
const descStyle = { margin: 0, fontSize: 12, color: '#666' } as const;
const dividerStyle = { border: 'none', borderTop: '1px solid #e0e0e0', margin: 0 } as const;

function PositionModeLog({
  initialItems,
  label,
  description,
  readOnly,
  hasLink,
}: {
  initialItems: ImageInputItem[];
  label: string;
  description: string;
  readOnly?: boolean;
  hasLink?: boolean;
}) {
  const [items, setItems] = useState<ImageInputItem[]>(initialItems);
  const [logs, setLogs] = useState<string[]>([]);

  const handleChange = (next: ImageInputItem[], meta: ImageInputChangeMeta) => {
    setItems(next);
    const sorted = next.slice().sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    const positions = sorted.map((i) => `[${i.position}]${i.id.slice(-4)}`).join(', ');
    setLogs((prev) => [
      `${meta.action} pos=${meta.index}${meta.previousIndex != null ? ` from=${meta.previousIndex}` : ''} | ${positions || '(empty)'}`,
      ...prev.slice(0, 9),
    ]);
  };

  return (
    <div style={sectionStyle}>
      <p style={labelStyle}>{label}</p>
      <p style={descStyle}>{description}</p>
      <ImageInput
        value={items}
        onChange={handleChange}
        length={4}
        hasIcon
        canDelete={!readOnly}
        readOnly={readOnly}
        hasLink={hasLink}
        onLinkClick={
          hasLink ? (item) => alert(`링크: ${item.id} (position=${item.position})`) : undefined
        }
        placeholder={(pos) => `${POSITION_LABELS[pos]}\n3:2 비율`}
      />
      {!readOnly && <pre style={logStyle}>{logs.length ? logs.join('\n') : '(액션 로그)'}</pre>}
    </div>
  );
}

export const PositionMode: StoryObj<typeof ImageInput> = {
  render: () => (
    <div style={stackStyle}>
      <PositionModeLog
        label="1. 빈 슬롯에서 시작"
        description="4개 빈 슬롯 — 원하는 위치에 이미지를 추가/삭제해 보세요."
        initialItems={[]}
      />

      <hr style={dividerStyle} />

      <PositionModeLog
        label="2. 일부 슬롯 채워진 상태"
        description="위치 0, 2에 이미지 / 위치 1, 3은 빈 슬롯. 삭제 후 빈 자리에 다시 추가해 보세요."
        initialItems={[
          { id: 'item-1', url: 'https://picsum.photos/seed/a/300/300', position: 0 },
          { id: 'item-2', url: 'https://picsum.photos/seed/b/300/300', position: 2 },
        ]}
      />

      <hr style={dividerStyle} />

      <PositionModeLog
        label="3. 모든 슬롯 채워진 상태"
        description="4개 모두 채워진 상태. 드래그로 위치를 바꿔 보세요."
        initialItems={[
          { id: 'item-1', url: 'https://picsum.photos/seed/a/300/300', position: 0 },
          { id: 'item-2', url: 'https://picsum.photos/seed/b/300/300', position: 1 },
          { id: 'item-3', url: 'https://picsum.photos/seed/c/300/300', position: 2 },
          { id: 'item-4', url: 'https://picsum.photos/seed/d/300/300', position: 3 },
        ]}
      />

      <hr style={dividerStyle} />

      <PositionModeLog
        label="4. ReadOnly"
        description="빈 슬롯은 렌더링되지 않고, 이미지 타일만 표시됩니다."
        readOnly
        hasLink
        initialItems={[
          { id: 'item-1', url: 'https://picsum.photos/seed/a/300/300', position: 0 },
          { id: 'item-2', url: 'https://picsum.photos/seed/c/300/300', position: 2 },
        ]}
      />
    </div>
  ),
};
