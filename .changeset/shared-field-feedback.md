---
'@pop-ui/core': minor
---

TextField, Dropdown, SearchBar, DatePicker에서 `description`, `error`, `required`를 같은 방식으로 사용할 수 있습니다. 설명과 오류는 해당 입력에 연결되며 SearchBar는 오류를 한 번만 표시합니다. 기존 TextField, Dropdown, SearchBar의 `errorMsg`는 계속 지원합니다. 두 속성을 함께 전달하면 `error`가 우선합니다.
