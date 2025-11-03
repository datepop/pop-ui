'use client'

import { HTMLAttributes, useMemo, useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@pop-ui/foundation";

import style from "./style.module.scss";

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
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
}: PaginationProps) => {
  const [currentIdx, setCurrentIdx] = useState<number>(currentPageIdx);
  const [maxPageRows, setMaxPageRows] = useState<number>(50);
  const [totalrows, setTotalRows] = useState<number>(1);
  const [paginationLength, setPaginationLength] = useState<number>(5);

  useMemo(() => {
    setCurrentIdx(currentPageIdx);
    setMaxPageRows(rowsPerPage || 50);
    setTotalRows(totalLength || 1);
    setPaginationLength(paginationSize || 5);
  }, [currentPageIdx, rowsPerPage, totalLength, paginationSize]);

  const onClickPrev = () => {
    if (onPageChange) {
      onPageChange(currentIdx - ((currentIdx % paginationLength) + 1));
    }
    setCurrentIdx((prev) => prev - ((prev % paginationLength) + 1));
  };

  const onClickNext = () => {
    if (onPageChange) {
      onPageChange(
        currentIdx + paginationLength - (currentIdx % paginationLength),
      );
    }
    setCurrentIdx(
      (prev) => prev + paginationLength - (prev % paginationLength),
    );
  };

  return (
    <div {...props} className={style["Pagination"]}>
      {currentIdx >= paginationLength ? (
        <button className={style["Pagination__Arrow"]} onClick={onClickPrev}>
          <IconChevronLeft size={20} />
        </button>
      ) : null}
      {new Array(paginationLength).fill(0).map((_v, index) => {
        const indexNumber =
          Math.floor(currentIdx / paginationLength) * paginationLength +
          index +
          1;

        if (indexNumber > Math.ceil(totalrows / maxPageRows)) {
          return;
        }

        return (
          <button
            key={`pagination_${index}`}
            className={
              currentIdx === indexNumber - 1
                ? style["Pagination__PageIndex--Active"]
                : style["Pagination__PageIndex"]
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
      {Math.floor(currentIdx / paginationLength) * paginationLength +
        paginationLength <
      Math.ceil(totalrows / maxPageRows) ? (
        <button className={style["Pagination__Arrow"]} onClick={onClickNext}>
          <IconChevronRight size={20} />
        </button>
      ) : null}
    </div>
  );
};

export default Pagination;
