# CalendarDatePicker

Mantine DatePicker 기반의 인라인 캘린더 컴포넌트로, 날짜 선택 시 특정 날짜나 요일을 제외할 수 있는 기능을 제공합니다.

## 📦 Features

- ✅ **날짜 제외**: 특정 날짜 또는 날짜 범위를 비활성화
- ✅ **요일 제외**: 주말이나 특정 요일을 비활성화
- ✅ **유연한 API**: 단일 날짜와 범위를 하나의 배열에서 혼합 사용 가능
- ✅ **외부 날짜 제어**: 현재 달에 포함되지 않는 날짜(이전/다음 달)의 선택 방지

## 🚀 Usage

### 기본 사용법

```tsx
import { CalendarDatePicker } from '@pop-ui/core';

function App() {
  return <CalendarDatePicker type="default" />;
}
```

### 특정 날짜 제외

```tsx
<CalendarDatePicker
  excludedDates={[
    '2025-11-24', // 단일 날짜
    '2025-12-25', // 크리스마스
    ['2025-12-24', '2025-12-26'], // 크리스마스 연휴 (범위)
  ]}
/>
```

### 요일 제외 (주말)

```tsx
<CalendarDatePicker
  excludedDays={[0, 6]} // 0=일요일, 6=토요일
/>
```

### 복합 사용

```tsx
<CalendarDatePicker
  excludedDays={[0, 6]} // 주말 제외
  excludedDates={[
    '2025-11-28', // 추수감사절
    '2025-12-25', // 크리스마스
    ['2025-12-28', '2026-01-03'], // 연말연시 휴가
  ]}
/>
```

## 📋 Props

| Prop             | Type                                 | Default     | Description                                                   |
| ---------------- | ------------------------------------ | ----------- | ------------------------------------------------------------- |
| `type`           | `'default' \| 'multiple' \| 'range'` | `'default'` | 캘린더 선택 모드                                              |
| `excludedDates`  | `(string \| [string, string])[]`     | `[]`        | 제외할 날짜 또는 날짜 범위 배열                               |
| `excludedDays`   | `number[]`                           | `[]`        | 제외할 요일 배열 (0: 일요일 ~ 6: 토요일)                      |
| `highlightToday` | `boolean`                            | `false`     | 오늘 날짜 강조 및 날짜 하단에 '오늘' 텍스트 표시 여부         |
| `onChange`       | `(value: DateValue) => void`         | -           | 날짜 선택 시 호출되는 콜백                                    |
| `...props`       | `DatePickerProps`                    | -           | Mantine DatePicker의 나머지 Props (커스텀한 excludeDate 제외) |

## 🔍 Detailed Props

### `excludedDates`

특정 날짜 또는 날짜 범위를 제외합니다.

- **타입**: `(string | [string, string])[]`
- **기본값**: `[]`
- **형식**:
  - 단일 날짜: `'YYYY-MM-DD'` 형식의 문자열
  - 날짜 범위: `[시작일, 종료일]` 형식의 튜플

**예시:**

```tsx
excludedDates={[
  '2025-11-24',                    // 단일 날짜
  '2025-11-25',                    // 단일 날짜
  ['2025-12-24', '2025-12-26'],    // 범위 (3일간)
  ['2025-12-28', '2026-01-03'],    // 범위 (7일간)
]}
```

### `excludedDays`

특정 요일을 제외합니다.

- **타입**: `number[]`
- **기본값**: `[]`
- **값**: `0` (일요일) ~ `6` (토요일)

**예시:**

```tsx
excludedDays={[0, 6]}        // 주말 제외
excludedDays={[1, 3, 5]}     // 월, 수, 금 제외
```

### `type`

DatePicker 타입을 지정합니다.

- **타입**: `'default' | 'multiple' | 'range'`
- **기본값**: `'default'`

### `onChange`

날짜 선택 시 호출되는 콜백 함수입니다.

- **타입**: `(value: DateValue) => void`
- **설명**: `DateValue`는 `type` prop에 따라 다른 타입을 가집니다:
  - `type="default"`: `Date | null`
  - `type="range"`: `[Date | null, Date | null]`
  - `type="multiple"`: `Date[]`

**예시:**

```tsx
<CalendarDatePicker
  type="default"
  onChange={(value) => console.log(value)} // value: Date | null
/>

<CalendarDatePicker
  type="range"
  onChange={(value) => console.log(value)} // value: [Date | null, Date | null]
/>
```

### `highlightToday`

오늘 날짜에 "오늘" 텍스트를 표시하고 강조합니다.

- **타입**: `boolean`
- **기본값**: `false`
- **설명**: Mantine의 `highlightToday` prop과 동일합니다. `true`로 설정하면 오늘 날짜가 강조되고 하단에 "오늘" 텍스트가 표시됩니다.

**예시:**

```tsx
<CalendarDatePicker highlightToday />
```

### 기타 Props

Mantine의 `DatePicker` 컴포넌트의 나머지 props를 지원합니다.

> **주의**:
>
> - `excludeDate` prop은 지원하지 않습니다. 날짜 제외 기능을 사용하려면 `excludedDates` 또는 `excludedDays` prop을 사용하세요.
> - `type`, `locale`, `firstDayOfWeek` 등의 props는 `...props`로 전달하면 덮어쓸 수 있습니다. 컴포넌트의 기본 동작을 변경하려면 명시적으로 prop을 전달하세요.

**예시:**

```tsx
// type prop을 덮어쓰기
<CalendarDatePicker
  type="default"  // 기본값
  {...{ type: 'range' }}  // range로 덮어써짐
/>

// locale prop을 덮어쓰기
<CalendarDatePicker
  locale="ko"  // 기본값
  {...{ locale: 'en' }}  // en으로 덮어써짐
/>
```

자세한 내용은 [Mantine DatePicker 문서](https://mantine.dev/dates/date-picker/)를 참고하세요.

## 🎨 Styling

컴포넌트는 `styles.module.scss`를 통해 스타일링됩니다.

### classNames prop 사용법

`classNames` prop을 사용하여 Mantine DatePicker의 모든 스타일 키를 커스터마이징할 수 있습니다. 기본 클래스와 커스텀 클래스가 자동으로 병합되며, 커스텀 클래스가 우선순위를 가집니다.

**특징:**

- `DatePickerStylesNames`(Mantine DatePicker Styles API의 selectors)에 속하는 키만 허용됩니다 (타입 안전성 보장)
- 기본 클래스와 커스텀 클래스가 공백으로 연결되어 병합됩니다
- `DEFAULT_CLASS_NAMES`에 없는 키도 `DatePickerStylesNames`에 속하면 확장 가능합니다
- 객체형과 함수형 모두 지원합니다

**객체형 예시:**

```tsx
<CalendarDatePicker
  classNames={{
    day: 'my-custom-day',
    calendarHeaderLevel: 'my-custom-header-level',
    // DatePickerStylesNames에 속하는 모든 키 사용 가능
  }}
/>
```

**함수형 예시:**

```tsx
<CalendarDatePicker
  classNames={(theme, props, ctx) => ({
    day: theme.colorScheme === 'dark' ? 'dark-day' : 'light-day',
    calendarHeader: 'custom-header',
  })}
/>
```

함수형 `classNames`를 사용하면 테마나 props에 따라 동적으로 스타일을 적용할 수 있습니다. 함수형 `classNames`도 기본 `DEFAULT_CLASS_NAMES`와 자동으로 병합됩니다.

### 스타일 오버라이딩 가이드

라이브러리 기본 스타일은 CSS `:where()`를 사용하여 **중요도(Specificity)가 0**으로 설정되어 있습니다. 따라서 `!important`나 복잡한 선택자 없이도 커스텀 클래스만으로 쉽게 스타일을 덮어쓸 수 있습니다. 또한, `[data-outside]` 속성이 있는 날짜(현재 월이 아닌 날짜)는 `pointer-events: none`으로 설정되어 클릭이 불가능합니다.

#### 1. 모든 상태 덮어쓰기 (Simple Override)

상태(in-range, selected 등)에 관계없이 스타일을 적용하고 싶다면 평범한 클래스를 사용하세요.

```css
.myCustomDay {
  /* in-range, weekend 등 모든 상태를 덮어씁니다 */
  background-color: pink;
  border-radius: 4px;
}
```

#### 2. 특정 상태만 덮어쓰기 (Conditional Override)

특정 상태일 때만 스타일을 변경하고 싶다면 `data` 속성을 사용하세요. (Mantine UI의 data 속성 참조)

```css
.myCustomDay {
  /* 기본 스타일 */
  background-color: white;

  /* 범위 내 날짜일 때만 적용 */
  &[data-in-range] {
    background-color: lightblue;
  }

  /* 선택된 날짜일 때만 적용 */
  &[data-selected] {
    background-color: blue;
    color: white;
  }
}
```

### 지원하는 데이터 속성 (Data Attributes)

- `[data-selected]`: 선택된 날짜
- `[data-disabled]`: 비활성화된 날짜
- `[data-in-range]`: 범위 선택 시 범위 내 날짜
- `[data-weekend]`: 주말
- `[data-outside]`: 현재 월 외부의 날짜
- `[data-today]`: 오늘 날짜 (하이라이트 스타일링을 위해서는 `[data-today][data-highlight-today]` 방식으로 속성을 선택해야 함)
- 이외에도 Mantine DatePicker의 data attributes를 지원합니다.

## 💡 Tips

### 1. 날짜 형식 일관성 유지

`YYYY-MM-DD` 형식 사용을 권장합니다. 다른 형식도 dayjs가 파싱하지만, 일관성과 명확성을 위해 표준 형식을 사용하세요:

```tsx
// ✅ Good - 권장
excludedDates={['2025-11-24']}
excludedDates={['2025-11-24T00:00:00']}

// ⚠️ 작동하지만 권장하지 않음
excludedDates={['11/24/2025']}        // 로케일에 따라 해석이 다를 수 있음
```

### 2. 범위 사용 시 주의사항

범위는 시작일과 종료일을 **포함**합니다:

```tsx
// 12/24, 12/25, 12/26 모두 제외됨
excludedDates={[['2025-12-24', '2025-12-26']]}
```

### 3. 성능 최적화

많은 날짜를 제외해야 한다면 범위를 사용하는 것이 효율적입니다:

```tsx
// ✅ Good - 범위 사용
excludedDates={[['2025-12-01', '2025-12-31']]}

// ❌ Bad - 개별 날짜 나열
excludedDates={[
  '2025-12-01', '2025-12-02', '2025-12-03', /* ... */ '2025-12-31'
]}
```

### 4. 요일과 날짜 조합

`excludedDays`와 `excludedDates`를 함께 사용하면 더 세밀한 제어가 가능합니다:

```tsx
<CalendarDatePicker
  excludedDays={[0, 6]} // 기본적으로 주말 제외
  excludedDates={['2025-11-27']}
/>
```

## 🧪 Storybook

Storybook에서 다양한 사용 예시를 확인할 수 있습니다.

### 스토리 목록

- **DefaultDatePicker**: 기본 캘린더
- **WithExcludedDays**: 요일 제외 (라디오 버튼으로 선택)
- **WithExcludedDates**: 날짜/범위 제외
- **WithCustomStyles**: 스타일 커스터마이징 및 오버라이딩 테스트

## 🏗️ Architecture

### 파일 구조

```
CalendarDatePicker/
├── index.tsx                      # 메인 컴포넌트
├── types.ts                       # TypeScript 타입 정의
├── utils.ts                       # 유틸리티 함수
│   ├── createExcludedDateChecker  # 날짜 제외 로직
│   ├── hasExcludedDateInRange     # 범위 내 제외 날짜 확인
│   ├── getEmptyValueForType       # 타입별 빈 값 반환
│   ├── normalizeValueForType      # 타입별 값 정규화
│   └── resolveDatePickerValue     # 날짜 값 해석
├── styles.module.scss             # 스타일
├── CalendarDatePicker.stories.tsx # Storybook 스토리
└── README.md                      # 문서 (이 파일)
```

### 핵심 로직: `createExcludedDateChecker`

날짜 제외 로직은 `utils.ts`의 `createExcludedDateChecker` 함수에서 처리됩니다.

**동작 방식:**

1. **입력 처리**: `excludedDates` 배열을 단일 날짜와 범위로 분리
2. **유효성 검증**: `.isValid()`로 유효하지 않은 날짜 필터링
3. **정규화**: 날짜를 `YYYY-MM-DD` 형식으로 정규화하고 dayjs 객체로 파싱
4. **검사**: 주어진 날짜가 다음 조건에 해당하는지 확인
   - 제외된 요일인가?
   - 제외된 단일 날짜인가?
   - 제외된 범위 내에 있는가?

**예시:**

```typescript
const isExcluded = createExcludedDateChecker({
  excludedDays: [0, 6], // 주말
  excludedDates: ['2025-12-25', ['2025-12-24', '2025-12-26']],
});

isExcluded(new Date('2025-12-25')); // true (단일 날짜)
isExcluded(new Date('2025-12-24')); // true (범위 내)
isExcluded(new Date('2025-12-27')); // false
```

### 성능 최적화: `hasExcludedDateInRange`

범위 선택(`type="range"`) 시, 선택된 범위 내에 제외된 날짜가 있는지 확인하는 함수입니다.

**범위 겹침 알고리즘 사용:**

두 범위가 겹치지 않는 경우는:

- 범위 A가 범위 B보다 완전히 앞: `end < exStart`
- 범위 A가 범위 B보다 완전히 뒤: `start > exEnd`

따라서 겹치는 경우: `!(end < exStart || start > exEnd)`

```typescript
// O(m) 복잡도 - m은 제외 범위 개수
for (const [exStart, exEnd] of excludedRanges) {
  if (!(endDay.isBefore(exStart) || startDay.isAfter(exEnd))) {
    return true; // 범위 겹침 발견!
  }
}
```

**성능 비교:**

- **이전**: O(n) - 범위 내 모든 날짜 순회 (1년 = 365회)
- **최적화**: O(m) - 제외 범위 개수만큼만 체크 (예: 3회)
- **결과**: 큰 범위 선택 시 ~100배 빠른 성능 🚀

**검사 순서:**

1. 제외된 범위와의 겹침 검사 (범위 겹침 알고리즘)
2. 단일 제외 날짜가 범위 내에 있는지 확인
3. 제외된 요일이 범위 내에 있는지 순회 검사

## 📚 Related

- [Mantine DatePicker](https://mantine.dev/dates/date-picker/)
- [dayjs](https://day.js.org/)
