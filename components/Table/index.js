import React from "react";
import {
  TableContainer,
  TableToolbar,
  TableBatchActions,
  TableBatchAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarAction,
  TableToolbarMenu,
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
} from "@carbon/react";
import { TrashCan, Save, Download } from "@carbon/icons-react";
// import "./yourStyles.scss";

const MyTable = () => {
  const insertInRandomPosition = (array, element) => {
    const index = Math.floor(Math.random() * (array.length + 1));
    return [...array.slice(0, index), element, ...array.slice(index)];
  };

  const initialRows = [
    {
      id: "1",
      name: "Load Balancer 1",
      protocol: "HTTP",
      port: 80,
      rule: "Round robin",
      attached_groups: "Kevin’s VM Groups",
      status: "Active",
    },
    {
      id: "2",
      name: "Load Balancer 2",
      protocol: "HTTP",
      port: 443,
      rule: "Round robin",
      attached_groups: "Maureen’s VM Groups",
      status: "Active",
    },
    {
      id: "3",
      name: "Load Balancer 2",
      protocol: "HTTP",
      port: 443,
      rule: "Round robin",
      attached_groups: "Maureen’s VM Groups",
      status: "Active",
    },
    {
      id: "4",
      name: "Load Balancer 2",
      protocol: "HTTP",
      port: 443,
      rule: "Round robin",
      attached_groups: "Maureen’s VM Groups",
      status: "Active",
    },
    {
      id: "5",
      name: "Load Balancer 2",
      protocol: "HTTP",
      port: 443,
      rule: "Round robin",
      attached_groups: "Maureen’s VM Groups",
      status: "Active",
    },
  ];

  const initialHeaders = [
    {
      key: "name",
      header: "Name",
    },
    {
      key: "protocol",
      header: "Protocol",
    },
    {
      key: "port",
      header: "Port",
    },
    {
      key: "rule",
      header: "Rule",
    },
    {
      key: "attached_groups",
      header: "Attached Groups",
    },
    {
      key: "status",
      header: "Status",
    },
  ];

  class DynamicRows extends React.Component {
    state = {
      rows: initialRows,
      headers: initialHeaders,
      id: initialRows.length,
    };

    handleOnHeaderAdd = () => {
      const length = this.state.headers.length;
      const header = {
        key: `header_${length}`,
        header: `Header ${length}`,
      };
      this.setState((state) => {
        const rows = state.rows.map((row) => {
          return {
            ...row,
            [header.key]: header.header,
          };
        });
        return {
          rows,
          headers: state.headers.concat(header),
        };
      });
    };

    handleOnRowAdd = () => {
      this.setState((state) => {
        const { id: _id, rows } = state;
        const id = _id + 1;
        const row = {
          id: "" + id,
          name: `New Row ${id}`,
          protocol: "HTTP",
          port: id * 100,
          rule: id % 2 === 0 ? "Round robin" : "DNS delegation",
          attached_groups: `Row ${id}'s VM Groups`,
          status: "Starting",
        };
        state.headers
          .filter((header) => row[header.key] === undefined)
          .forEach((header) => {
            row[header.key] = header.header;
          });
        return {
          id,
          rows: insertInRandomPosition(rows, row),
        };
      });
    };

    render() {
      return (
        <DataTable
          rows={this.state.rows}
          headers={this.state.headers}
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
                // title="DataTable"
                // description="Use the toolbar menu to add rows and headers"
                {...getTableContainerProps()}
              >
                <TableToolbar {...getToolbarProps()}>
                  <TableBatchActions {...getBatchActionProps()}>
                    <TableBatchAction
                      renderIcon={TrashCan}
                      iconDescription="Delete the selected rows"
                      onClick={() => batchActionClick(selectedRows)}
                      tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                    >
                      Delete
                    </TableBatchAction>
                    <TableBatchAction
                      renderIcon={Save}
                      iconDescription="Save the selected rows"
                      onClick={() => batchActionClick(selectedRows)}
                      tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                    >
                      Save
                    </TableBatchAction>
                    <TableBatchAction
                      renderIcon={Download}
                      iconDescription="Download the selected rows"
                      onClick={() => batchActionClick(selectedRows)}
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
                      <TableToolbarAction onClick={this.handleOnRowAdd}>
                        Add row
                      </TableToolbarAction>
                      <TableToolbarAction onClick={this.handleOnHeaderAdd}>
                        Add header
                      </TableToolbarAction>
                    </TableToolbarMenu>
                  </TableToolbarContent>
                </TableToolbar>
                <Table {...getTableProps()} aria-label="sample table">
                  <TableHead>
                    <TableRow>
                      <TableExpandHeader aria-label="expand row" />
                      <TableSelectAll {...getSelectionProps()} />
                      {headers.map((header, i) => (
                        <TableHeader key={i} {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
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
                          <h6>Expandable row content</h6>
                          <div>Description here</div>
                        </TableExpandedRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            );
          }}
        />
      );
    }
  }

  return <DynamicRows />;
};

export default MyTable;
