import type { ReactNode } from 'react';

type TImageMimeType =
  | 'image/png'
  | 'image/gif'
  | 'image/jpeg'
  | 'image/svg+xml'
  | 'image/webp'
  | 'image/avif'
  | 'image/heic'
  | 'image/heif';

type TImageInputAccept = TImageMimeType[];

interface IImageInputItem {
  id: string;
  url?: string;
  file?: File;
  isLoading?: boolean;
  position?: number;
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
  accept?: TImageInputAccept;
  length?: number;
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
  TImageInputAccept as ImageInputAccept,
  IImageInputChangeMeta as ImageInputChangeMeta,
  IImageInputItem as ImageInputItem,
  IImageInputProps as ImageInputProps,
  TImageInputChangeAction as ImageInputChangeAction,
  TImageInputPlaceholder as ImageInputPlaceholder,
};
