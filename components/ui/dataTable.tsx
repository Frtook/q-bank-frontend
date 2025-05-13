"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scrollArea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pencil2Icon,
  TrashIcon,
  DotsVerticalIcon,
} from "@radix-ui/react-icons";

interface Column {
  accessor: string;
  header: string;
}

interface DataRow {
  [key: string]: React.ReactNode;
}

interface DataTableProps {
  title?: string;
  columns: Column[];
  data: DataRow[];
  onRowSelectionChange?: (selectedRows: number[]) => void;
  onEdit?: (rowIndex: number) => void;
  onDelete?: (rowIndex: number) => void;
  onRowClick?: (rowData: DataRow) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  data,
  onRowSelectionChange,
  onEdit,
  onDelete,
  onRowClick,
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const visibleColumns = columns.filter((col) => col.accessor !== "id");
  const hasActions = !!onEdit || !!onDelete;

  const handleRowSelection = (index: number) => {
    const newSelectedRows = selectedRows.includes(index)
      ? selectedRows.filter((i) => i !== index)
      : [...selectedRows, index];
    setSelectedRows(newSelectedRows);
    onRowSelectionChange?.(newSelectedRows);
  };

  const handleSelectAll = () => {
    const allSelected = selectedRows.length === data.length;
    const newSelection = allSelected ? [] : data.map((_, i) => i);
    setSelectedRows(newSelection);
    onRowSelectionChange?.(newSelection);
  };

  const handleRowClick = (rowData: DataRow) => {
    onRowClick?.(rowData);
  };

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-lg dark:bg-[#19191d]">
      {title && (
        <h2 className="mb-4 text-xl font-semibold text-gray-800">{title}</h2>
      )}

      <ScrollArea className="h-[430px] w-full">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-[#353a3e]">
              <TableHead className="px-4 text-left">
                <Checkbox
                  checked={selectedRows.length === data.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>

              {visibleColumns.map((col) => (
                <TableHead
                  key={col.accessor}
                  className="whitespace-nowrap px-4 text-left font-medium text-[#535862] dark:text-white"
                >
                  {col.header}
                </TableHead>
              ))}

              {hasActions && (
                <TableHead className="flex items-center justify-center whitespace-nowrap px-4 font-bold text-gray-700 dark:text-white">
                  <DotsVerticalIcon className="text-black" />
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="border-b hover:bg-gray-50 dark:hover:bg-primary"
                onClick={() => handleRowClick(row)}
                style={{ cursor: onRowClick ? "pointer" : "default" }}
              >
                <TableCell
                  className="px-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    checked={selectedRows.includes(rowIndex)}
                    onCheckedChange={() => handleRowSelection(rowIndex)}
                  />
                </TableCell>

                {visibleColumns.map((col) => (
                  <TableCell
                    key={col.accessor}
                    className="cursor-pointer px-4 py-6 font-semibold text-[#181D27] dark:text-white"
                  >
                    {row[col.accessor]}
                  </TableCell>
                ))}

                {hasActions && (
                  <TableCell
                    className="px-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex gap-2">
                      {onEdit && (
                        <button
                          className="text-[#0A214C] dark:text-white"
                          onClick={() => onEdit(rowIndex)}
                        >
                          <Pencil2Icon className="h-5 w-5" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="text-[#D92D20]"
                          onClick={() => onDelete(rowIndex)}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default DataTable;
