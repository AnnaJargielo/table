import React, { useCallback } from "react";
import styled from "styled-components";
import { Sorting } from "../../app/hooks/useSortableData";

const StyledTh = styled.th<{ cellWidth: number }>`
  width: ${(props) => `${props.cellWidth}px`};
  background-color: wheat;
  margin: 0;
  border: 1px solid grey;
  white-space: nowrap;
  border-top-width: 0px;
  box-sizing: border-box;
  cursor: pointer;
`;

const StyledTd = styled.td<{ cellWidth: number }>`
  width: ${(props) => `${props.cellWidth}px`};
  margin: 0;
  border: 1px solid grey;
  white-space: nowrap;
  border-top-width: 0px;
  box-sizing: border-box;

  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
   -ms-animation: fadein 2s; /* Internet Explorer */
    -o-animation: fadein 2s; /* Opera < 12.1 */
       animation: fadein 2s;
}

  @keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
  }

  /* Firefox < 16 */
  @-moz-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
  }

  /* Safari, Chrome and Opera > 12.1 */
  @-webkit-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
  }

  /* Internet Explorer */
  @-ms-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
  }

  /* Opera < 12.1 */
  @-o-keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
  }
`;

const StickyTh = styled(StyledTh)`
  position: absolute;
  right: 0;
`;

const StickyTd = styled(StyledTd)`
  position: absolute;
  right: 0;
  background-color: wheat;
  border-top-width: 1px;
`;

interface CellProps {
  isLast: boolean;
  width: number;
  children: React.ReactNode;
}

interface HeaderCellProps<T> extends CellProps {
  requestSort: (column: keyof T) => void;
  column: keyof T;
  sortConfig: Sorting;
}

export const Cell = ({ isLast, width, children }: CellProps) => {
  const Element = isLast ? StickyTd : StyledTd;
  return <Element cellWidth={width}>{children}</Element>;
};

export const HeaderCell = <T extends unknown>({
  isLast,
  width,
  children,
  column,
  sortConfig,
  requestSort,
}: HeaderCellProps<T>) => {
  const onSort = useCallback(() => {
    requestSort(column);
  }, [requestSort, column]);

  const Element = isLast ? StickyTh : StyledTh;
  return (
    <Element onClick={onSort} cellWidth={width}>
      {children}
    </Element>
  );
};

export default Cell;
