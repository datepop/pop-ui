import type { ReactNode } from 'react';

interface IImageInputItem {
  id: string;
  url?: string;
  file?: File;
  isLoading?: boolean;
}

type TImageInputChangeAction = 'create' | 'replace' | 'delete' | 'reorder' | 'crop';

interface IImageInputChangeMeta {
  action: TImageInputChangeAction;
  itemId: string;
  index: number;
  previousIndex?: number;
  nextIndex?: number;
}

type TImageInputPlaceholder = ReactNode | ((index: number) => ReactNode);

interface IImageInputProps {
  value: IImageInputItem[];
  onChange?: (nextValue: IImageInputItem[], meta: IImageInputChangeMeta) => void;
  width?: number;
  height?: number;
  placeholder?: TImageInputPlaceholder;
  hasIcon?: boolean;
  hasLink?: boolean;
  onLinkClick?: (item: IImageInputItem) => void;
  hasEdit?: boolean;
  minLength?: number;
  maxLength?: number;
  errorMsg?: ReactNode;
  isLoading?: boolean;
  readOnly?: boolean;
  gap?: number;
  canDelete?: boolean;
}

export type {
  IImageInputChangeMeta as ImageInputChangeMeta,
  IImageInputItem as ImageInputItem,
  IImageInputProps as ImageInputProps,
  TImageInputChangeAction as ImageInputChangeAction,
  TImageInputPlaceholder as ImageInputPlaceholder,
};
