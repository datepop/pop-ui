# @pop-ui/core

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
