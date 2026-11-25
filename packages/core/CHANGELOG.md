# @pop-ui/core

## 3.0.0

### Patch Changes

- 1e599a3: Rename the 43 `IconHotel…` exports on web and React Native. Remove `Hotel` from the import name. For `Calendar`, `Check`, `ChevronDown`, `ChevronRight` and `Report`, also append `Compact` to keep the original artwork (for example, `IconHotelCalendar` becomes `IconCalendarCompact`). Existing imports must be updated.

  Align the clock face and hands with the 24 px Figma icon. Disable the TimePicker clock button on disabled and read-only inputs.

- Updated dependencies [1e599a3]
  - @pop-ui/foundation@3.0.0

## 2.4.0

### Minor Changes

- d64e402: TextField, Dropdown, SearchBar의 라벨 도움말을 키보드와 터치로 열 수 있습니다. Dropdown은 목록이 열리거나 닫힐 때 전달받은 콜백을 호출합니다. ImageInput과 LottieInput은 JSX를 포함한 오류 문구를 `error`로 받으며 기존 `errorMsg`도 지원합니다.
- d64e402: TextField, Dropdown, SearchBar, DatePicker에서 `description`, `error`, `required`를 같은 방식으로 사용할 수 있습니다. 설명과 오류는 해당 입력에 연결되며 SearchBar는 오류를 한 번만 표시합니다. 기존 TextField, Dropdown, SearchBar의 `errorMsg`는 계속 지원합니다. 두 속성을 함께 전달하면 `error`가 우선합니다.
- d64e402: Import `@pop-ui/core/fonts.css` to register the shared font families as `Noto Sans KR` and `Montserrat`. Existing CSS using either the `POP-UI` or `Pop UI Hotel` prefix continues to load the same files.
- d64e402: 여러 레코드에서 같은 `LottieInput`을 재사용할 때 `uploadScope={record.id}`를 지정하면 이전 레코드의 파일 읽기 결과를 폐기합니다.

### Patch Changes

- d64e402: Show a keyboard focus ring and retain focus when a Button starts loading, while blocking repeated activation.
- d64e402: Keep the Button's original width and accessible name while its default loading spinner is visible.
- d64e402: Set the medium Button label line height to 20px at its default 16px font size.
- d64e402: Use the Button keyboard focus ring on Checkboxes and Toggle tracks in every size.
- d64e402: Connect the Dropdown label to its input so the field can be focused through its label.
- d64e402: Fade and scale the Dropdown menu from the edge nearest its trigger, opening over 150ms and closing over 100ms. Respect reduced motion, distinguish the highlighted option from the current value, and dismiss the menu on Tab.
- d64e402: Use the shared keyboard focus ring on Radio controls in all sizes.
- d64e402: Keep map prices and date values readable in narrow containers. Show DatePicker validation feedback and render Dropdown errors once.
- d64e402: Make the SearchBar clear button keyboard accessible, reflect prefilled and externally updated values, and return focus to the search input after clearing.
- d64e402: Expose shared action background, field border and placeholder color tokens. Use the same control heights for Button, TextField and Dropdown in the web components and Penpot library. The placeholder now uses gray 700. Medium Button labels share a typography token for 16px semibold text with a 20px line height. TextField and Dropdown share hover and focus border colors and keep error borders visible during interaction. TextField, Dropdown and SearchBar use independent error border and message tokens.
- d64e402: Align TextField help and character counts, and make its clear button accessible by pointer and keyboard.
- d64e402: ImageInput과 LottieInput의 전체·파일별 로딩에서 편집 가능 여부를 통일했습니다. 처리 중인 파일은 삭제와 이동이 잠기며, Lottie 미리보기 로딩 중에는 삭제와 이동이 가능합니다. 파일 추가 영역은 표시된 오류 문구를 접근성 설명으로 제공합니다. LottieInput의 기본 안내 문구를 “Lottie 파일을 넣어주세요”로 변경했습니다.
- Updated dependencies [d64e402]
  - @pop-ui/foundation@2.4.0

## 2.3.1

### Patch Changes

- 0e36119: ImageInput 항목(`IImageInputItem`)에 `canDelete` 를 추가했습니다. 항목별로 삭제 버튼 노출을 정할 수 있고, 없으면 컴포넌트의 `canDelete` 를 따릅니다.
- Updated dependencies [0e36119]
  - @pop-ui/foundation@2.3.1

## 2.3.0

### Minor Changes

- aeb80c2: Add a reusable numbered step navigation for multi-step forms.

### Patch Changes

- Updated dependencies [aeb80c2]
  - @pop-ui/foundation@2.3.0

## 2.2.7

### Patch Changes

- c3cd623: LottieInput 에 `backgroundImage` 옵션을 추가해 이미지 위에 로띠를 겹쳐 미리볼 수 있습니다.
- Updated dependencies [c3cd623]
  - @pop-ui/foundation@2.2.7

## 2.2.6

### Patch Changes

- b76685c: 호텔 Summary에 사용하는 원본 Android 및 디자인 시스템 자산과 Noto Sans KR/Montserrat 글꼴을 제공하고, 각 글꼴 파일의 배포 URL을 보존합니다.
- Updated dependencies [b76685c]
  - @pop-ui/foundation@2.2.6

## 2.2.5

### Patch Changes

- b4fb1be: core·foundation의 ESM 빌드를 단일 파일 대신 소스 모듈 단위 파일(`dist/esm/`)로 내보내, 소비자 번들러가 쓰지 않는 컴포넌트·아이콘과 그 외부 의존성(lottie-react, react-easy-crop, @dnd-kit, @mantine/dates·dropzone 등)을 번들에서 제외할 수 있게 했습니다. 진입 파일 경로(`dist/core.js`, `dist/foundation.js`)와 `import`·`require`·`styles.css`·타입·`react-native` 진입점, export 목록은 그대로이며 `require`가 쓰는 UMD는 기존 단일 파일을 유지합니다. foundation은 `"sideEffects": false`를 선언합니다.

  LottieInput은 애니메이션 데이터가 있는 타일이 렌더링될 때 `lottie-react`(lottie-web)를 lazy import하고, 불러오는 동안 타일 크기의 빈 영역을 보여 줍니다.

  ESM 번들에서는 쓰지 않는 모듈이 빠지므로, DatePicker를 쓰지 않으면 dayjs `customParseFormat` 플러그인이, DatePicker·CalendarDatePicker를 모두 쓰지 않으면 dayjs `ko` 로케일이 pop-ui import만으로는 등록되지 않습니다. 앱 코드가 이 전역 등록에 기대고 있었다면 앱에서 직접 등록하세요.

## 2.2.4

### Patch Changes

- 68f30d8: Component fonts now resolve through `var(--pop-ui-font-family, Pretendard)`, including Mantine's `--mantine-font-family`. Consumers that already ship their own Pretendard can set `--pop-ui-font-family` to reuse it instead of downloading the bundled `PretendardVariable.woff2`. When the variable is not set the fallback is `Pretendard`, so rendering is unchanged.

## 2.2.3

### Patch Changes

- Updated dependencies [944a6fa]
  - @pop-ui/foundation@2.2.3

## 2.2.2

### Patch Changes

- Updated dependencies [cc7be9a]
- Updated dependencies [947707d]
  - @pop-ui/foundation@2.2.2

## 2.2.1

### Patch Changes

- Updated dependencies [3b0d590]
  - @pop-ui/foundation@2.2.1

## 2.2.0

### Minor Changes

- 42ee699: Add image preview with fit-to-viewport and original-size viewing, and safely open image URLs from the existing link action.

### Patch Changes

- Updated dependencies [a8d14a6]
  - @pop-ui/foundation@2.2.0

## 2.1.1

### Patch Changes

- 4902447: Toggle이 controlled `checked` 변경을 트랙 색에 반영하고, uncontrolled 사용 시 `defaultChecked`로 초기화되도록 수정했습니다.

  Modal에 `styles`를 넘기면 기본 스타일이 통째로 사라지던 문제를 슬롯별 병합(같은 속성은 사용자 값 우선)으로 수정했습니다. `fullScreen`일 때는 기본 `content.borderRadius`를 적용하지 않고, 함수형 `styles`는 그대로 전달합니다. body 기본값은 `paddingLeft`/`paddingRight: 0px` 대신 `paddingInline: 0`입니다.

  **마이그레이션:** 이미 Modal에 `styles`를 넘기던 호출부는 이제 기본값(`content.borderRadius: 12px`, `title`의 `fontSize 16px`·`fontWeight 700`·`lineHeight 150%`·`color`, `header.padding: 16px`, `body.paddingInline: 0`)도 함께 상속합니다. 이전 모습을 유지하려면 해당 키를 명시적으로 지정하세요(예: 모서리를 없애려면 `styles={{ content: { borderRadius: 0 } }}`).

  IButtonProps, TButtonVariant, IModalProps 등 컴포넌트 props 타입을 패키지 루트에서 type-only로 export합니다.

  Button warning variant의 focus-visible 상태 텍스트가 red-50 배경 위 흰색으로 렌더되던 오타를 수정해, 다른 warning 상태와 같은 red-500으로 맞췄습니다.

- Updated dependencies
  - @pop-ui/foundation@2.1.1

## 2.1.0

### Minor Changes

- Next.js 16 SSR 호환성을 보강하고 core의 Mantine 의존성 중복 설치를 방지하도록 패키지 계약을 정리했습니다. foundation에 기존 `IconPhoto` 이름을 alias로 복원해 PDS v2.0 아이콘 이름 변경으로 인한 소비 앱 오류를 방지합니다.

### Patch Changes

- Updated dependencies
  - @pop-ui/foundation@2.1.0

## 2.0.0

### Patch Changes

- Updated dependencies [4a412cc]
  - @pop-ui/foundation@2.0.0

## 1.1.12

### Patch Changes

- 5e54602: Tooltip 타입 버그 수정 및 React 18 peerDep 완화
  - **fix(core/Tooltip)**: `ITooltipProps`가 Mantine의 required `label`을 그대로 상속하여, pop-ui가 의도한 `content` 기반 API가 타입 에러로 막히던 문제 수정. `extends Omit<MantineTooltipProps, 'label'>`로 label을 제거하여 `content`가 유일한 텍스트 소스가 되도록 정정 (런타임 변화 없음, Button 컴포넌트가 이미 사용 중인 동일 패턴).
  - **fix(core,foundation)**: peerDependencies의 react/react-dom을 `^19.2.0` → `^18.0.0 || ^19.0.0`으로 완화. Mantine 8이 `^18.x || ^19.x`를 공식 지원하고 pop-ui 소스는 React 19 전용 API를 사용하지 않으므로, React 18 호스트 앱(inhouse 등)에서의 구조적 호환성을 명시적으로 보장.

- Updated dependencies [5e54602]
  - @pop-ui/foundation@1.1.12
