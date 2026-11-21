# @pop-ui/core

Pop UI의 공용 React 컴포넌트 패키지입니다.

## 요구 사항

- React `18.x` 또는 `19.x`
- `react-dom` `18.x` 또는 `19.x`
- Mantine `8.3.x`: `@mantine/core`, `@mantine/dates`, `@mantine/dropzone`, `@mantine/hooks`, `@mantine/notifications`

패키지는 `@pop-ui/core/styles.css`를 export 하므로, 앱 엔트리에서 한 번만 로드해야 합니다.

## 설치

```bash
yarn add @pop-ui/core @mantine/core @mantine/dates @mantine/dropzone @mantine/hooks @mantine/notifications react react-dom
```

## 사용 방법

앱 엔트리에서 `@pop-ui/core/styles.css`를 한 번만 import한 뒤, `PopUiProvider`로 앱을 감싸세요.

```tsx
import '@pop-ui/core/styles.css';

import { Button, Checkbox, PopUiProvider, Radio, TextField, toast } from '@pop-ui/core';

export function App() {
  return (
    <PopUiProvider>
      <main>
        <Button variant="primary">Button</Button>
        <TextField label="Name" value="" onChange={() => {}} />
        <Checkbox label="Agree" checked={false} onChange={() => {}} />
        <Radio label="Option" checked={false} onChange={() => {}} />
        <button onClick={() => toast({ message: 'Saved' })}>Toast</button>
      </main>
    </PopUiProvider>
  );
}
```

`PopUiProvider` sets up Mantine provider, CSS variable injection, and Notifications. `toast` depends on the `Notifications` mounted by this provider.

### 입력의 설명과 오류

`TextField`, `Dropdown`, `SearchBar`, `DatePicker`는 같은 `size`(`sm`, `md`, `lg`), `required`, `description`, `error`를 지원합니다. 설명과 오류를 함께 지정하면 입력 아래에 설명, 오류 순서로 표시됩니다. 표시한 문구는 해당 입력의 접근성 설명에 연결됩니다.

```tsx
<TextField label="이름" required description="예약자 이름을 입력해주세요." error={errors.name} />
```

`ImageInput`과 `LottieInput`도 `error`로 문자열 또는 JSX 오류 문구를 표시합니다.

기존 `TextField`, `Dropdown`, `SearchBar`, `ImageInput`, `LottieInput`의 `errorMsg`는 `error`로 이전할 수 있습니다. `error`가 `undefined`이면 `errorMsg`를 사용하며, `false`나 `null`을 명시하면 오류를 해제합니다.

### 공용 서체

`@pop-ui/core/styles.css`를 가져오면 CSS와 Penpot에서 동일한 이름으로 공용 서체를 선택할 수 있습니다.
표준 이름으로 번들 글꼴을 등록하려면 `import '@pop-ui/core/fonts.css'`를 추가합니다. 자체 글꼴을 등록한 앱은 기본 스타일만 사용하면 됩니다.

`Noto Sans KR`은 400·500·600·700, `Montserrat`는 500·600·700 굵기를 제공합니다.

### Next.js App Router notes

- 앱 엔트리에서 `@pop-ui/core/styles.css`를 직접 import 해야 합니다.
- 상호작용 컴포넌트는 client boundary 안에서 사용하는 것을 권장합니다.
- 서버 컴포넌트에서 직접 폼 submit 버튼으로 쓸 경우에는 얇은 client wrapper를 두는 방식이 가장 안전합니다.

## Stabilized surfaces

This phase stabilizes the following surfaces:

- `Button`
- `TextField`
- `Checkbox`
- `Radio`
- `toast`

### Button

`Button`은 현재 `variant`, `size`, `isLoading` 같은 기존 사용 패턴을 유지합니다. `danger`는 호환성용 공개 변형으로 남아 있고, 현재는 warning 토큰 계열과 같은 스타일을 사용합니다.

### TextField

`TextField`는 controlled `value`를 표시 상태와 clear affordance, counter sync의 기준으로 사용합니다. `maxTextCount`가 있으면 오버런 입력은 잘라내지 않고 차단합니다.

### Checkbox

`Checkbox`는 JSX label과 DOM-style `onChange` 이벤트를 유지합니다. `e.target.checked` 기반 사용이 기준입니다.

### Radio

`Radio`는 개별 controlled item으로 사용합니다. `e.target.value` 기반 이벤트 처리가 기준입니다.

### toast

`toast`는 함수형 API를 유지합니다. `toast(input)`, `toast.update(id, input)`, `toast.hide(id)`, `toast.clean()`가 현재 안정화된 호출 형태입니다.

### Date picker surfaces

`DatePicker`와 `CalendarDatePicker`는 이번 단계에서 시각 계약만 맞췄습니다. `DatePicker`는 입력과 팝업 중심 surface로 남아 있고, `CalendarDatePicker`는 inline calendar surface와 exclusion 기능을 유지합니다.

이 단계에서는 behavior parity를 구현하지 않습니다. `Date`와 `Dayjs` 값 모델, confirm/cancel 흐름은 다음 결정으로 남겨 둡니다.

## What this package does not document here

이 README는 아직 안정화되지 않은 다른 export 전체를 자세히 설명하지 않습니다. `CalendarDatePicker`, `DatePicker`, `Dropdown`, `ImageUploader`, `Modal`, `Pagination`, `SearchBar`, `SegmentButton`, `Tab`, `TimePicker`, `Toggle`, `Tooltip`, and map-related exports are outside the scope of this stabilization note.

### 파일 업로더의 로딩

`ImageInput`과 `LottieInput`에서 `isLoading`은 전체의 추가·삭제·순서 변경·이미지 편집을 잠급니다. `value` 안의 `item.isLoading`은 해당 파일만 잠그며, 다른 파일은 계속 추가·삭제·재정렬할 수 있습니다. 순서를 변경할 때 처리 중인 파일은 제자리에 남습니다. Lottie 미리보기를 읽는 동안에는 해당 파일도 삭제하거나 이동할 수 있습니다. `error`에 표시할 문구를 전달하면 키보드로 파일 추가 영역에 접근할 때도 같은 설명을 읽을 수 있습니다.

같은 `LottieInput`에서 편집 대상을 바꾸는 화면은 `uploadScope={record.id}`를 지정하면 이전 대상에서 읽기 시작한 파일을 폐기합니다. 같은 대상은 콜백이 바뀌어도 읽기를 마칩니다. 키를 생략하면 `onChange` 콜백의 변경을 대상 전환으로 취급합니다.
