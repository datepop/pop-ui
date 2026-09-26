---
'@pop-ui/core': patch
---

Toggle이 controlled `checked` 변경을 트랙 색에 반영하고, uncontrolled 사용 시 `defaultChecked`로 초기화되도록 수정했습니다.

Modal에 `styles`를 넘기면 기본 스타일이 통째로 사라지던 문제를 슬롯별 병합(같은 속성은 사용자 값 우선)으로 수정했습니다.

IButtonProps, TButtonVariant, IModalProps 등 컴포넌트 props 타입을 패키지 루트에서 type-only로 export합니다.

Button warning variant의 포커스 상태 텍스트를 흰색에서 red-800으로 바꿔 배경 대비(5.02:1)를 확보했습니다.
