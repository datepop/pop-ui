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
}

export type {
  ILottieInputItem as LottieInputItem,
  ILottieInputChangeMeta as LottieInputChangeMeta,
  ILottieInputProps as LottieInputProps,
  TLottieInputChangeAction as LottieInputChangeAction,
};
