import styles from "./styles.module.scss";
import { ReactNode, useCallback, useMemo, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
import ic_sortable from "../../assets/icons/ic_sortable.svg";
import ic_chevron_up from "../../assets/icons/ic_chevron_up.svg";
import ic_chevron_down from "../../assets/icons/ic_chevron_down.svg";
import ic_drag from "../../assets/icons/ic_drag.svg";

interface RowData {
  [key: string]: {
    cell: ReactNode;
    sortTarget?: string | number | boolean;
    dndId?: string | number;
  }; // sortTarget은 cell의 내용이 Html element인 경우 sort를 위해 따로 비교할 수 있는 값을 사용한다
}

export interface TableProps {
  tableId?: string;
  headerList?: Array<ReactNode>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableData?: RowData[];
  sortable?: boolean;
  draggable?: boolean;
  striped?: boolean;
  onDragEnd?: (rows: { dndId?: string | number }[]) => void;
  className?: string;
}

export const Table = ({
  tableId,
  headerList,
  tableData,
  sortable,
  draggable = false,
  striped,
  onDragEnd,
  className,
}: TableProps) => {
  const [rows, setRows] =
    useState<{ row: JSX.Element; dndId?: string | number }[]>();
  const [sortedColIndex, setSortedColIndex] = useState<number>();
  const [sortedDirection, setSortedDirection] = useState<"asc" | "desc">();

  const rowMaker = useCallback(
    (sortedData?: RowData[]) => {
      const tableRows = sortedData?.map((data, index) => {
        const dataKeys = Object.keys(data);
        const row = (
          <>
            {dataKeys.map((key, keyIndex) => (
              <td
                key={`table_${tableId || 0}_tr_${index}_col_${keyIndex}`}
                className={styles.td_cell}
              >
                {data[key].cell}
              </td>
            ))}
          </>
        );

        if (draggable && data[dataKeys[0]]?.dndId === undefined) {
          console.error(
            "draggable table을 사용할 때엔 tableData의 첫번째 필드에 고유한 dndId를 설정해주세요",
          );
        }

        return { row: row, dndId: data[dataKeys[0]]?.dndId };
      });
      setRows(tableRows);
    },
    [draggable, tableId],
  );

  useMemo(() => {
    // 테이블 데이터 변경시, sort option 삭제
    setSortedColIndex(undefined);
    setSortedDirection(undefined);
    rowMaker(tableData);
  }, [rowMaker, tableData]);

  const sortingHandler = useCallback(
    (colIndex: number) => {
      if (tableData) {
        const copyArr = tableData.slice(0);
        // 정렬 기준 키
        const sortBy = Object.keys(copyArr[0])[colIndex];
        setSortedColIndex(colIndex);
        let newSortedData;
        /* 
          정렬 순서
            1. 내림차순
            2. 오름차순
            3. 초기화
          1, 2, 3을 반복
        */
        if (!sortedDirection) {
          newSortedData = copyArr?.sort((a, b) =>
            String(b[sortBy].sortTarget || b[sortBy].cell).localeCompare(
              String(a[sortBy].sortTarget || a[sortBy].cell),
            ),
          );
          setSortedDirection("desc");
        } else if (sortedDirection === "desc") {
          newSortedData = copyArr?.sort((a, b) =>
            String(a[sortBy].sortTarget || a[sortBy].cell).localeCompare(
              String(b[sortBy].sortTarget || b[sortBy].cell),
            ),
          );
          setSortedDirection("asc");
        } else {
          newSortedData = copyArr;
          setSortedColIndex(undefined);
          setSortedDirection(undefined);
        }

        rowMaker(newSortedData);
      }
    },
    [rowMaker, sortedDirection, tableData],
  );

  const sortableArrow = useCallback(
    (index: number) => {
      if (!sortable) {
        return null;
      }

      if (sortedColIndex === index) {
        if (sortedDirection === "desc") {
          return <img src={ic_chevron_down} alt="ic_chevron_down" />;
        }
        return <img src={ic_chevron_up} alt="ic_chevron_up" />;
      } else {
        return <img src={ic_sortable} alt="ic_sortable" />;
      }
    },
    [sortable, sortedColIndex, sortedDirection],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reorder = useCallback((list: any[], item: any, insertIdx: number) => {
    const result = Array.from(list);
    result.splice(insertIdx, 0, item);
    return result;
  }, []);

  const onDragEndHandler = useCallback(
    (result: DropResult) => {
      //  영역 밖에 drop한 경우
      if (!result.destination) {
        return;
      }
      // rows가 존재하지 않는 경우
      if (!rows) {
        return;
      }
      // reorder 처리를 위한 temp value 선언
      const duplRows = rows?.slice(0);

      const [newItem] = duplRows.splice(result.source.index, 1);

      const items = reorder(duplRows, newItem, result.destination.index);
      setRows(items);
      if (onDragEnd) {
        onDragEnd(items.map((el) => ({ dndId: el?.dndId })));
      }
    },
    [onDragEnd, reorder, rows],
  );

  return (
    <table className={`${styles.table} ${className || ""}`}>
      <thead>
        <tr>
          {draggable && (
            <th className={styles.th_cell} style={{ padding: 0 }} />
          )}
          {headerList?.map((header, index) => (
            <th
              key={`table_header_col_${index}`}
              className={sortable ? styles.th_cell_sortable : styles.th_cell}
              onClick={() => {
                if (sortable) {
                  sortingHandler(index);
                }
              }}
            >
              <div>
                {header}
                {sortableArrow(index)}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable droppableId={`dnd_table_${tableId || 0}_drop_zone`}>
          {(dropProvided: DroppableProvided) => (
            <tbody ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
              {rows?.map((rowData, index) => (
                <Draggable
                  key={`dnd_table_${tableId || 0}_drag_item_${
                    rowData?.dndId !== undefined ? rowData.dndId : index
                  }`}
                  draggableId={`dnd_table_${
                    tableId || 0
                  }_drag_item_${rowData?.dndId}`}
                  index={index}
                  isDragDisabled={!draggable}
                >
                  {(dragProvided) => (
                    <tr
                      {...dragProvided.dragHandleProps}
                      {...dragProvided.draggableProps}
                      ref={dragProvided.innerRef}
                      key={`table_${tableId || 0}_tr_${index}`}
                      className={
                        striped && index % 2 === 1 ? styles.tr_gray : undefined
                      }
                    >
                      {draggable && (
                        <td className={styles.td_cell} style={{ padding: 0 }}>
                          <div>
                            <img src={ic_drag} alt="ic_drag" />
                          </div>
                        </td>
                      )}
                      {rowData?.row}
                    </tr>
                  )}
                  {/* <tr
                  key={`table_${tableId || 0}_tr_${index}`}
                  className={
                    striped && index % 2 === 1 ? styles.tr_gray : undefined
                  }
                >
                  {row}
                </tr> */}
                </Draggable>
              ))}
              {dropProvided.placeholder}
            </tbody>
          )}
        </Droppable>
      </DragDropContext>
    </table>
  );
};

export default Table;
