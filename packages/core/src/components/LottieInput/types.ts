import type { TMultiItemInputFeedback } from '../shared/field';
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

interface ILottieInputProps extends TMultiItemInputFeedback {
  value: ILottieInputItem[];
  onChange?: (nextValue: ILottieInputItem[], meta: ILottieInputChangeMeta) => void;
  /** 편집 대상의 고유 키. 키가 바뀌면 이전 대상에서 진행 중인 파일 읽기를 폐기합니다. */
  uploadScope?: string | number;
  width?: number;
  height?: number;
  placeholder?: ReactNode | ((index: number) => ReactNode);
  hasIcon?: boolean;
  hasLink?: boolean;
  onLinkClick?: (item: ILottieInputItem) => void;
  length?: number;
  minLength?: number;
  maxLength?: number;
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
