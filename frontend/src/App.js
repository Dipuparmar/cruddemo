import "./App.css";
import { useCallback, useEffect, useState } from "react";
import BasicModal from "./components/BasicModel";
import Button from "@mui/material/Button";
import StickyHeadTable from "./components/StickyHeadTable";

function App() {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pageNotFound, setPageNotFound] = useState(false);
  const [entryUpdate, setEntryUpdate] = useState(false);

  const fetchData = useCallback(
    async function fetchData() {
      console.log("useCallback is called---------------->", page);
      try {
        const res = await fetch(
          `http://localhost:8000/api/entry?limit=${limit}&page=${page}`
        );
        const data = await res.json();
        // console.log(data.status==="fail");
        if (data.status === "fail") {
          setPageNotFound(true);
          return;
        }
        setEntries(data.data.data);
        setPageNotFound(false);
      } catch (error) {
        console.log(error);
      }
    },
    [page, limit, entryUpdate]
  );

  const handleDeleteApp = useCallback(async (id) => {
    console.log("app--->", id);
    const res = await fetch(`http://localhost:8000/api/entry/${id}`, {
      method: "DELETE",
    });
    // const data = await res.json();
    setEntryUpdate(!entryUpdate);
    // await fetchData();
  }, []);

  useEffect(() => {
    console.log(
      "useeffect called-------------------->",
      page,
      limit,
      entryUpdate
    );
    fetchData();
  }, [page, limit, fetchData, handleDeleteApp, entryUpdate]);

  return (
    <>
      <BasicModal
        handleClose={handleModalClose}
        open={openModal}
        setOpen={setOpenModal}
        entryUpdate={entryUpdate}
        setEntryUpdate={setEntryUpdate}
      />
      <Button
        class="btn btn-dark"
        onClick={handleModalOpen}
        style={{
          width: "10%",
          margin: "auto",
          marginLeft: "45%",
          marginTop: "8%",
          borderRadius: "10px",
          padding: "5px",
          backgroundColor: "lightblue",
        }}
      >
        Add Data
      </Button>
     

      <StickyHeadTable
        entries={entries}
        setPage={setPage}
        page={page}
        pageNotFound={pageNotFound}
        limit={limit}
        setLimit={setLimit}
        handleDeleteApp={handleDeleteApp}
        handleModalOpen={handleModalOpen}
      />

      {/* {pageNotFound && alert("page not found")} */}
    </>
  );
}

export default App;
