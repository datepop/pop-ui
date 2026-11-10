import type { ReactNode } from 'react';

interface ILottieInputItem {
  id: string;
  url?: string;
  file?: File;
  animationData?: Record<string, unknown>;
  isLoading?: boolean;
  position?: number;
}

type TLottieInputChangeAction = 'create' | 'delete' | 'reorder';

interface ILottieInputChangeMeta {
  action: TLottieInputChangeAction;
  itemId: string;
  index: number;
  previousIndex?: number;
  nextIndex?: number;
}

interface ILottieInputProps {
  value: ILottieInputItem[];
  onChange?: (nextValue: ILottieInputItem[], meta: ILottieInputChangeMeta) => void;
  width?: number;
  height?: number;
  placeholder?: ReactNode | ((index: number) => ReactNode);
  hasIcon?: boolean;
  hasLink?: boolean;
  onLinkClick?: (item: ILottieInputItem) => void;
  length?: number;
  minLength?: number;
  maxLength?: number;
  errorMsg?: ReactNode;
  isLoading?: boolean;
  readOnly?: boolean;
  gap?: number;
  canDelete?: boolean;
  /** 로띠 아래에 깔 이미지 주소. 앱처럼 이미지 위에 로띠를 겹쳐 미리본다. */
  backgroundImage?: string;
}

export type {
  ILottieInputItem,
  ILottieInputChangeMeta,
  ILottieInputProps,
  TLottieInputChangeAction,
};
