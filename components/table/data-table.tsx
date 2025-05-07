"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  ColumnFiltersState,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { useLocale } from "next-intl";
import { Search } from "lucide-react";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: Row<TData>
  ) => void;
}
type Props = {
  placeholderInput: string;
  sortValue: string;
  button?: React.ReactNode;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  placeholderInput,
  button,
  sortValue,
}: DataTableProps<TData, TValue> & Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const locale = useLocale();
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const onRowClickHandler = useCallback(
    (
      event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
      row: Row<TData>
    ) => {
      const target = event.target as HTMLElement;
      if (target.closest("td") && onRowClick) {
        onRowClick(event, row);
      }
    },
    [onRowClick]
  );

  return (
    <div>
      {/* filtter */}
      <div className="my-5 flex items-center justify-between rounded-xl bg-white p-4 dark:bg-secondary">
        <div className="relative">
          <Input
            placeholder={placeholderInput}
            value={
              (table.getColumn(sortValue)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(sortValue)?.setFilterValue(event.target.value)
            }
            className="max-w-sm border-2 bg-white py-6 pl-10 dark:border-white dark:bg-gray-800"
          />
          <Search className="absolute left-3 top-[50%] size-5 -translate-y-1/2 text-gray-400" />
        </div>
        {button && button}
      </div>
      <div className="rounded-md bg-white p-4 shadow-md dark:bg-secondary">
        {/* table */}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={`${
                        locale === "en" ? "text-left" : "text-right"
                      } rounded-xl bg-gray-100 p-2 font-semibold dark:bg-primary dark:text-white`}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={(e) => onRowClickHandler(e, row)}
                  className="dark:odd:bg-muted-foreground/10 dark:even:bg-muted-foreground/20"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="p-4"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {locale === "en" ? "No results." : "لا توجد نتائج."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* pagination */}
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {locale === "en" ? "Previous" : "سابق"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {locale === "en" ? "Next" : "التالي"}
        </Button>
      </div>
    </div>
  );
}
