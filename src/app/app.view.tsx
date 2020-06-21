import React from "react";
import { Table } from "../table";
import useSortableData, { Item } from "./hooks/useSortableData";
import { ColumnConfig } from "../table/table.view";
import styled from "styled-components";

const columnsConfig: ColumnConfig<Item>[] = [
  { column: "id", displayName: "Id", width: 70 },
  { column: "first_name", displayName: "First Name", width: 150 },
  { column: "last_name", displayName: "Last Name", width: 150 },
  { column: "email", displayName: "Email", width: 250 },
  { column: "gender", displayName: "Gender", width: 150 },
  { column: "postal_code", displayName: "Postal Code", width: 150 },
  { column: "city", displayName: "City", width: 150 },
  { column: "country", displayName: "Country", width: 150 },
  { column: "job_title", displayName: "Job Title", width: 350 },
];

const StyledContainer = styled.div`
  height: 500px;
  width: 100%;
`;

const App = () => {
  const { items, requestSort, sortConfig } = useSortableData();
  return (
    <StyledContainer>
      <Table<Item>
        columnsConfig={columnsConfig}
        data={items}
        requestSort={requestSort}
        sortConfig={sortConfig!}
      />
    </StyledContainer>
  );
};

export default App;
