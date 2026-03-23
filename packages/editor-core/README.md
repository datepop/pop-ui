# @pop-ui/editor-core

Slate 에디터 AST의 **순수 타입 정의**와 **플랫폼 무관 유틸리티** 패키지.

React, DOM 등 런타임 의존성이 없으므로 React Native readonly 렌더러 등 어디서든 타입과 유틸만 가져다 쓸 수 있다.

## 목차

1. [설치](#설치)
2. [타입](#타입)
3. [유틸리티](#유틸리티)
4. [사용 예시](#사용-예시)
5. [Related](#related)

---

## 설치

```bash
npm install @pop-ui/editor-core
# peer
npm install slate
```

| peer | version |
|------|---------|
| `slate` | `^0.120.0` |

---

## 타입

### 블록 엘리먼트 — `TEditorElement`

모든 블록 타입의 유니온. 베이스 인터페이스(`IBaseElement` → `IBaseTextElement` / `IBaseListElement`)를 상속한다.

```
IBaseElement { type }
├─ IBaseTextElement { children: ICustomText[] }
└─ IBaseListElement { children: ILiElement[] }
```

| 타입 | 인터페이스 | 베이스 | 주요 필드 |
|------|-----------|--------|----------|
| `p` | `IPElement` | `IBaseTextElement` | |
| `h1` `h2` `h3` | `IH1Element` `IH2Element` `IH3Element` | `IBaseTextElement` | |
| `ul` | `IUlElement` | `IBaseListElement` | |
| `ol` | `IOlElement` | `IBaseListElement` | |
| `li` | `ILiElement` | `IBaseTextElement` | |
| `img` | `IImgElement` | `IBaseTextElement` | `src`, `alt?`, `caption?` |
| `a` | `IAElement` | `IBaseTextElement` | `href` |
| `hr` | `IHrElement` | `IBaseTextElement` | `variant?: 'default' \| 'short'` |
| `blockquote` | `IBlockquoteElement` | `IBaseTextElement` | `variant?: 'default' \| 'solid'` |
| `spot` | `ISpotElement` | `IBaseTextElement` | `spotId`, `spotName?`, `spotAddress?`, `spotThumbnail?` |

### 인라인 텍스트 — `ICustomText`

```ts
interface ICustomText {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;     // hex
  hashtag?: boolean;  // decorator가 설정, 저장 X
  href?: string;      // 인라인 링크
}
```

### 블록 활성화 — `IBlocksConfig`

어떤 블록을 활성화할지 제어한다. `p`는 항상 활성.

```ts
interface IBlocksConfig {
  heading?: boolean | THeadingLevel[];       // 'h1' | 'h2' | 'h3'
  list?: boolean | TListType[];              // 'ul' | 'ol'
  blockquote?: boolean | TBlockquoteVariant[];
  hr?: boolean | THrVariant[];
  image?: boolean;
  spot?: boolean;
  link?: boolean;
}
```

### 포맷 / 도구 설정

```ts
interface IFormatsConfig {
  bold?: boolean;
  italic?: boolean;
  hashtag?: boolean;
}

interface IToolsConfig {
  charCount?: boolean;
  dragAndDrop?: boolean;
  htmlPaste?: boolean;
  floatingToolbar?: boolean;
}
```

### 기타 공통 타입

| 타입 | 설명 |
|------|------|
| `IContentStats` | `{ charCount, hashtags: string[], spotIds: number[] }` |
| `IParseHtmlToSlateResult` | `{ blocks: TEditorElement[], imageUrls: string[] }` |
| `ISpotData` | `{ id, name, address?, thumbnail? }` |
| `IProcessedImage` | `{ originalSrc, newSrc, file? }` |

---

## 유틸리티

### 상수

```ts
import {
  VOID_ELEMENTS,       // ['img', 'spot', 'hr', 'a']
  HEADING_ELEMENTS,    // ['h1', 'h2', 'h3']
  LIST_ELEMENTS,       // ['ul', 'ol']
  DRAGGABLE_ELEMENTS,  // ['img', 'spot', 'hr', 'a']
} from '@pop-ui/editor-core';
```

### `computeContentStats`

Slate AST를 순회하여 글자 수 · 해시태그 · 스팟 ID를 추출한다.

```ts
const stats: IContentStats = computeContentStats(content);
// { charCount: 142, hashtags: ['맛집', '서울'], spotIds: [301, 455] }
```

### `decorateHashtags`

Slate `decorate` prop에 전달하여 `#태그`를 하이라이트한다.

```ts
<Slate decorate={([node, path]) => decorateHashtags([node, path])}>
```

### 타입 가드

```ts
isDraggableElement(type: string): boolean
isElementOfType(node: Node, types: readonly string[]): boolean
findLiEntry(editor: Editor): NodeEntry | undefined
findListEntry(editor: Editor): NodeEntry | undefined
```

---

## 사용 예시

### React Native readonly 렌더링

```tsx
import type { TEditorElement, ICustomText } from '@pop-ui/editor-core';
import { computeContentStats } from '@pop-ui/editor-core';

function ReadonlyRenderer({ blocks }: { blocks: TEditorElement[] }) {
  const stats = computeContentStats(blocks);

  return (
    <View>
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
      <Text>글자 수: {stats.charCount}</Text>
    </View>
  );
}
```

---

## Related

| 패키지 | 설명 |
|--------|------|
| [`@pop-ui/editor`](../editor) | 로직 + UI 통합 에디터 (React/DOM) |
