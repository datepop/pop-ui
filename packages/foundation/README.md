# @pop-ui/foundation

Pop UI의 디자인 토큰, 아이콘, 일러스트레이션 등 기본 요소를 제공하는 패키지입니다.
React(웹)와 React Native를 모두 지원합니다.

## 설치

### React (웹)

```bash
npm install @pop-ui/foundation
# or
yarn add @pop-ui/foundation
```

### React Native

react-native-svg가 필요합니다 (>=13.0.0):

```bash
npm install @pop-ui/foundation react-native-svg
# or
yarn add @pop-ui/foundation react-native-svg
```

> iOS: `cd ios && pod install`

## React Native 지원

`package.json`의 `exports` 조건부로 번들러가 자동으로 RN 빌드를 선택합니다.
**import 코드를 바꿀 필요 없습니다** — 웹과 동일한 import 경로를 사용하세요.

```tsx
// 웹과 완전히 동일한 코드로 React Native에서도 동작
import { IconBookmark, IllustrationPopcorn } from '@pop-ui/foundation';

<IconBookmark size={24} color="#333" />
<IllustrationPopcorn size={48} />
```

### 웹과의 차이점

| 항목 | 웹 (React) | React Native |
|------|-----------|--------------|
| 렌더링 | HTML `<svg>` | `react-native-svg` 컴포넌트 |
| Props 타입 | `SVGProps<SVGSVGElement>` | `SvgProps` (react-native-svg) |
| `className` | ✅ 지원 | ❌ 미지원 |
| `style` | CSS 객체 | RN StyleSheet 객체 |
| 색상·크기 | 동일 (`size`, `color`) | 동일 (`size`, `color`) |

### 사전 요구사항

- `react-native-svg` >= 13.0.0
- Metro bundler >= 0.72 (React Native >= 0.71) — `exports` 조건부 지원 버전

## 구성 요소

### 1. Design Tokens

디자인 시스템의 색상, 타이포그래피 등의 토큰을 제공합니다.

```tsx
import { ColorGray900, ColorAqua500, ColorRed500 } from '@pop-ui/foundation';

const MyComponent = () => {
  return <div style={{ color: ColorGray900 }}>Hello</div>;
};
```

#### 사용 가능한 색상 팔레트

- **Gray**: Gray0 ~ Gray1000 (11단계)
- **Aqua**: Aqua50 ~ Aqua900 (9단계)
- **Red**: Red50 ~ Red900 (9단계)
- **Orange**: Orange50 ~ Orange900 (9단계)
- **Yellow**: Yellow50 ~ Yellow900 (9단계)
- **Green**: Green50 ~ Green900 (9단계)
- **Blue**: Blue50 ~ Blue900 (9단계)
- **Purple**: Purple50 ~ Purple900 (9단계)
- **Grape**: Grape50 ~ Grape900 (9단계)

#### 시맨틱 색상

```tsx
import {
  SemanticColorPrimary,
  SemanticColorWarning,
  BgColorButtonBgPrimaryDefault,
} from '@pop-ui/foundation';
```

### 2. 아이콘

React 컴포넌트로 제공되는 아이콘들입니다.

```tsx
import { IcChevronDown, IcChevronUp } from '@pop-ui/foundation';

function MyComponent() {
  return (
    <div>
      <IcChevronDown size={24} color="#1971C2" />
      <IcChevronUp size={20} />
    </div>
  );
}
```

#### 아이콘 Props

모든 아이콘은 다음 props를 지원합니다:

- `size?: number` - 아이콘 크기 (기본값: 24)
- `color?: string` - 아이콘 색상 (기본값: ColorGray900)
- `variant?: 'line' | 'filled'` - 스타일 변형 (일부 아이콘만 `filled` 지원)
- `className?: string` - CSS 클래스 **(웹 전용)**
- `style?: CSSProperties` - 인라인 스타일 **(웹: CSS 객체 / RN: StyleSheet 객체)**
- 기타 표준 SVG 속성 (웹) / SvgProps 속성 (RN)

#### 현재 제공되는 아이콘

- `IcChevronDown` - 아래 화살표 (24x24)
- `IcChevronUp` - 위 화살표 (24x24)
- `IcChevronLeft` - 왼쪽 화살표 (8x14)
- `IcChevronRight` - 오른쪽 화살표 (8x14)

*더 많은 아이콘이 추가될 예정입니다.*

#### 아이콘 사용 예시

```tsx
import { IcChevronDown, ColorGray900 } from '@pop-ui/foundation';

// 기본 사용 (기본 색상: ColorGray900)
<IcChevronDown />

// 크기 조정
<IcChevronDown size={32} />

// 색상 변경
<IcChevronDown color="#1971C2" />

// variant (line | filled, 일부 아이콘만 filled 지원)
<IcChevronDown variant="line" />
<IcChevronDown variant="filled" />

// CSS 클래스 사용
<IcChevronDown className="my-icon" />

// 스타일 조합
<IcChevronDown
  size={20}
  color="#FF0000"
  style={{ cursor: 'pointer' }}
  onClick={() => console.log('clicked')}
/>
```

### 3. Theme Utilities

런타임에서 색상을 조회하거나 CSS Variables를 생성하는 유틸리티를 제공합니다.

```tsx
import {
  colors,
  getColorValue,
  getCSSVariableRef,
  colorNames
} from '@pop-ui/foundation';

// 색상 팔레트 객체
console.log(colors.gray[900]); // "#333333"
console.log(colors.aqua[500]); // "#0fd3d8"

// 헬퍼 함수
const grayValue = getColorValue('gray', '900'); // "#333333"
const cssVar = getCSSVariableRef('gray', '900'); // "var(--color-gray-900)"

// 사용 가능한 모든 색상 이름
console.log(colorNames); // ['gray', 'aqua', 'red', ...]
```

### 4. Illustrations 아이콘

2색 이상의 다중 색상을 포함하는 일러스트레이션 아이콘입니다. 색상이 고정되어 있어 color prop 없이 size만 제어합니다.

일러스트레이션 vs 아이콘
구분아이콘 (Icon)일러스트레이션 (Illustration)색상단색, color prop으로 변경 가능다중 색상 고정variantline / filled 지원색상별 별도 컴포넌트

```tsx
import { IllustrationPopcorn, IllustrationDiscounttagMint } from '@pop-ui/foundation';

function MyComponent() {
  return (
    <div>
      <IllustrationPopcorn size={48} />
      <IllustrationDiscounttagMint size={32} />
    </div>
  );
}
```

### 5. 메타데이터 및 카테고리 분류

아이콘과 일러스트레이션은 공통 카테고리 분류 체계로 관리됩니다.

#### 카테고리

| 카테고리    | 설명                           
| --------- | -------------------------------- 
| `CONTENT` | 콘텐츠, 미디어, 문서, 위치, 등급 
| `ACTION`  | 동작 및 사용자 인터랙션          
| `STATUS`  | 상태 및 알림                    
| `BRAND`   | 브랜드 전용                   
| `SYSTEM`  | 시스템 및 설정                

#### 메타데이터 사용

```tsx
import { iconMetadata, IconCategory } from '@pop-ui/foundation';
import { illustrationMetadata, IllustrationCategory } from '@pop-ui/foundation';

// 아이콘 메타데이터 조회
iconMetadata.IconBookmark.categories; // [IconCategory.ACTION]
iconMetadata.IconBookmark.variants; // ['line', 'filled']

// 일러스트레이션 메타데이터 조회
illustrationMetadata.IllustrationPopcorn.categories; // [IllustrationCategory.CONTENT]
```

## 개발

### Token 생성

디자인 토큰은 `token.json`에서 자동 생성됩니다:

```bash
# 1. token.json을 transformed-token.json으로 변환
yarn token-transform

# 2. style-dictionary로 TypeScript/SCSS 생성
yarn token-build

# 3. 패키지 빌드
yarn build
```

**참고**: Token 파일을 수정한 후에는 반드시 위 과정을 거쳐 재생성해야 합니다.

### 스크립트

| 명령어 | 설명 |
|--------|------|
| `yarn build` | 웹 + React Native 전체 빌드 |
| `yarn build:native` | React Native 빌드만 실행 (tsc) |
| `yarn generate:native` | 아이콘/일러스트를 RN 컴포넌트로 변환 |
| `yarn token-transform` | token.json → transformed-token.json 변환 |
| `yarn token-build` | style-dictionary로 TypeScript/SCSS 생성 |

### 아이콘/일러스트레이션 추가 방법

1. Figma에서 SVG export
2. SVG → TSX 변환 (JSX 속성 변환, `viewBox` 유지, `width={size}` / `height={size}` 적용)
3. 해당 메타데이터 파일에 카테고리 등록
4. `src/icons/index.ts` (또는 `src/illustrations/index.ts`) 배럴 파일에 export 추가
5. `yarn build` 실행 — React Native 파일 자동 생성 포함

> **주의**: `src/icons/native/`, `src/illustrations/native/`는 빌드 시 자동 생성되는 파일입니다.
> `.gitignore`로 추적되지 않으며, 직접 수정해도 다음 빌드에 덮어씌워집니다.
> 아이콘을 수정할 때는 반드시 원본(`src/icons/*.tsx`, `src/illustrations/*.tsx`)을 수정하세요.

## 타입 정의

### IIconProps (React / 웹)

```typescript
import type { IIconProps } from '@pop-ui/foundation';

interface IIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  variant?: 'line' | 'filled';
}
```

### IIconProps (React Native)

```typescript
import type { IIconProps } from '@pop-ui/foundation';
// react-native-svg의 SvgProps를 확장

interface IIconProps extends SvgProps {
  size?: number;
  color?: string;
  variant?: 'line' | 'filled';
}
```

### IIllustrationProps (React / 웹)

```typescript
import type { IIllustrationProps } from '@pop-ui/foundation';

interface IIllustrationProps extends SVGProps<SVGSVGElement> {
  size?: number;
}
```

### IIllustrationProps (React Native)

```typescript
import type { IIllustrationProps } from '@pop-ui/foundation';

interface IIllustrationProps extends SvgProps {
  size?: number;
}
```

### ColorPalette

```typescript
import type { ColorName, ColorShade, ColorPalette } from '@pop-ui/foundation';

// ColorName: 'gray' | 'aqua' | 'red' | ...
// ColorShade: '0' | '25' | '50' | '100' | ...
// ColorPalette: { [colorName: string]: { [shade: string]: string } }
```

## 라이선스

MIT

## 관련 패키지

- [@pop-ui/core](https://www.npmjs.com/package/@pop-ui/core) - Pop UI 컴포넌트 라이브러리
