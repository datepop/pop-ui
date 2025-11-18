import type { ReactNode } from 'react';

export interface IToastOptions {
  message: string;
  id?: string;
  icon?: ReactNode;
  autoClose?: number | false;
  backgroundColor?: string;
  textColor?: string;
}

export type TToastInput = string | IToastOptions;
