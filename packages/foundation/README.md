# @pop-ui/foundation

Pop UI의 디자인 토큰, 아이콘, 이미지 등 기본 요소를 제공하는 패키지입니다.

## 설치

```bash
npm install @pop-ui/foundation
# or
yarn add @pop-ui/foundation
```

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
  BgColorButtonBgPrimaryDefault
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

- `size?: number` - 아이콘 크기 (기본값: 원본 크기)
- `color?: string` - 아이콘 색상 (기본값: ColorGray900 = #333333)
- `className?: string` - CSS 클래스
- `style?: CSSProperties` - 인라인 스타일
- 기타 표준 SVG 속성들

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

## 타입 정의

### IconProps

```typescript
import type { IconProps } from '@pop-ui/foundation';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
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
