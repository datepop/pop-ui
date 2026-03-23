import { ColorRed500 } from '@pop-ui/foundation';

import type { TEditorElement } from '../types';

/** 모든 블록 타입 + 모든 변형(variant) + 모든 인라인 서식을 포함하는 샘플 콘텐츠 */
export const ALL_BLOCKS_SAMPLE: TEditorElement[] = [
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
  { type: 'p', children: [{ text: '#해시태그1 와 #해시태그2 가 포함된 단락입니다.' }] },
  {
    type: 'ul',
    children: [
      { type: 'li', children: [{ text: '순서 없는 목록 1' }] },
      { type: 'li', children: [{ text: '순서 없는 목록 2' }] },
      { type: 'li', children: [{ text: '순서 없는 목록 3' }] },
    ],
  },
  {
    type: 'ol',
    children: [
      { type: 'li', children: [{ text: '순서 있는 목록 1' }] },
      { type: 'li', children: [{ text: '순서 있는 목록 2' }] },
    ],
  },
  { type: 'h3', children: [{ text: '소소제목 (H3)' }] },
  { type: 'blockquote', variant: 'default', children: [{ text: '기본 인용구 (default)' }] },
  { type: 'blockquote', variant: 'solid', children: [{ text: '강조 인용구 (solid)' }] },
  { type: 'hr', variant: 'default', children: [{ text: '' }] },
  { type: 'hr', variant: 'short', children: [{ text: '' }] },
  {
    type: 'img',
    src: 'https://picsum.photos/600/300',
    alt: '샘플 이미지',
    caption: '이미지 캡션',
    children: [{ text: '' }],
  },
  { type: 'a', href: 'https://example.com', children: [{ text: 'https://example.com' }] },
  {
    type: 'spot',
    spotId: 1,
    spotName: '경복궁',
    spotAddress: '서울특별시 종로구 사직로 161',
    spotThumbnail: 'https://picsum.photos/80/80',
    children: [{ text: '' }],
  },
  { type: 'p', children: [{ text: '마무리 단락입니다.' }] },
];

/** 빈 에디터 초기값 (빈 단락 하나) */
export const EMPTY_CONTENT: TEditorElement[] = [{ type: 'p', children: [{ text: '' }] }];
