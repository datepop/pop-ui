# pop-ui — AI/사람 공용 사용 가이드

사내 디자인 시스템. Mantine을 래핑한 React 컴포넌트 + style-dictionary 토큰. 이 문서는 사람과 AI가 pop-ui를 **예측 가능하게** 쓰도록 API 컨벤션을 박제한다. 컴포넌트를 쓰기 전에 이 규칙을 먼저 읽으면 소스를 grep할 필요가 없다.

## 패키지 구조

- **`@pop-ui/core`** — 컴포넌트(Button, Modal, …). 실제 러너: 루트 `yarn test`(vitest).
- **`@pop-ui/foundation`** — 디자인 토큰(색상 `ColorGray600`, radius `BorderRadius150`), 아이콘, 일러스트.
- 모노레포(Lerna + yarn 4). Storybook 10으로 문서화.

## Import 방법

**모든 컴포넌트는 named export만 있다. default import는 없다.**

```tsx
import { Button, Modal, TextField } from '@pop-ui/core';
import { ColorGray600, BorderRadius150 } from '@pop-ui/foundation';
```

`import Button from '@pop-ui/core'` (default) — **동작 안 함.** 항상 `{ }` named import.

## 컴포넌트 카탈로그 (`@pop-ui/core`)

Button, CalendarDatePicker, Checkbox, DatePicker, Dropdown, ImageInput, LottieInput, Map, MapInfo, Modal, Pagination, Radio, SearchBar, SegmentButton, Tab, TextField, TimePicker, Toast(`toast()` 함수), Toggle, Tooltip.

- 대부분 Mantine 컴포넌트 래퍼(예: SegmentButton = Mantine `SegmentedControl`, Dropdown = `Select`, Toggle = `Switch`).
- 일부는 부분/완전 자체 구현(Pagination, Map, MapInfo, Toast).
- **Toast는 컴포넌트가 아니라 함수**: `import { toast } from '@pop-ui/core'; toast(...)`.

## API 컨벤션

### export

- 컴포넌트는 **named export만**. `export const X`. `export default`는 쓰지 않는다.
- 예외: `*.stories.tsx`의 `export default meta`는 Storybook 규약이라 유지(컴포넌트 export 규칙과 무관).

### 타입 이름

- **interface는 `I` 접두사**: `IButtonProps`, `IModalProps`, `IImageInputProps`.
- **type/union은 `T` 접두사**: `TButtonSize`, `TDayOfWeek`, `TImageInputAccept`.
- Props 타입은 `IXxxProps` 형태로 전 컴포넌트 일관. 접두사 벗긴 이름(`ButtonProps`)은 쓰지 않는다.
- 타입 정의 파일명은 **`types.ts`**(복수). `type.ts` 아님.

### size

- `size`는 **타이포/패딩 스케일**을 뜻하며 `'sm' | 'md' | 'lg'` 3단계가 원칙(Button, Checkbox, DatePicker, Dropdown, Radio, SearchBar, TextField, SegmentButton, TimePicker, Toggle).
- **예외 — Modal**: `size`가 스케일이 아니라 **모달 폭(px) 프리셋**을 뜻한다. `xs=360, sm=544, md=768, lg=1000, xl=1200`(px). 이름은 같지만 의미가 폭이라 5단계를 유지한다. `width` prop으로 임의 px도 지정 가능. → Modal에서 `xs`/`xl`이 되는 건 버그가 아니라 의도된 설계.

### boolean prop

- **자체 정의 boolean은 `is*` 접두사**: `isLoading`, `isActive`.
- **Mantine 상속 boolean은 무접두사 그대로**: `disabled`, `required`, `readOnly`.
- 한 컴포넌트 안에 `isLoading`과 `disabled`가 공존하는 건 정상 — 상속 계약을 깨지 않기 위함.

### onChange

- Mantine 상속이라 컴포넌트마다 페이로드가 다르다. 통일돼 있지 않으니 각 컴포넌트의 `types.ts`를 확인:
  - 값 전달: SearchBar `(value: string)`, DatePicker `(value)`.
  - 이벤트 전달: TextField `(event)`, Toggle `(event)`.
  - 값+메타 전달: ImageInput/LottieInput `(nextValue, meta)`.
  - Pagination은 `onPageChange(page: number)`.
- **신규 자체 컴포넌트를 만들 땐 "값 전달"(`onChange(value)`) 규약을 기본으로 권장.**

### radius / 토큰

- 숫자 radius는 매직넘버 대신 `@pop-ui/foundation`의 `BorderRadiusXXX` 상수를 쓴다: `BorderRadius0=0, 50=2, 100=4, 150=6, 200=8, 300=12, 400=16, 500=20, 1000=9999`(px 숫자).
- 색상도 하드코딩 대신 `ColorGray600` 같은 foundation 상수.
- 토큰은 `packages/foundation/token.json`이 원본, `config.js`(style-dictionary)가 SCSS 변수와 JS 상수를 생성. **생성 파일(`src/tokens/*.ts`)은 직접 편집 금지**, `yarn token-build`로 재생성.

## 신규 컴포넌트 체크리스트

1. **Mantine에 있으면 래핑**(자체 구현 지양). compound 패턴은 사내 전용 맥락에선 지양 — 필요하면 Mantine이 제공하는 compound API를 노출.
2. named export만. `export const X`.
3. Props는 `IXxxProps`(interface), union은 `TXxx`. 타입은 `types.ts`에.
4. `size` 노출 시 `sm|md|lg` 3단계. 폭 같은 다른 의미면 그 사실을 주석/문서에 명시.
5. 자체 boolean은 `is*`, 상속 boolean은 그대로.
6. 숫자 radius/색상은 foundation 토큰 상수 사용.

## 검증

- 타입: `yarn typecheck` (4패키지)
- 빌드: `yarn build` (foundation → 전체), `yarn build:core`, `yarn build:foundation`
- Storybook: `yarn build-storybook`
- 배포는 README의 `release/*` → Chromatic → `main` → `vX.Y.Z` 태그 절차.
