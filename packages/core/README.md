# @pop-ui/core

사내 디자인 시스템을 위한 React UI 컴포넌트 라이브러리입니다.

## 설치

### 기본 설치

모든 컴포넌트를 사용하기 위한 필수 패키지를 설치합니다.

```bash
yarn add @pop-ui/core react react-dom @mantine/core @mantine/hooks
```

### 컴포넌트별 추가 패키지

일부 컴포넌트는 추가 패키지가 필요합니다. 사용하는 컴포넌트에 따라 필요한 패키지를 설치하세요.

#### Button, TextField, SearchBar, Dropdown, Checkbox, Radio, Toggle

추가 패키지 불필요 (기본 설치만으로 사용 가능)

#### DatePicker, TimePicker

```bash
yarn add @mantine/dates dayjs
```

#### ImageUploader

```bash
yarn add @mantine/dropzone
```

#### Table

```bash
yarn add react-beautiful-dnd @tabler/icons-react
```

#### Pagination

```bash
yarn add @tabler/icons-react
```

#### Modal

```bash
yarn add @mantine/modals
```

#### Alert, Tooltip

```bash
yarn add @mantine/notifications
```

#### 에디터 컴포넌트

```bash
yarn add @mantine/tiptap @tiptap/react @tiptap/starter-kit @tiptap/extension-link
```

## 사용 방법

### React (Vite)

```tsx
import { Button, TextField } from '@pop-ui/core';

function App() {
  return (
    <div>
      <Button styleType="primary" size="md">
        클릭하세요
      </Button>
      <TextField placeholder="텍스트를 입력하세요" />
    </div>
  );
}
```

### Next.js

Next.js에서 사용하려면 Mantine Provider 설정이 필요합니다.

#### App Router (Next.js 13+)

1. Providers 컴포넌트 생성:

```tsx
// app/providers.tsx
'use client'

import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

export function Providers({ children }: { children: React.ReactNode }) {
  return <MantineProvider>{children}</MantineProvider>
}
```

2. Layout에서 사용:

```tsx
// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

3. 컴포넌트 사용:

```tsx
// app/page.tsx
'use client'

import { Button } from '@pop-ui/core'

export default function Page() {
  return <Button onClick={() => alert('클릭!')}>클릭하세요</Button>
}
```

#### Pages Router (Next.js 12 이하)

```tsx
// pages/_app.tsx
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Component {...pageProps} />
    </MantineProvider>
  )
}
```

## 제공 컴포넌트

- **Button** - 다양한 스타일의 버튼
- **TextField** - 텍스트 입력 필드
- **SearchBar** - 검색 입력 필드
- **Dropdown** - 드롭다운 선택
- **Checkbox** - 체크박스
- **Radio** - 라디오 버튼
- **Toggle** - 토글 스위치
- **DatePicker** - 날짜 선택
- **TimePicker** - 시간 선택
- **Pagination** - 페이지네이션
- **Tab** - 탭 메뉴
- **SegmentButton** - 세그먼트 버튼
- **Alert** - 알림 메시지
- **Tooltip** - 툴팁
- **Table** - 데이터 테이블
- **Modal** - 모달 다이얼로그
- **ImageUploader** - 이미지 업로드

## 기술 스택

- React 18
- TypeScript
- Mantine UI 6.x
- SCSS Modules

## 라이센스

MIT
