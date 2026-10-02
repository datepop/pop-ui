# @pop-ui/core

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
