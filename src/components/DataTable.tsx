import React from "react";
import { useTable, usePagination, Row } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  As,
  OmitCommonProps,
  TableCellProps,
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";

import makeData from "./makeData";

interface ICustomeTable {
  columns: any;
  data: any;
}

interface IUseTable {
  getTableProps: any;
  getTableBodyProps: any;
  headerGroups: any;
  prepareRow: any;
  page?: any;
  canPreviousPage?: any;
  canNextPage: any;
  pageOptions: any;
  pageCount: any;
  gotoPage: any;
  nextPage: any;
  previousPage: any;
  setPageSize: any;
  state: { pageIndex: any; pageSize: any };
}
function CustomTable({ columns, data }: ICustomeTable) {
  // Use the state and functions returned from useTable to build your UI
  const testTable: IUseTable = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 },
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex: testTable.state.pageIndex,
              pageSize: testTable.state.pageSize,
              pageCount: testTable.pageCount,
              canNextPage: testTable.canNextPage,
              canPreviousPage: testTable.canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>
      <Table {...testTable.getTableProps()}>
        <Thead>
          {testTable.headerGroups.map((headerGroup: any) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...testTable.getTableBodyProps()}>
          {testTable.page.map((row: Row<object>, i: any) => {
            testTable.prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(
                  (cell: {
                    getCellProps: () => JSX.IntrinsicAttributes &
                      OmitCommonProps<
                        React.DetailedHTMLProps<
                          React.TdHTMLAttributes<HTMLTableDataCellElement>,
                          HTMLTableDataCellElement
                        >,
                        keyof TableCellProps
                      > &
                      TableCellProps &
                      OmitCommonProps<any, keyof TableCellProps> & {
                        as?: As<any> | undefined;
                      };
                    render: (
                      arg0: string
                    ) =>
                      | boolean
                      | React.ReactFragment
                      | React.ReactChild
                      | React.ReactPortal
                      | null
                      | undefined;
                  }) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  }
                )}
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              onClick={() => testTable.gotoPage(0)}
              isDisabled={!testTable.canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
              aria-label=""
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              onClick={testTable.previousPage}
              isDisabled={!testTable.canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
              aria-label=""
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center">
          <Text flexShrink="0" mr={8}>
            Page{" "}
            <Text fontWeight="bold" as="span">
              {testTable.state.pageIndex + 1}
            </Text>{" "}
            of{" "}
            <Text fontWeight="bold" as="span">
              {testTable.pageOptions.length}
            </Text>
          </Text>
          <Text flexShrink="0">Go to page:</Text>{" "}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            max={testTable.pageOptions.length}
            onChange={(value: number | string) => {
              // const page: number | string = value ? value - 1 : 0;
              // testTable.gotoPage(page);
            }}
            defaultValue={testTable.state.pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            value={testTable.state.pageSize}
            onChange={(e) => {
              testTable.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              onClick={testTable.nextPage}
              isDisabled={!testTable.canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
              aria-label=""
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              onClick={() => testTable.gotoPage(testTable.pageCount - 1)}
              isDisabled={!testTable.canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
              aria-label=""
            />
          </Tooltip>
        </Flex>
      </Flex>
    </>
  );
}

function DisplayTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Visits",
            accessor: "visits",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
          },
        ],
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData(10000), []);

  return <CustomTable columns={columns} data={data} />;
}

export default DisplayTable;
