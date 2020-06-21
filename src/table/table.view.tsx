import React from "react";
import styled from "styled-components";
import { Cell, HeaderCell } from "./components/cell";

import { Sorting } from "../app/hooks/useSortableData";
export interface ColumnConfig<T> {
  column: keyof T;
  displayName: string;
  width: number;
}

const StyledTable = styled.table<{ rightMargin?: number; tableWidth?: number }>`
  table-layout: fixed;

  border-collapse: collapse;
  border-spacing: 0;
  border-top: 1px solid grey;
  box-sizing: border-box;
  margin-right: ${(props) => `${props.rightMargin}px`};
  width: ${(props) => `${props.tableWidth}px`};
`;

const StyledContainer = styled.div<{ tableWidth: number }>`
  max-width: ${(props) => `${props.tableWidth}px`};
  position: relative;
`;

const StyledWrapper = styled.div`
  overflow: auto;
`;

export function Table<T>({
  columnsConfig,
  data,
  requestSort,
  sortConfig,
}: {
  columnsConfig: ColumnConfig<T>[];
  data: T[];
  sortConfig: Sorting;
  requestSort: (column: keyof T) => void;
}) {
  const tableWidth =
    columnsConfig.reduce((acc, item) => (acc = acc + item.width), 0) - 3;

  return (
    <StyledContainer tableWidth={tableWidth}>
      <StyledWrapper>
        <StyledTable
          tableWidth={tableWidth}
          rightMargin={columnsConfig[columnsConfig.length - 1].width}
        >
          <thead>
            <tr>
              {columnsConfig.map((item, idx) => (
                <HeaderCell
                  isLast={idx === columnsConfig.length - 1}
                  width={item.width}
                  requestSort={requestSort}
                  sortConfig={sortConfig}
                  column={item.column}
                  key={`${item.column}-${idx}`}
                >
                  {item.displayName}
                </HeaderCell>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={`${item[columnsConfig[0].column]}-${idx}`}>
                {columnsConfig.map((column, colIdx) => (
                  <Cell
                    key={`${column}-${colIdx}`}
                    isLast={colIdx === columnsConfig.length - 1}
                    width={column.width}
                  >
                    {item[column.column]}
                  </Cell>
                ))}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </StyledWrapper>
    </StyledContainer>
  );
}

export default Table;
