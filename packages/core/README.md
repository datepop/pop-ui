# @pop-ui/core

Pop UI의 공용 React 컴포넌트 패키지입니다.

## 요구 사항

- React `19.2.x`
- `react-dom` `19.2.x`

패키지는 `@pop-ui/core/styles.css`를 export 하므로, 앱 엔트리에서 한 번만 로드해야 합니다.

## 설치

```bash
yarn add @pop-ui/core react react-dom
```

## 사용 방법

`PopUiProvider`로 앱을 감싸고, 전역 스타일을 함께 불러오세요.

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
