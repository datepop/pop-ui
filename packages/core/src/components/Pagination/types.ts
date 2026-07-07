import type { HTMLAttributes } from 'react';

export interface IPaginationProps extends HTMLAttributes<HTMLDivElement> {
  currentPageIdx: number;
  rowsPerPage?: number;
  totalLength?: number;
  paginationSize?: number;
  onPageChange?: (e: number) => void;
}
