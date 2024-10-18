import React, { useState, useEffect } from "react";
import {
  TableContainer,
  TableToolbar,
  TableBatchActions,
  TableBatchAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  Table,
  TableHead,
  TableRow,
  TableExpandHeader,
  TableSelectAll,
  TableHeader,
  TableBody,
  TableExpandRow,
  TableSelectRow,
  TableCell,
  TableExpandedRow,
  DataTable,
  Pagination,
  Modal,
} from "@carbon/react";
import { TrashCan, Save, Download } from "@carbon/icons-react";
import App from "@/app/api/api";
import NoDataDisplay from "./NoDataDisplay";
const MyTable = () => {
  const [rows, setRows] = useState([]);
  const [headers] = useState([
    { key: "doctor", header: "Doctor" },
    { key: "date", header: "Date" },
    { key: "note", header: "Doctor's Notes" },
    { key: "status", header: "Status" },
    { key: "advice", header: "Advice" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState([]);

  useEffect(() => {
    App.get("/api/doctornotes/", {
      withCredentials: true,
    })
      .then((response) => {
        setRows(response.data);
        // console.log("rows:", rows)
        console.log("data:", response.data);
      })
      .catch((error) => console.error("Error fetching data:"));
  }, []);

  const handlePageChange = ({ page, pageSize }) => {
    setCurrentPage(page);
    setItemsPerPage(pageSize);
  };

  const openDeleteModal = (selectedRows) => {
    setRowsToDelete(selectedRows);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const ids = rowsToDelete.map((row) => row.id);
    await App.post("/api/doctornotes/delete/", {
      ids,
    });
    setRows((prevRows) => prevRows.filter((row) => !ids.includes(row.id)));
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  const batchActionClick = async (selectedRows, actionType) => {
    const ids = selectedRows.map((row) => row.id);

    if (actionType === "delete") {
      openDeleteModal(selectedRows);
    } else if (actionType === "save") {
      try {
        const response = await App.post(
          "/api/doctornotes/save/",
          { ids },
          { responseType: "blob" }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "doctor_notes.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error saving data:");
      }
    } else if (actionType === "download") {
      try {
        const response = await App.post(
          "/api/doctornotes/download/",
          { ids },
          { responseType: "blob" }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "doctor_notes.zip");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading data:");
      }
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRows = rows.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <DataTable
        rows={paginatedRows}
        headers={headers}
        render={({
          rows,
          headers,
          getHeaderProps,
          getSelectionProps,
          getToolbarProps,
          getBatchActionProps,
          getRowProps,
          getExpandedRowProps,
          onInputChange,
          selectedRows,
          getTableProps,
          getTableContainerProps,
        }) => {
          const batchActionProps = getBatchActionProps();
          return (
            <TableContainer
              {...getTableContainerProps()}
              style={{ height: "100%", width: "auto" }}
            >
              <TableToolbar {...getToolbarProps()}>
                <TableBatchActions {...getBatchActionProps()}>
                  <TableBatchAction
                    renderIcon={TrashCan}
                    iconDescription="Delete the selected rows"
                    onClick={() => batchActionClick(selectedRows, "delete")}
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  >
                    Delete
                  </TableBatchAction>
                  <TableBatchAction
                    renderIcon={Save}
                    iconDescription="Save the selected rows"
                    onClick={() => batchActionClick(selectedRows, "save")}
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  >
                    Save
                  </TableBatchAction>
                  <TableBatchAction
                    renderIcon={Download}
                    iconDescription="Download the selected rows"
                    onClick={() => batchActionClick(selectedRows, "download")}
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  >
                    Download
                  </TableBatchAction>
                </TableBatchActions>
                <TableToolbarContent
                  aria-hidden={batchActionProps.shouldShowBatchActions}
                >
                  <TableToolbarSearch
                    tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                    onChange={onInputChange}
                  />
                  <TableToolbarMenu
                    tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                  >
                    <TableToolbarAction
                      onClick={() => {
                        /* Add row logic */
                      }}
                    >
                      Add row
                    </TableToolbarAction>
                    <TableToolbarAction
                      onClick={() => {
                        /* Add header logic */
                      }}
                    >
                      Add header
                    </TableToolbarAction>
                  </TableToolbarMenu>
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()} aria-label="Doctor's Notes">
                <TableHead style={{ fontSize: "10px", width: "auto" }}>
                  <TableRow style={{ fontSize: "10px", width: "auto" }}>
                    <TableExpandHeader aria-label="expand row" />
                    <TableSelectAll {...getSelectionProps()} />
                    {headers.map((header, i) => (
                      <TableHeader key={i} {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody
                  style={{
                    position: "relative",
                    fontSize: "10px",
                    width: "auto",
                  }}
                >
                  {rows.length > 0 ? (
                    <>
                      {rows.map((row) => (
                        <React.Fragment key={row.id}>
                          <TableExpandRow {...getRowProps({ row })}>
                            <TableSelectRow {...getSelectionProps({ row })} />
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id}>{cell.value}</TableCell>
                            ))}
                          </TableExpandRow>
                          <TableExpandedRow
                            colSpan={headers.length + 3}
                            className="demo-expanded-td"
                            {...getExpandedRowProps({ row })}
                          >
                            <div style={{ width:"100%", display:"flex", gap:"10px",alignItems:"center", justifyContent:"flex-start"}}>
                            <h6>Patient Advice:</h6>
                            <div>
                              {row.cells.find((cell) =>
                              cell.id.endsWith(":advice")
                            )?.value || "No advice available"}
                            </div>
                            </div>
                            
                          </TableExpandedRow>
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    <tr style={{ height: "40vh" }}>
                      <td colSpan={headers.length + 2}>
                        <NoDataDisplay />
                      </td>
                    </tr>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          );
        }}
      />
      {rows.length > 0 ? (
        <Pagination
          backwardText="Previous page"
          forwardText="Next page"
          itemsPerPageText="Items per page:"
          onChange={handlePageChange}
          page={currentPage}
          pageSize={itemsPerPage}
          pageSizes={[5]}
          totalItems={rows.length}
        />
      ) : (
        <></>
      )}

      <Modal
        open={isDeleteModalOpen}
        modalHeading="Delete Rows"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onRequestClose={handleCancelDelete}
        onRequestSubmit={handleConfirmDelete}
        danger
      >
        <p>Are you sure you want to delete the selected Data?</p>
      </Modal>
    </>
  );
};

export default MyTable;
