/** Void elements - 내부 children이 숨겨지는 블록 타입들 */
export const VOID_ELEMENTS = ['img', 'spot', 'hr', 'a'] as const;

/** Heading elements - 제목 블록 타입들 */
export const HEADING_ELEMENTS = ['h1', 'h2', 'h3'] as const;

/** List elements - 리스트 컨테이너 타입들 */
export const LIST_ELEMENTS = ['ul', 'ol'] as const;

/** Draggable elements - DnD로 이동 가능한 void 블록 타입들 */
export const DRAGGABLE_ELEMENTS = ['img', 'spot', 'hr', 'a'] as const;
