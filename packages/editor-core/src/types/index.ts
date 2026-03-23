// ============ 텍스트 노드 ============

export interface ICustomText {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string; // 텍스트 색상 (hex)
  hashtag?: boolean; // 데코레이터로 감지, 저장되지 않음
  href?: string; // 인라인 링크
}

// ============ 블록 엘리먼트 ============

export interface IPElement {
  type: 'p';
  children: ICustomText[];
}
export interface IH1Element {
  type: 'h1';
  children: ICustomText[];
}
export interface IH2Element {
  type: 'h2';
  children: ICustomText[];
}
export interface IH3Element {
  type: 'h3';
  children: ICustomText[];
}
export interface IUlElement {
  type: 'ul';
  children: ILiElement[];
}
export interface IOlElement {
  type: 'ol';
  children: ILiElement[];
}
export interface ILiElement {
  type: 'li';
  children: ICustomText[];
}
export interface IHrElement {
  type: 'hr';
  variant?: 'default' | 'short';
  children: ICustomText[];
}
export interface IBlockquoteElement {
  type: 'blockquote';
  variant?: 'default' | 'solid';
  children: ICustomText[];
}

// void — children은 Slate 내부용
export interface IImgElement {
  type: 'img';
  src: string;
  alt?: string;
  caption?: string;
  children: ICustomText[];
}

export interface IAElement {
  type: 'a';
  href: string;
  children: ICustomText[];
}

export interface ISpotElement {
  type: 'spot';
  spotId: number;
  spotName?: string;
  spotAddress?: string;
  spotThumbnail?: string;
  children: ICustomText[];
}

export type TEditorElement =
  | IPElement
  | IH1Element
  | IH2Element
  | IH3Element
  | IUlElement
  | IOlElement
  | ILiElement
  | IImgElement
  | IAElement
  | IHrElement
  | IBlockquoteElement
  | ISpotElement;

// ============ 기능 제어 타입 ============

export type THeadingLevel = 'h1' | 'h2' | 'h3';
export type TListType = 'ul' | 'ol';
export type TBlockquoteVariant = 'default' | 'solid';
export type THrVariant = 'default' | 'short';

/**
 * 허용할 블록 타입 제어.
 * true = 전체 허용 / false 또는 생략 = 비활성화 / 배열 = 허용 변형만
 * paragraph(p)는 항상 활성화된다.
 */
export interface IBlocksConfig {
  heading?: boolean | THeadingLevel[];
  list?: boolean | TListType[];
  blockquote?: boolean | TBlockquoteVariant[];
  hr?: boolean | THrVariant[];
  image?: boolean;
  spot?: boolean;
  link?: boolean;
}

/**
 * 인라인 텍스트 포맷 제어.
 */
export interface IFormatsConfig {
  bold?: boolean;
  italic?: boolean;
  hashtag?: boolean; // 해시태그 하이라이팅 (데코레이터)
}

/**
 * 에디터 부가 기능 제어.
 */
export interface IToolsConfig {
  charCount?: boolean;
  dragAndDrop?: boolean;
  htmlPaste?: boolean;
  floatingToolbar?: boolean;
}

// ============ 공통 인터페이스 ============

export interface ISpotData {
  id: number;
  name: string;
  address?: string;
  thumbnail?: string;
}

export interface IProcessedImage {
  originalSrc: string;
  newSrc: string;
  file?: File;
}

// ============ 통계/파서 결과 타입 ============

export interface IContentStats {
  charCount: number;
  hashtags: string[];
  spotIds: number[];
}

/**
 * parseHtmlToSlate 반환 타입
 */
export interface IParseHtmlToSlateResult {
  blocks: TEditorElement[];
  imageUrls: string[];
}
