export const CONTROL_SIZES = ['sm', 'md', 'lg'] as const;
export type TControlSize = (typeof CONTROL_SIZES)[number];
