import { useState } from 'react';

import { LottieInput } from '.';
import successCheckJson from './example_lottie.json';
import { checkUploadLoading, UploadLoadingExample } from '../../../../../.storybook/examples/UploadLoadingExample';

import type { ILottieInputItem } from './types';
import type { Meta, StoryObj } from '@storybook/react-vite';

const stackStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '24px',
} as const;

const SAMPLE_ANIMATION_DATA = successCheckJson as Record<string, unknown>;

const SAMPLE_ITEMS: ILottieInputItem[] = [
  { id: 'item-1', animationData: SAMPLE_ANIMATION_DATA },
  { id: 'item-2', animationData: SAMPLE_ANIMATION_DATA },
];

export default {
  title: 'Core/LottieInput',
  component: LottieInput,
  args: {
    value: [],
    width: 160,
    height: 200,
    gap: 8,
  },
} satisfies Meta<typeof LottieInput>;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: StoryObj<typeof LottieInput> = {
  args: {
    value: SAMPLE_ITEMS.slice(0, 1),
    minLength: 1,
    maxLength: 5,
    hasIcon: true,
    hasLink: false,
    canDelete: true,
    readOnly: false,
    isLoading: false,
    error: '',
  },
};

// ─── Interactive ─────────────────────────────────────────────────────────────

export const Interactive: StoryObj<typeof LottieInput> = {
  render: () => {
    const [items, setItems] = useState<ILottieInputItem[]>(SAMPLE_ITEMS.slice(0, 1));

    return (
      <div style={stackStyle}>
        <p style={{ margin: 0, fontSize: 12, color: '#666' }}>현재 아이템 수: {items.length}</p>
        <LottieInput
          value={items}
          onChange={(nextValue) => setItems(nextValue)}
          maxLength={5}
          hasIcon
          canDelete
        />
      </div>
    );
  },
};

// ─── ReadOnly ─────────────────────────────────────────────────────────────────

export const ReadOnly: StoryObj<typeof LottieInput> = {
  render: () => (
    <div style={stackStyle}>
      <LottieInput
        value={SAMPLE_ITEMS}
        readOnly
        hasLink
        onLinkClick={(item) => alert(`링크 클릭: ${item.id}`)}
      />
    </div>
  ),
};

// ─── ErrorState ──────────────────────────────────────────────────────────────

export const ErrorState: StoryObj<typeof LottieInput> = {
  render: () => (
    <div style={stackStyle}>
      <LottieInput
        value={[]}
        minLength={2}
        error="Lottie 파일을 최소 2개 이상 등록해 주세요."
      />
      <LottieInput
        value={SAMPLE_ITEMS.slice(0, 1)}
        minLength={3}
        error="필수 Lottie 파일이 부족합니다."
      />
    </div>
  ),
};

// ─── LoadingState ─────────────────────────────────────────────────────────────

export const LoadingState: StoryObj<typeof LottieInput> = {
  render: () => (
    <div style={stackStyle}>
      <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
        isLoading (global) — 모든 타일 로딩, 추가 불가
      </p>
      <LottieInput
        value={SAMPLE_ITEMS.slice(0, 2)}
        isLoading
        maxLength={5}
      />
    </div>
  ),
};

// ─── PerItemLoadingState ──────────────────────────────────────────────────────

export const PerItemLoadingState: StoryObj<typeof LottieInput> = {
  name: '파일별 로딩과 조작',
  tags: ['pop-ui-contract'],
  play: checkUploadLoading,
  render: () => (
    <UploadLoadingExample<ILottieInputItem>
      initialItems={[
        { ...SAMPLE_ITEMS[0], position:0, isLoading:true },
        { ...SAMPLE_ITEMS[1], position:1 },
      ]}
      render={props => <LottieInput {...props} />}
    />
  ),
};

// ─── WithURL ──────────────────────────────────────────────────────────────────

export const WithURL: StoryObj<typeof LottieInput> = {
  args: {
    value: [
      { id: 'url-item', url: 'https://assets10.lottiefiles.com/packages/lf20_xvbwdbue.json' },
    ],
    hasLink: true,
    onLinkClick: (item) => alert(`링크 클릭: ${item.url}`),
  },
};

// ─── WithBackgroundImage ─────────────────────────────────────────────────────

export const WithBackgroundImage: StoryObj<typeof LottieInput> = {
  args: {
    value: SAMPLE_ITEMS.slice(0, 1),
    maxLength: 1,
    width: 200,
    height: 200,
    backgroundImage: 'https://picsum.photos/seed/lottie-bg/400/400',
  },
};

// ─── WithAnimationData ────────────────────────────────────────────────────────

export const WithAnimationData: StoryObj<typeof LottieInput> = {
  args: {
    value: SAMPLE_ITEMS,
    hasLink: true,
    canDelete: true,
    maxLength: 5,
    onLinkClick: (item) => alert(`링크 클릭: ${item.id}`),
  },
};
