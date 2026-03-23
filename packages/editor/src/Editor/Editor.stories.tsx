import { ColorRed500 } from '@pop-ui/foundation';
import React, { useRef, useState } from 'react';

import { EditorComponent } from './index';

import type { IEditorRef, IInlineToolbarConfig, IToolbarConfig } from './index';
import type { TEditorElement } from '../types';
import type { Meta, StoryObj } from '@storybook/react-vite';

// ============ 샘플 데이터 ============

const EMPTY_VALUE: TEditorElement[] = [{ type: 'p', children: [{ text: '' }] }];

const RICH_SAMPLE: TEditorElement[] = [
  { type: 'h1', children: [{ text: '제목 블록 (H1)' }] },
  {
    type: 'p',
    children: [
      { text: '일반 단락입니다. ' },
      { text: '굵게', bold: true },
      { text: '와 ' },
      { text: '기울임', italic: true },
      { text: ', ' },
      { text: '밑줄', underline: true },
      { text: ', ' },
      { text: '빨간색', color: ColorRed500 },
      { text: ', ' },
      { text: '링크', href: 'https://datepop.co.kr' },
      { text: '를 지원합니다.' },
    ],
  },
  { type: 'h2', children: [{ text: '소제목 (H2)' }] },
  { type: 'p', children: [{ text: '#해시태그 를 입력하면 하이라이팅됩니다.' }] },
  {
    type: 'ul',
    children: [
      { type: 'li', children: [{ text: '순서 없는 목록 1' }] },
      { type: 'li', children: [{ text: '순서 없는 목록 2' }] },
    ],
  },
  {
    type: 'ol',
    children: [
      { type: 'li', children: [{ text: '순서 있는 목록 1' }] },
      { type: 'li', children: [{ text: '순서 있는 목록 2' }] },
    ],
  },
  { type: 'blockquote', variant: 'default', children: [{ text: '기본 인용구 (default variant)' }] },
  { type: 'blockquote', variant: 'solid', children: [{ text: '강조 인용구 (solid variant)' }] },
  { type: 'hr', variant: 'default', children: [{ text: '' }] },
  { type: 'p', children: [{ text: '구분선 아래 단락입니다.' }] },
];

// ============ Wrapper 컴포넌트 ============

type TEditorWithStateProps = Omit<
  React.ComponentProps<typeof EditorComponent>,
  'value' | 'onChange'
> & {
  initialValue?: TEditorElement[];
};

const EditorWithState = ({ initialValue = EMPTY_VALUE, ...props }: TEditorWithStateProps) => {
  const [value, setValue] = useState<TEditorElement[]>(initialValue);
  return <EditorComponent {...props} value={value} onChange={setValue} />;
};

// ============ Meta ============

export default {
  title: 'EditorUI/Editor',
  component: EditorComponent,
  argTypes: {
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    insertTrigger: { table: { disable: true } },
    onNavigateToTitle: { table: { disable: true } },
    onProcessImages: { table: { disable: true } },
    onProcessImageFiles: { table: { disable: true } },
    enabledBlocks: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          margin: '0 auto',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          minHeight: '400px',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EditorComponent>;

// ============ Stories ============

/** 빈 에디터. Controls 패널에서 toolbar / inlineToolbar / blockSpacing / lineHeight 등을 조작할 수 있습니다. */
export const Default: StoryObj<typeof EditorComponent> = {
  parameters: {
    docs: {
      description: {
        story:
          '빈 에디터. Controls 패널에서 toolbar / inlineToolbar / blockSpacing / lineHeight 등을 조작할 수 있습니다.',
      },
    },
  },
  args: {
    placeholder: '내용을 입력해주세요',
    toolbar: true,
    inlineToolbar: true,
    padding: 16,
    blockSpacing: 16,
    lineHeight: '175%',
  },
  render: ({ toolbar, inlineToolbar, placeholder, padding, blockSpacing, lineHeight }) => (
    <EditorWithState
      initialValue={EMPTY_VALUE}
      toolbar={toolbar}
      inlineToolbar={inlineToolbar}
      placeholder={placeholder}
      padding={padding}
      blockSpacing={blockSpacing}
      lineHeight={lineHeight}
      onProcessImageFiles={async (files) =>
        files.map((file) => ({ originalSrc: '', newSrc: URL.createObjectURL(file), file }))
      }
    />
  ),
};

/** 모든 블록 타입과 인라인 서식이 포함된 샘플. 시각적 확인용. */
export const AllBlocks: StoryObj<typeof EditorComponent> = {
  parameters: {
    docs: {
      description: {
        story:
          '모든 블록 타입(제목·단락·리스트·인용구·구분선)과 인라인 서식(굵게·기울임·밑줄·색상·링크)이 포함된 샘플. 시각적 확인용.',
      },
    },
  },
  render: () => (
    <EditorWithState
      initialValue={RICH_SAMPLE}
      toolbar
      inlineToolbar
      onProcessImageFiles={async (files) =>
        files.map((file) => ({ originalSrc: '', newSrc: URL.createObjectURL(file), file }))
      }
    />
  ),
};

/** ref를 통한 명령형 API 테스트. 상단 버튼 패널로 각 메서드를 호출할 수 있습니다. */
export const EditorRef: StoryObj<typeof EditorComponent> = {
  parameters: {
    docs: {
      description: {
        story:
          'ref를 통한 명령형 API 테스트. 상단 버튼 패널로 focus, insertH1, insertUl, insertOl, insertHr, insertBlockquote, insertLink, insertImages, insertSpots 등의 메서드를 호출할 수 있습니다.',
      },
    },
  },
  render: () => {
    const EditorRefPanel = () => {
      const [value, setValue] = useState<TEditorElement[]>([
        { type: 'p', children: [{ text: '#해시태그 가 포함된 단락입니다.' }] },
      ]);
      const ref = useRef<IEditorRef>(null);

      const buttonStyle: React.CSSProperties = {
        padding: '4px 10px',
        fontSize: '12px',
        border: '1px solid #d1d5db',
        borderRadius: '4px',
        cursor: 'pointer',
        background: '#f9fafb',
      };

      return (
        <div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '12px',
              padding: '8px',
              background: '#f3f4f6',
              borderRadius: '6px',
            }}
          >
            <button style={buttonStyle} onClick={() => ref.current?.focus()}>
              focus()
            </button>
            <button style={buttonStyle} onClick={() => ref.current?.insertH1()}>
              insertH1()
            </button>
            <button style={buttonStyle} onClick={() => ref.current?.insertUl()}>
              insertUl()
            </button>
            <button style={buttonStyle} onClick={() => ref.current?.insertOl()}>
              insertOl()
            </button>
            <button style={buttonStyle} onClick={() => ref.current?.insertHr('default')}>
              insertHr(default)
            </button>
            <button style={buttonStyle} onClick={() => ref.current?.insertHr('short')}>
              insertHr(short)
            </button>
            <button style={buttonStyle} onClick={() => ref.current?.insertBlockquote('default')}>
              insertBlockquote(default)
            </button>
            <button style={buttonStyle} onClick={() => ref.current?.insertBlockquote('solid')}>
              insertBlockquote(solid)
            </button>
            <button
              style={buttonStyle}
              onClick={() => ref.current?.insertLink('https://example.com')}
            >
              insertLink()
            </button>
            <button
              style={buttonStyle}
              onClick={() => ref.current?.insertImages(['https://picsum.photos/600/400'])}
            >
              insertImages()
            </button>
            <button
              style={buttonStyle}
              onClick={() =>
                ref.current?.insertSpots([{ id: 1, name: '경복궁', address: '서울 종로구' }])
              }
            >
              insertSpots()
            </button>
            <button style={buttonStyle} onClick={() => ref.current?.insertTextBlockAtStart()}>
              insertTextBlockAtStart()
            </button>
            <button style={buttonStyle} onClick={() => ref.current?.scrollToHashtag('해시태그')}>
              scrollToHashtag()
            </button>
          </div>
          <EditorComponent ref={ref} value={value} onChange={setValue} inlineToolbar />
        </div>
      );
    };

    return <EditorRefPanel />;
  },
};

type TPlaygroundArgs = {
  placeholder: string;
  padding: number;
  blockSpacing: number;
  lineHeight: string;
  iconOnly: boolean;
  singleHeading: boolean;
  inlineToolbar: boolean;
  color: boolean;
  heading: boolean;
  list: boolean;
  hr: boolean;
  blockquote: boolean;
  link: boolean;
  image: boolean;
  spot: boolean;
};

const PlaygroundWrapper = ({
  placeholder,
  padding,
  blockSpacing,
  lineHeight,
  iconOnly,
  singleHeading,
  inlineToolbar,
  color,
  heading,
  list,
  hr,
  blockquote,
  link,
  image,
  spot,
}: TPlaygroundArgs) => {
  const [value, setValue] = useState<TEditorElement[]>(EMPTY_VALUE);

  const toolbarConfig: IToolbarConfig = {
    iconOnly,
    singleHeading,
    onInsertSpot: spot
      ? async () => [
          {
            id: 1,
            name: '경복궁',
            address: '서울 종로구',
            thumbnail: 'https://picsum.photos/80/80',
          },
        ]
      : undefined,
  };

  const inlineToolbarConfig: IInlineToolbarConfig | boolean = inlineToolbar ? { color } : false;

  return (
    <EditorComponent
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      padding={padding}
      blockSpacing={blockSpacing}
      lineHeight={lineHeight}
      toolbar={toolbarConfig}
      inlineToolbar={inlineToolbarConfig}
      enabledBlocks={{ heading, list, hr, blockquote, link, image, spot }}
      onProcessImageFiles={async (files) =>
        files.map((file) => ({ originalSrc: '', newSrc: URL.createObjectURL(file), file }))
      }
    />
  );
};

export const Playground: StoryObj<TPlaygroundArgs> = {
  parameters: {
    docs: {
      description: {
        story:
          '에디터 기본 설정(placeholder·blockSpacing·lineHeight), 툴바 옵션(iconOnly·singleHeading·inlineToolbar), 블록 활성화(heading·list·hr·blockquote·link·image·spot)를 Controls에서 개별 조작할 수 있는 인터랙티브 플레이그라운드.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: '에디터 내용이 비어있을 때 표시되는 안내 텍스트',
      table: { category: '에디터 기본' },
    },
    padding: {
      control: { type: 'range', min: 0, max: 48, step: 4 },
      description: '에디터 내부 패딩 (px). 콘텐츠 영역과 툴바의 좌우 여백을 조절합니다.',
      table: { category: '에디터 기본' },
    },
    blockSpacing: {
      control: { type: 'range', min: 0, max: 48, step: 4 },
      description: '블록 간 하단 여백 (px). 단락·제목·리스트 등 블록 사이 간격을 조절합니다.',
      table: { category: '에디터 기본' },
    },
    lineHeight: {
      control: 'select',
      options: ['100%', '125%', '150%', '175%', '200%'],
      description: '텍스트 줄 간격. 값이 클수록 줄 사이가 넓어집니다.',
      table: { category: '에디터 기본' },
    },
    iconOnly: {
      control: 'boolean',
      description: '툴바 버튼을 아이콘만 표시 (텍스트 레이블 숨김)',
      table: { category: '툴바 (toolbar)' },
    },
    singleHeading: {
      control: 'boolean',
      description: '제목 드롭다운을 "제목(H1) / 본문(P)" 2가지로만 표시',
      table: { category: '툴바 (toolbar)' },
    },
    inlineToolbar: {
      control: 'boolean',
      description: '텍스트 선택 시 플로팅 인라인 툴바 표시 (굵게·기울임·밑줄·링크·색상)',
      table: { category: '인라인 툴바 (inlineToolbar)' },
    },
    color: {
      control: 'boolean',
      description: '인라인 툴바에 텍스트 색상 버튼 표시. 끄면 색상 기능이 비활성화됩니다.',
      table: { category: '인라인 툴바 (inlineToolbar)' },
    },
    heading: {
      control: 'boolean',
      description: '제목 블록 사용 (H1·H2·H3)',
      table: { category: '블록 활성화 (enabledBlocks)' },
    },
    list: {
      control: 'boolean',
      description: '리스트 블록 사용 (순서 없는 목록·순서 있는 목록)',
      table: { category: '블록 활성화 (enabledBlocks)' },
    },
    hr: {
      control: 'boolean',
      description: '구분선 블록 사용',
      table: { category: '블록 활성화 (enabledBlocks)' },
    },
    blockquote: {
      control: 'boolean',
      description: '인용구 블록 사용 (default·solid 변형)',
      table: { category: '블록 활성화 (enabledBlocks)' },
    },
    link: {
      control: 'boolean',
      description: '링크 블록 사용',
      table: { category: '블록 활성화 (enabledBlocks)' },
    },
    image: {
      control: 'boolean',
      description: '이미지 블록 사용',
      table: { category: '블록 활성화 (enabledBlocks)' },
    },
    spot: {
      control: 'boolean',
      description: '스팟(장소) 블록 사용. 활성화 시 툴바에 스팟 삽입 버튼이 표시됩니다.',
      table: { category: '블록 활성화 (enabledBlocks)' },
    },
  },
  args: {
    placeholder: '내용을 입력해주세요',
    padding: 16,
    blockSpacing: 16,
    lineHeight: '175%',
    iconOnly: false,
    singleHeading: false,
    inlineToolbar: true,
    color: true,
    heading: true,
    list: true,
    hr: true,
    blockquote: true,
    link: true,
    image: true,
    spot: true,
  },
  render: (args) => <PlaygroundWrapper {...args} />,
};
