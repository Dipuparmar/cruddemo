import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns = [
  //   { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     width: 90,
  //   },
  {
    field: "email",
    headerName: "Email",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  { field: "mobileNo", headerName: "Mobile No", width: 130 },
  { field: "post", headerName: "Post", width: 130 },
];

export default function DataTable(props) {
  const { entries, toggleFormIsOpen } = props;

  let rows = entries.map((entry) => ({ id: entry._id, ...entry }));
  //   console.log(entries);
  return (
    <div
      style={{
        height: 400,
        width: "35%",
        margin: "auto",
        marginTop: "1%",
        borderRadius: "20px",
      }}
    >
      {entries && entries.length && (
        <DataGrid
          rows={rows}
          columns={columns}
          // initialState={
          //   {
          //     // pagination: {
          //     //   paginationModel: { page: 0, pageSize: 5 },
          //     // },
          //   }
          // }
          // pageSizeOptions={[5, 10]}
          // checkboxSelection
        />
      )}
    </div>
  );
}