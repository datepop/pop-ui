---
'@pop-ui/core': patch
---

Toggle이 controlled `checked` 변경을 트랙 색에 반영하고, uncontrolled 사용 시 `defaultChecked`로 초기화되도록 수정했습니다.

Modal에 `styles`를 넘기면 기본 스타일이 통째로 사라지던 문제를 슬롯별 병합(같은 속성은 사용자 값 우선)으로 수정했습니다. `fullScreen`일 때는 기본 `content.borderRadius`를 적용하지 않고, 함수형 `styles`는 그대로 전달합니다. body 기본값은 `paddingLeft`/`paddingRight: 0px` 대신 `paddingInline: 0`입니다.

**마이그레이션:** 이미 Modal에 `styles`를 넘기던 호출부는 이제 기본값(`content.borderRadius: 12px`, `title`의 `fontSize 16px`·`fontWeight 700`·`lineHeight 150%`·`color`, `header.padding: 16px`, `body.paddingInline: 0`)도 함께 상속합니다. 이전 모습을 유지하려면 해당 키를 명시적으로 지정하세요(예: 모서리를 없애려면 `styles={{ content: { borderRadius: 0 } }}`).

IButtonProps, TButtonVariant, IModalProps 등 컴포넌트 props 타입을 패키지 루트에서 type-only로 export합니다.

Button warning variant의 focus-visible 상태 텍스트가 red-50 배경 위 흰색으로 렌더되던 오타를 수정해, 다른 warning 상태와 같은 red-500으로 맞췄습니다.
