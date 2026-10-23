---
'@pop-ui/core': patch
'@pop-ui/foundation': patch
---

core·foundation의 ESM 빌드를 단일 파일 대신 소스 모듈 단위 파일(`dist/esm/`)로 내보내, 소비자 번들러가 쓰지 않는 컴포넌트·아이콘과 그 외부 의존성(lottie-react, react-easy-crop, @dnd-kit, @mantine/dates·dropzone 등)을 번들에서 제외할 수 있게 했습니다. 진입 파일 경로(`dist/core.js`, `dist/foundation.js`)와 `import`·`require`·`styles.css`·타입·`react-native` 진입점, export 목록은 그대로이며 `require`가 쓰는 UMD는 기존 단일 파일을 유지합니다. foundation은 `"sideEffects": false`를 선언합니다.

LottieInput은 애니메이션 데이터가 있는 타일이 렌더링될 때 `lottie-react`(lottie-web)를 lazy import하고, 불러오는 동안 타일 크기의 빈 영역을 보여 줍니다.

ESM 번들에서는 쓰지 않는 모듈이 빠지므로, DatePicker를 쓰지 않으면 dayjs `customParseFormat` 플러그인이, DatePicker·CalendarDatePicker를 모두 쓰지 않으면 dayjs `ko` 로케일이 pop-ui import만으로는 등록되지 않습니다. 앱 코드가 이 전역 등록에 기대고 있었다면 앱에서 직접 등록하세요.
