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
- **prop 타입은 반드시 `types.ts`에 정의**한다. `index.tsx` 인라인 정의 금지 — 전 컴포넌트가 `types.ts`를 갖는다(단일 진실원천).
- **prop 타입은 barrel(`components/index.ts`)에서 export**한다: `export { Xxx }` 바로 아래에 `export type { IXxxProps } from './Xxx/types';`. 런타임 const(예: `BUTTON_SIZES`)는 `export type`가 아닌 값 export로 분리한다.
- **union인 prop 타입은 `TXxxProps`(T 접두사)로 둔다.** interface로 표현할 수 없어서다(예: TextField의 `TTextFieldProps`). 레포 eslint(`@typescript-eslint/naming-convention`)가 type alias에 `T`를 강제하므로 `IXxxProps` 별칭을 만들지 않는다.

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
- **SCSS에서 px 직접값 대신 함수를 쓴다**: `fn.spacing($step)`(패딩/마진/gap/폭/높이), `fn.font-size($step)`(글꼴 크기), `fn.border-width($step)`(선/아웃라인 두께). `@use "../shared/functions" as fn;` 후 `padding: fn.spacing(400)`(=16px). 스텝→값은 산술이 아니라 lookup(예: `border-width(37)`=1.5px, `font-size(450)`=14px) — 함수가 잘못된 스텝에 `@error`를 낸다. 스케일에 없는 값(예: `13px`, `30px`)은 px 그대로 둔다.
- 토큰은 `packages/foundation/token.json`이 원본, `config.js`(style-dictionary)가 SCSS 변수·map과 JS 상수를 생성. **생성 파일(`src/tokens/*.ts`, `shared/_*-map.scss`)은 직접 편집 금지**, `yarn token-build`로 재생성. `shared/_functions.scss`는 그 map을 px로 변환하는 수동 파일.

## 신규 컴포넌트 체크리스트

1. **Mantine에 있으면 래핑**(자체 구현 지양). compound 패턴은 사내 전용 맥락에선 지양 — 필요하면 Mantine이 제공하는 compound API를 노출.
2. named export만. `export const X`.
3. Props는 `IXxxProps`(interface), union은 `TXxx`. 타입은 **반드시 `types.ts`에** 정의하고 **barrel에서 export**(`export type { IXxxProps } from './Xxx/types'`).
4. `size` 노출 시 `sm|md|lg` 3단계. 폭 같은 다른 의미면 그 사실을 주석/문서에 명시.
5. 자체 boolean은 `is*`, 상속 boolean은 그대로.
6. 숫자 radius/색상은 foundation 토큰 상수 사용. SCSS의 px는 `fn.spacing()`/`fn.font-size()`/`fn.border-width()` 함수(스케일에 없는 값만 raw px).

## 검증

- 타입: `yarn typecheck` (4패키지). **CI(Jenkins)가 모든 빌드 흐름에서 `yarn build` 전에 이를 강제** — 타입이 깨지면 빌드·배포가 차단된다.
- 빌드: `yarn build` (foundation → 전체), `yarn build:core`, `yarn build:foundation`
- Storybook: `yarn build-storybook`
- 배포는 README의 `release/*` → Chromatic → `main` → `vX.Y.Z` 태그 절차.
