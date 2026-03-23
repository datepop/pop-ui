# 새 블록 타입 확장 가이드

`@pop-ui/editor`와 `@pop-ui/editor-ui`에 새 블록 타입을 추가하는 전체 절차를 설명합니다.

- 코어 API → **[@pop-ui/editor README](../packages/editor/README.md)**
- UI 컴포넌트 → **[@pop-ui/editor-ui README](../packages/editor-ui/README.md)**

---

## 개요 — 건드려야 하는 레이어

| 단계 | 패키지 | 파일 | 필수 여부 |
|---|---|---|---|
| 1. 타입 추가 | `@pop-ui/editor` | `src/types/index.ts` | 필수 |
| 2. 키보드 핸들러 | `@pop-ui/editor` | `src/hooks/blockHandlers/` | 선택 |
| 3. 에디터 엘리먼트 | `@pop-ui/editor-ui` | `src/Editor/elements/` + `src/Editor/index.tsx` | 필수 |
| 4. BlockRenderer | `@pop-ui/editor-ui` | `src/BlockRenderer/index.tsx` | 필수 |
| 5. EditorRef 메서드 | `@pop-ui/editor-ui` | `src/Editor/hooks/useEditorMethods.ts` | 선택 |

이 가이드에서는 **`callout`** 블록을 예시로 전체 흐름을 시연합니다.

---

## Step 1: `@pop-ui/editor` — 타입 추가

**파일:** `packages/editor/src/types/index.ts`

```ts
// 새 인터페이스 정의
export interface ICalloutElement {
  type: 'callout';
  icon?: string;       // 이모지 또는 아이콘 코드
  children: ICustomText[];
}

// TEditorElement union에 추가
export type TEditorElement =
  | IPElement | IH1Element | IH2Element | IH3Element
  | IUlElement | IOlElement | ILiElement
  | IImgElement | IAElement | IHrElement | IBlockquoteElement
  | ISpotElement
  | ICalloutElement;  // ← 추가
```

`BlocksConfig`에 옵션을 추가하려면:

```ts
export interface BlocksConfig {
  // ... 기존 필드 ...
  callout?: boolean;  // ← 추가
}
```

---

## Step 2: `@pop-ui/editor` — 키보드 핸들러 추가 (선택)

블록에 Enter/Backspace 시 특별한 동작이 필요할 때만 작성합니다.

### 2-1. 핸들러 파일 작성

**파일:** `packages/editor/src/hooks/blockHandlers/calloutHandler.ts`

```ts
import { Transforms } from 'slate';
import { createEmptyParagraph } from '../../utils/editorHelpers';
import type { BlockKeyHandler, BlockHandlerContext, HandlerResult } from './types';

export const calloutHandler: BlockKeyHandler = {
  // Enter: 콜아웃 내 줄바꿈 → 다음 블록이 비어 있으면 콜아웃 종료
  onEnter(ctx: BlockHandlerContext): HandlerResult {
    const { editor, currentPath, currentNode } = ctx;
    if (currentNode.type !== 'callout') return { handled: false };

    const isEmpty =
      currentNode.children.length === 1 && currentNode.children[0].text === '';

    if (isEmpty) {
      // 빈 콜아웃에서 Enter → 콜아웃을 단락으로 교환
      Transforms.setNodes(editor, { type: 'p' } as Partial<typeof currentNode>, {
        at: [currentPath],
      });
      return { handled: true };
    }

    return { handled: false };
  },

  // Backspace: 비어 있으면 단락으로 변환
  onBackspace(ctx: BlockHandlerContext): HandlerResult {
    const { editor, currentPath, currentNode, selection } = ctx;
    if (currentNode.type !== 'callout') return { handled: false };

    const isAtStart = selection.anchor.offset === 0 && selection.anchor.path[1] === 0;
    const isEmpty =
      currentNode.children.length === 1 && currentNode.children[0].text === '';

    if (isAtStart || isEmpty) {
      Transforms.setNodes(editor, { type: 'p' } as Partial<typeof currentNode>, {
        at: [currentPath],
      });
      return { handled: true };
    }

    return { handled: false };
  },
};
```

### 2-2. 레지스트리에 등록

**파일:** `packages/editor/src/hooks/blockHandlers/index.ts`

```ts
import { calloutHandler } from './calloutHandler';  // ← 추가

export const blockHandlers: Record<string, BlockKeyHandler> = {
  // ... 기존 핸들러 ...
  callout: calloutHandler,  // ← 추가
};
```

---

## Step 3: `@pop-ui/editor-ui` — 에디터 엘리먼트 추가

### 3-1. 엘리먼트 컴포넌트 작성

**파일:** `packages/editor-ui/src/Editor/elements/CalloutElement.tsx`

```tsx
import React from 'react';
import type { RenderElementProps } from 'slate-react';
import type { ICalloutElement } from '@pop-ui/editor';

export const CalloutElement = ({ attributes, children, element }: RenderElementProps) => {
  const el = element as ICalloutElement;

  return (
    <div
      {...attributes}
      style={{
        display: 'flex',
        gap: '8px',
        padding: '12px 16px',
        background: '#fef9c3',
        borderRadius: '8px',
        margin: '8px 0',
      }}
    >
      <span contentEditable={false} style={{ userSelect: 'none' }}>
        {el.icon ?? '💡'}
      </span>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
};
```

### 3-2. elements/index.ts에 export 추가

**파일:** `packages/editor-ui/src/Editor/elements/index.ts`

```ts
export { CalloutElement } from './CalloutElement';  // ← 추가
```

### 3-3. renderElement switch에 case 추가

**파일:** `packages/editor-ui/src/Editor/index.tsx`

```tsx
import { CalloutElement } from './elements';  // ← 추가

// renderElement 내 switch:
case 'callout': return <CalloutElement {...enhancedProps} />;  // ← 추가
```

---

## Step 4: `@pop-ui/editor-ui` — BlockRenderer 추가

### 4-1. 렌더 함수 추가

**파일:** `packages/editor-ui/src/BlockRenderer/index.tsx`

```tsx
// BlockClassNames에 필드 추가
export interface BlockClassNames {
  // ... 기존 필드 ...
  callout?: string;  // ← 추가
}

// 렌더 함수 추가
function renderCallout(
  el: ICalloutElement,
  classNames: BlockClassNames,
  onHashtagClick?: (h: string) => void,
): React.ReactNode {
  return (
    <div className={classNames.callout} data-icon={el.icon ?? '💡'}>
      <span>{el.icon ?? '💡'}</span>
      <div>{renderChildren(el.children, classNames, onHashtagClick)}</div>
    </div>
  );
}
```

### 4-2. switch에 case 추가

```tsx
// BlockRenderer 내 switch:
case 'callout':
  return (
    <React.Fragment key={i}>
      {renderCallout(block as ICalloutElement, classNames, onHashtagClick)}
    </React.Fragment>
  );
```

---

## Step 5: `@pop-ui/editor-ui` — EditorRef 메서드 추가 (선택)

외부에서 프로그래밍적으로 `callout` 블록을 삽입해야 할 때 추가합니다.

**파일:** `packages/editor-ui/src/Editor/hooks/useEditorMethods.ts`

```ts
// EditorRef 인터페이스에 추가
export interface EditorRef {
  // ... 기존 메서드 ...
  insertCallout(icon?: string): void;  // ← 추가
}

// useImperativeHandle 내 추가
insertCallout: (icon = '💡') => {
  const calloutBlock: ICalloutElement = {
    type: 'callout',
    icon,
    children: [{ text: '' }],
  };
  const { insertAt, needsTrailingTextBlock } = prepareInsertPosition();
  const nodes: TEditorElement[] = [calloutBlock];
  if (needsTrailingTextBlock) nodes.push(createEmptyParagraph());
  Transforms.insertNodes(editor, nodes, { at: [insertAt] });
  Transforms.select(editor, Editor.start(editor, [insertAt]));
  ReactEditor.focus(editor);
},
```

---

## 검증 체크리스트

```bash
# 타입 에러 확인
yarn workspace @pop-ui/editor typecheck
yarn workspace @pop-ui/editor-ui typecheck

# Storybook 실행 후 EditorUI/Editor, EditorUI/BlockRenderer 스토리 확인
cd /path/to/pop-ui && yarn start
```

- [ ] `TEditorElement`에 새 타입이 포함되어 있는가
- [ ] 에디터에서 새 블록 삽입 후 정상 렌더링되는가
- [ ] Enter / Backspace 키 동작이 예상대로 동작하는가
- [ ] `BlockRenderer`에서 새 블록이 올바르게 렌더링되는가
- [ ] Storybook의 `AllBlocksEnabled` 스토리에서 새 블록 확인 가능한가

---

## Related

- **[@pop-ui/editor README](../packages/editor/README.md)** — 타입 시스템, 훅 API
- **[@pop-ui/editor-ui README](../packages/editor-ui/README.md)** — 컴포넌트 Props, BlockClassNames
