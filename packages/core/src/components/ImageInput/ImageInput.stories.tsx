import { useState } from 'react';

import { ImageInput } from '.';

import type { ImageInputItem } from './types';
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
