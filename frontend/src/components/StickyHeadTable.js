import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./StickyHeadTable.css";
import Avatar from "@mui/material/Avatar";

import { Button } from "@mui/base";

const columns = [
  // { id: "profile", label: "Profile", minWidth: 10 },
  { id: "firstName", label: "First Name", minWidth: 200 },
  { id: "lastName", label: "Last Name", minWidth: 200 },
  {
    id: "email",
    label: "Email",
    minWidth: 200,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "mobileNo",
    label: "Mobile No.",
    minWidth: 200,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "post",
    label: "Post",
    minWidth: 200,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

export default function StickyHeadTable(props) {
  //   const [page, setPage] = React.useState(0);
  //   const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let counter = 1;
  // const [limit, setLimit] = useState(10);
  // const [page, setPage] = useState(1);
  const {
    setPage,
    page,
    pageNotFound,
    setLimit,
    limit,
    handleDeleteApp,
    handleModalOpen,
  } = props;
  

  const handleLeft = () => {
    setPage((prepag) => --prepag);
  };

  const handleRight = () => {
    setPage((prepag) => ++prepag);
  };

  const handleDelete = (id) => {
    // console.log(id);
    handleDeleteApp(id);
  };

  const { entries } = props;
  //   let rows = entries.map((entry) => ({ id: entry._id, ...entry }));

  //   console.log(entries);

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(+event.target.value);
  //     setPage(0);
  //   };

  return (
    <div
      style={{
        height: 400,
        width: "70%",
        margin: "auto",
        marginTop: "1%",
        borderRadius: "20px",
      }}
    >
      {!pageNotFound && (
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            border: "2px solid #C0C0C0",
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Profile</TableCell>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {entries.map((row, index) => {
                  console.log("row----------", row);
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell>
                        <Avatar
                          alt="Remy Sharp"
                          src={
                            row.profile
                              ? row.profile
                              : `/static/images/avatar/1.jpg`
                          }
                        >
                          {row.firstName[0]}
                        </Avatar>
                      </TableCell>

                      {columns.map((column) => {
                        // console.log("heloooooooooooooooooooooooooo", column);

                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}

                      <Button
                       class="btn btn-dark"
                        onClick={(id) => handleDelete(row._id)}
                        style={{
                          marginTop: "25px",
                          color: "black",
                          backgroundColor: "lightblue",
                        }}
                      >
                        Delete
                      </Button>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={entries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
        </Paper>
      )}
      {pageNotFound && (
        <div
          style={{
            textDecorationStyle: "solid",
            fontSize: "50px",
            textAlign: "center",
            border: "2px solid #C0C0C0",
            padding: "100px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            src="img/c92268d92cf2dbf96e3195683d9e14fb.png"
            width="500"
            height="250"
            alt="not found"
          ></img>
          <br />

          <Button
           class="btn btn-dark"
            onClick={handleModalOpen}
            style={{
              width: "18%",
              padding:"5px",
              margin: "auto",
              marginLeft: "42%",
              borderRadius: "10px",
              backgroundColor: "lightblue",
              color: "black",
            }}
          >
            Add More Data
          </Button>
        </div>
      )}
      <div
        style={{
          alignItems: "right",
          display: "flex",
          justifyContent: "right",
          float: "right",
          border: "2px solid #C0C0C0",
          width: "100%",
          marginTop: "5px",
          borderRadius: "10px",
        }}
      >
        <label
          style={{
            width: "35px",
            marginTop: "12px",
            height: "27px",
            color: "#2F4F4F",
          }}
        >
          limit
        </label>
        <input
          type="number"
          value={limit}
          min={1}
          onChange={(e) => setLimit(e.target.value)}
          disabled={pageNotFound ? true : false}
          style={{
            width: "35px",
            margin: "5px",
            height: "27px",
            border: "2px solid #C0C0C0",
            borderRadius: "5px",
          }}
        />
        <div style={{ margin: "5px", display: "flex" }}>
          <button
            class="arrow-buttons"
            onClick={handleLeft}
            disabled={page === 1 ? true : false}
            style={{ borderRadius: "5px", border: "2px solid #C0C0C0" }}
          >
            <div class="arrow-button arrow-button--l"></div>
          </button>
          <div style={{ margin: "5px", height: "100%" }}>{page}</div>
          <button
            class="arrow-buttons"
            onClick={handleRight}
            disabled={pageNotFound ? true : false}
            style={{
              marginRight: "10px",
              borderRadius: "5px",
              border: "2px solid #C0C0C0",
            }}
          >
            <div class="arrow-button arrow-button--r"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
