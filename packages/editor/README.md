# @pop-ui/editor

Slate 기반 **로직 + UI 통합** 에디터 패키지.

`<Editor>`, `<BlockRenderer>` 컴포넌트와 함께 에디터 생성 유틸, 훅, 클립보드 처리 등을 하나의 패키지로 제공한다.
순수 타입과 플랫폼 무관 유틸은 [`@pop-ui/editor-core`](../editor-core)에서 가져오며, 이 패키지가 re-export한다.

## 목차

1. [설치](#설치)
2. [패키지 구조](#패키지-구조)
3. [빠른 시작](#빠른-시작)
4. [Editor 컴포넌트](#editor-컴포넌트)
5. [BlockRenderer 컴포넌트](#blockrenderer-컴포넌트)
6. [유틸 API](#유틸-api)
7. [훅 API](#훅-api)
8. [블록 핸들러 확장](#블록-핸들러-확장)
9. [Related](#related)

---

## 설치

```bash
npm install @pop-ui/editor
```

### Peer dependencies

| 패키지 | 버전 |
|--------|------|
| `react` | `^19.2.0` |
| `slate` | `^0.120.0` |
| `slate-dom` | `^0.119.0` |
| `slate-history` | `^0.113.1` |
| `slate-react` | `^0.120.0` |

---

## 패키지 구조

```
@pop-ui/editor-core   순수 타입 · 상수 · 유틸 (React/DOM 무관)
        ↑
@pop-ui/editor        로직 + UI 통합 (React/DOM)
  ├─ <Editor>         편집 컴포넌트
  ├─ <BlockRenderer>  readonly 렌더링 컴포넌트
  ├─ 훅               useKeyboardHandler, useHtmlPaste, useContentStats …
  └─ 유틸             createSlateEditor, parseHtmlToSlate, clipboard …
```

`@pop-ui/editor-core`의 모든 타입·유틸은 이 패키지에서 re-export되므로, 웹 프로젝트에서는 `@pop-ui/editor`만 설치하면 된다.

---

## 빠른 시작

```tsx
import { useState, useRef } from 'react';
import { Editor, type IEditorRef, type TEditorElement } from '@pop-ui/editor';

const INITIAL: TEditorElement[] = [{ type: 'p', children: [{ text: '' }] }];

function MyEditor() {
  const [value, setValue] = useState<TEditorElement[]>(INITIAL);
  const editorRef = useRef<IEditorRef>(null);

  return (
    <Editor
      ref={editorRef}
      value={value}
      onChange={setValue}
      enabledBlocks={{ heading: true, list: true, image: true }}
      toolbar
      inlineToolbar
      placeholder="내용을 입력하세요"
    />
  );
}
```

---

## Editor 컴포넌트

### `IEditorProps`

```ts
interface IEditorProps {
  value: TEditorElement[];
  onChange: (value: TEditorElement[]) => void;
  enabledBlocks?: IBlocksConfig;
  placeholder?: string;
  onNavigateToTitle?: () => void;
  onProcessImages?: (urls: string[]) => Promise<IProcessedImage[]>;
  onProcessImageFiles?: (files: File[]) => Promise<IProcessedImage[]>;
  insertTrigger?: unknown;
  toolbar?: boolean | IToolbarConfig;
  inlineToolbar?: boolean | IInlineToolbarConfig;
  blockSpacing?: number;   // 블록 간 간격 px (기본 16)
  lineHeight?: number | string; // 텍스트 line-height (기본 '175%')
}
```

### `IEditorRef` — 명령형 API

`useRef<IEditorRef>`로 접근한다.

| 메서드 | 설명 |
|--------|------|
| `focus()` | 에디터 포커스 |
| `scrollToHashtag(hashtag)` | 해시태그 위치로 스크롤. 성공 시 `true` |
| `insertTextBlockAtStart()` | 첫 번째 위치에 빈 문단 삽입 |
| `insertImages(urls)` | 이미지 블록 삽입 |
| `insertSpots(spots)` | 스팟 블록 삽입 |
| `removeSpotById(spotId)` | 스팟 블록 제거. 성공 시 `true` |
| `insertH1()` | H1 블록 삽입 |
| `insertUl()` / `insertOl()` | 리스트 블록 삽입 |
| `insertLink(href)` | 링크 블록 삽입 |
| `insertHr(variant?)` | 구분선 삽입 (`'default'` \| `'short'`) |
| `insertBlockquote(variant?)` | 인용구 삽입 (`'default'` \| `'solid'`) |

### `IToolbarConfig`

```ts
interface IToolbarConfig {
  onInsertImage?: () => Promise<string[] | null | undefined>;
  onInsertLink?: () => Promise<string | null | undefined>;
  onInsertSpot?: () => Promise<ISpotInsertData[] | null | undefined>;
  singleHeading?: boolean;  // h1 + p만 표시
  iconOnly?: boolean;       // 텍스트 라벨 숨김
}
```

### `IInlineToolbarConfig`

```ts
interface IInlineToolbarConfig {
  color?: boolean;         // 색상 버튼 표시 (기본 true)
  colorPalette?: string[]; // 커스텀 색상 배열 (hex)
  boundaryRef?: React.RefObject<HTMLElement | null>; // 툴바 위치 제한 영역 (기본: 에디터 wrapper)
}
```

`boundaryRef`를 지정하면 해당 요소의 좌우 경계를 기준으로 InlineToolbar가 잘리지 않도록 clamp된다. 미지정 시 에디터 wrapper 영역이 기본 boundary로 사용된다.

---

## BlockRenderer 컴포넌트

Slate AST를 **readonly HTML**로 렌더링하는 컴포넌트. 에디터 없이 콘텐츠를 표시할 때 사용한다.

```tsx
import { BlockRenderer } from '@pop-ui/editor';

<BlockRenderer
  content={blocks}
  onHashtagClick={(tag) => router.push(`/hashtag/${tag}`)}
  onSpotClick={(id) => router.push(`/spot/${id}`)}
  onImageClick={(src) => openLightbox(src)}
/>
```

### `IBlockRendererProps`

```ts
interface IBlockRendererProps {
  content: TEditorElement[];
  classNames?: IBlockClassNames;
  headingOffset?: number;  // heading 레벨 오프셋 (기본 0). 1이면 h1→h2, h2→h3
  onHashtagClick?: (hashtag: string) => void;
  onSpotClick?: (spotId: number) => void;
  onImageClick?: (src: string) => void;
}
```

> 페이지에 별도 `<h1>` 제목이 있을 경우 `headingOffset={1}`로 콘텐츠 heading을 한 단계 내린다.

### `IBlockClassNames`

블록 타입별 CSS 클래스를 주입한다.

```ts
interface IBlockClassNames {
  wrapper?: string;
  paragraph?: string;
  heading1?: string;
  heading2?: string;
  heading3?: string;
  list?: string;
  listItem?: string;
  image?: string;
  imageCaption?: string;
  spot?: string;
  blockquote?: string;
  hr?: string;
  link?: string;
  bold?: string;
  italic?: string;
  hashtag?: string;
}
```

---

## 유틸 API

### `createSlateEditor`

```ts
const editor = createSlateEditor(): TCustomEditor;
```

React · History · 리스트 붙여넣기 · 링크 경계 플러그인이 적용된 Slate 인스턴스를 생성한다.
`img`, `spot`, `hr`, `a`는 void element로 설정된다.

### `parseHtmlToSlate` / `hasHtmlContent`

```ts
const { blocks, imageUrls } = parseHtmlToSlate(html: string): IParseHtmlToSlateResult;
const isHtml = hasHtmlContent(html: string): boolean;
```

HTML 문자열을 Slate 블록 배열로 변환한다. 외부 HTML 붙여넣기 처리에 사용된다.
`javascript:`, `data:` 등 위험한 프로토콜의 href는 자동으로 제거된다.

### `sanitizeHref`

```ts
sanitizeHref(href: string | null | undefined): string | undefined
```

href 값을 검증하여 `http:`/`https:` 프로토콜만 허용한다. 내부적으로 parseHtmlToSlate, Leaf, BlockRenderer, AElement에서 사용된다.

### 클립보드 유틸

```ts
// 블록을 sessionStorage + 클립보드 텍스트에 저장
copyBlockToClipboard(block: TEditorElement): Promise<void>

// Slate 프래그먼트 → HTML 문자열
slateFragmentToHtml(fragment: Descendant[], options?: { excludeDataUrlImages?: boolean }): string

// Slate 프래그먼트 → 플레인 텍스트
getPlainText(fragment: Descendant[]): string

// data: URL 이미지 탐색
findDataUrlImageNode(fragment: Descendant[]): IImgElement | undefined
hasDataUrlImage(fragment: Descendant[]): boolean

// 클립보드에서 이미지 파일 추출
getImageFilesFromClipboard(clipboardData: DataTransfer): File[]

// data: URL → Blob 변환
dataUrlToBlob(dataUrl: string): Blob
```

### 트랜스폼 유틸

```ts
createEmptyParagraph(): IPElement
insertBlockAndFocus(editor, block, at: number): void
```

---

## 훅 API

### `useKeyboardHandler`

블록 타입별 키보드 동작(Enter, Backspace, 화살표 키 등)을 처리한다.

```ts
const { handleKeyDown } = useKeyboardHandler({
  editor: TCustomEditor,
  enabledBlocks: IBlocksConfig,
  onNavigateToTitle?: () => void,
});
```

### `useHtmlPaste`

HTML 붙여넣기 · 클립보드 이미지 · 블록 복사-붙여넣기를 통합 처리한다.

```ts
const { handlePaste } = useHtmlPaste({
  editor: TCustomEditor,
  enabled: boolean,
  onProcessImages?: (urls: string[]) => Promise<IProcessedImage[]>,
  onProcessImageFiles?: (files: File[]) => Promise<IProcessedImage[]>,
});
```

처리 우선순위: sessionStorage 블록 → 클립보드 이미지 파일 → Slate 내부 프래그먼트 → HTML 파싱.

### `useContentStats`

```ts
const { charCount, hashtags, spotIds } = useContentStats(content: TEditorElement[]): IContentStats;
```

`computeContentStats`의 메모이제이션 래퍼.

### `useComposition` / `CompositionProvider`

IME 조합(한글/중국어 입력 등) 상태를 추적한다.

```ts
// Editor 내부에서 이미 감싸져 있으므로 별도 설정 불필요
const { isComposing, setIsComposing } = useComposition();
```

---

## 블록 핸들러 확장

`blockHandlers` 레지스트리는 블록 타입 → `IBlockKeyHandler` 매핑이다.

```ts
interface IBlockKeyHandler {
  onEnter?: (ctx: IBlockHandlerContext) => IHandlerResult;
  onBackspace?: (ctx: IBlockHandlerContext) => IHandlerResult;
  onDelete?: (ctx: IBlockHandlerContext) => IHandlerResult;
  onArrowUp?: (ctx: IBlockHandlerContext) => IHandlerResult;
  onArrowDown?: (ctx: IBlockHandlerContext) => IHandlerResult;
  onArrowLeft?: (ctx: IBlockHandlerContext) => IHandlerResult;
  onArrowRight?: (ctx: IBlockHandlerContext) => IHandlerResult;
}
```

새 블록 타입의 키 동작을 추가하려면 `IBlockKeyHandler`를 구현하고 `blockHandlers`에 등록한다.

---

## Related

| 패키지 | 설명 |
|--------|------|
| [`@pop-ui/editor-core`](../editor-core) | 순수 타입 · 유틸 (React/DOM 무관, RN 호환) |
