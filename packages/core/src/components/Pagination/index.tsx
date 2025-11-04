'use client';

import { IconChevronLeft, IconChevronRight } from '@pop-ui/foundation';
import { useEffect, useState } from 'react';

import style from './style.module.scss';

import type { HTMLAttributes } from 'react';

export interface IPaginationProps extends HTMLAttributes<HTMLDivElement> {
  currentPageIdx: number;
  rowsPerPage?: number;
  totalLength?: number;
  paginationSize?: number;
  onPageChange?: (e: number) => void;
}

export const Pagination = ({
  currentPageIdx,
  rowsPerPage,
  totalLength,
  paginationSize,
  onPageChange,
  ...props
}: IPaginationProps) => {
  const [currentIdx, setCurrentIdx] = useState<number>(currentPageIdx);

  // Derive values from props instead of storing in state
  const maxPageRows = rowsPerPage || 50;
  const totalrows = totalLength || 1;
  const paginationLength = paginationSize || 5;

  // Sync currentIdx when currentPageIdx prop changes
  useEffect(() => {
    setCurrentIdx(currentPageIdx);
  }, [currentPageIdx]);

  const onClickPrev = () => {
    if (onPageChange) {
      onPageChange(currentIdx - ((currentIdx % paginationLength) + 1));
    }
    setCurrentIdx((prev) => prev - ((prev % paginationLength) + 1));
  };

  const onClickNext = () => {
    if (onPageChange) {
      onPageChange(currentIdx + paginationLength - (currentIdx % paginationLength));
    }
    setCurrentIdx((prev) => prev + paginationLength - (prev % paginationLength));
  };

  return (
    <div {...props} className={style['Pagination']}>
      {currentIdx >= paginationLength ? (
        <button className={style['Pagination__Arrow']} onClick={onClickPrev}>
          <IconChevronLeft size={20} />
        </button>
      ) : null}
      {new Array(paginationLength).fill(0).map((_v, index) => {
        const indexNumber =
          Math.floor(currentIdx / paginationLength) * paginationLength + index + 1;

        if (indexNumber > Math.ceil(totalrows / maxPageRows)) {
          return;
        }

        return (
          <button
            key={`pagination_${index}`}
            className={
              currentIdx === indexNumber - 1
                ? style['Pagination__PageIndex--Active']
                : style['Pagination__PageIndex']
            }
            onClick={() => {
              setCurrentIdx(indexNumber - 1);
              if (onPageChange) {
                onPageChange(indexNumber - 1);
              }
            }}
          >
            {indexNumber}
          </button>
        );
      })}
      {Math.floor(currentIdx / paginationLength) * paginationLength + paginationLength <
      Math.ceil(totalrows / maxPageRows) ? (
        <button className={style['Pagination__Arrow']} onClick={onClickNext}>
          <IconChevronRight size={20} />
        </button>
      ) : null}
    </div>
  );
};

export default Pagination;
