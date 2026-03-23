import { BlockRenderer } from './index';
import { ALL_BLOCKS_SAMPLE } from '../__fixtures__/sampleContent';

import type { IBlockClassNames } from './index';
import type { Meta, StoryObj } from '@storybook/react-vite';

// ============ 커스텀 클래스 프리셋 ============

const CUSTOM_CLASS_NAMES: IBlockClassNames = {
  wrapper: 'br-wrapper',
  paragraph: 'br-p',
  heading1: 'br-h1',
  heading2: 'br-h2',
  heading3: 'br-h3',
  list: 'br-list',
  listItem: 'br-list-item',
  blockquote: 'br-blockquote',
  hr: 'br-hr',
  image: 'br-image',
  imageCaption: 'br-image-caption',
  hashtag: 'br-hashtag',
  spot: 'br-spot',
  link: 'br-link',
  bold: 'br-bold',
  italic: 'br-italic',
};

const CUSTOM_STYLES = `
  .br-wrapper { font-family: Georgia, serif; line-height: 1.8; color: #1f2937; }
  .br-p { margin-bottom: 1rem; font-size: 16px; }
  .br-h1 { font-size: 26px; font-weight: 700; margin: 2rem 0 1rem; color: #111827; }
  .br-h2 { font-size: 20px; font-weight: 600; margin: 1.5rem 0 0.75rem; color: #374151; }
  .br-h3 { font-size: 16px; font-weight: 500; margin: 1rem 0 0.5rem; color: #4b5563; }
  .br-list { margin-left: 1.5rem; margin-bottom: 1rem; }
  .br-list-item { margin-bottom: 0.25rem; }
  .br-blockquote { border-left: 4px solid #d1d5db; padding-left: 1rem; color: #6b7280; margin: 1rem 0; }
  .br-hr { border: none; border-top: 1px solid #e5e7eb; margin: 1.5rem 0; }
  .br-image { border-radius: 8px; width: 100%; }
  .br-image-caption { font-size: 12px; color: #9ca3af; text-align: center; margin-top: 4px; }
  .br-hashtag { color: #3b82f6; font-weight: 600; cursor: pointer; }
  .br-hashtag:hover { text-decoration: underline; }
  .br-spot { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; display: flex; gap: 12px; margin: 8px 0; }
  .br-link { color: #2563eb; text-decoration: underline; }
  .br-bold { font-weight: 700; }
  .br-italic { font-style: italic; }
`;

// ============ Meta ============

export default {
  title: 'EditorUI/BlockRenderer',
  component: BlockRenderer,
  argTypes: {
    content: { table: { disable: true } },
    classNames: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          margin: '0 auto',
          padding: '24px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BlockRenderer>;

// ============ Stories ============

/** 모든 블록 타입이 포함된 기본 렌더링. 해시태그·스팟·이미지 클릭 시 콘솔에서 이벤트를 확인할 수 있습니다. */
export const Default: StoryObj<typeof BlockRenderer> = {
  parameters: {
    docs: {
      description: {
        story:
          '모든 블록 타입(단락·제목·리스트·인용구·구분선·이미지·링크·스팟)이 포함된 기본 렌더링. 해시태그·스팟·이미지 클릭 시 콘솔에서 콜백 이벤트를 확인할 수 있습니다.',
      },
    },
  },
  args: {
    onHashtagClick: (hashtag: string) => console.log('[onHashtagClick]', hashtag),
    onSpotClick: (spotId: number) => console.log('[onSpotClick]', spotId),
    onImageClick: (src: string) => console.log('[onImageClick]', src),
  },
  argTypes: {
    onHashtagClick: {
      description: '해시태그 클릭 시 호출. 인자: 해시태그 문자열 (# 제외)',
      table: { category: '콜백' },
    },
    onSpotClick: {
      description: '스팟 블록 클릭 시 호출. 인자: spotId (number)',
      table: { category: '콜백' },
    },
    onImageClick: {
      description: '이미지 클릭 시 호출. 인자: 이미지 src URL',
      table: { category: '콜백' },
    },
  },
  render: (args) => (
    <BlockRenderer
      content={ALL_BLOCKS_SAMPLE}
      onHashtagClick={args.onHashtagClick}
      onSpotClick={args.onSpotClick}
      onImageClick={args.onImageClick}
    />
  ),
};

/** classNames prop으로 블록별 CSS 클래스를 커스텀한 예시. */
export const CustomClassNames: StoryObj<typeof BlockRenderer> = {
  parameters: {
    docs: {
      description: {
        story:
          'classNames prop으로 블록별 CSS 클래스를 커스텀한 예시. wrapper·paragraph·heading·list·blockquote·hr·image·hashtag·spot·link·bold·italic 등 요소별로 클래스를 지정할 수 있습니다.',
      },
    },
  },
  render: () => (
    <>
      <style>{CUSTOM_STYLES}</style>
      <BlockRenderer content={ALL_BLOCKS_SAMPLE} classNames={CUSTOM_CLASS_NAMES} />
    </>
  ),
};
