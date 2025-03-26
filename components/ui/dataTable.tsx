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
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  data,
  onRowSelectionChange,
  onEdit,
  onDelete,
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Filter out the `id` column from the columns array
  const visibleColumns = columns.filter((col) => col.accessor !== "id");

  const handleRowSelection = (index: number) => {
    const newSelectedRows = selectedRows.includes(index)
      ? selectedRows.filter((i) => i !== index)
      : [...selectedRows, index];
    setSelectedRows(newSelectedRows);
    onRowSelectionChange?.(newSelectedRows);
  };

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, index) => index));
    }
    onRowSelectionChange?.(
      selectedRows.length === data.length ? [] : data.map((_, index) => index),
    );
  };

  return (
    <div className="w-full bg-white dark:bg-[#19191d] shadow-lg rounded-xl p-4">
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      )}

      <ScrollArea className="w-full h-[430px]">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-[#353a3e]">
              {/* Select All Checkbox */}
              <TableHead className="px-4 text-left">
                <Checkbox
                  checked={selectedRows.length === data.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              {/* Render visible columns (excluding `id`) */}
              {visibleColumns.map((col) => (
                <TableHead
                  key={col.accessor}
                  className="px-4 text-left text-[#535862] dark:text-white font-medium whitespace-nowrap"
                >
                  {col.header}
                </TableHead>
              ))}
              {/* Actions Column Header */}
              <TableHead className="px-4 text-gray-700 dark:text-white font-bold whitespace-nowrap flex items-center justify-center">
                <DotsVerticalIcon className="text-black" />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="border-b hover:bg-gray-50 dark:hover:bg-primary"
              >
                {/* Row Checkbox */}
                <TableCell className="px-4">
                  <Checkbox
                    checked={selectedRows.includes(rowIndex)}
                    onCheckedChange={() => handleRowSelection(rowIndex)}
                  />
                </TableCell>
                {/* Render visible columns (excluding `id`) */}
                {visibleColumns.map((col) => (
                  <TableCell
                    key={col.accessor}
                    className="py-6 hover:cursor-pointer px-4 font-semibold text-[#181D27] dark:text-white"
                  >
                    {row[col.accessor]}
                  </TableCell>
                ))}
                {/* Actions Column */}
                <TableCell className="px-4">
                  <div className="flex gap-2">
                    <button
                      className="text-[#0A214C] dark:text-white"
                      onClick={() => onEdit?.(rowIndex)} // Trigger edit action
                    >
                      <Pencil2Icon className="w-5 h-5" />
                    </button>
                    <button
                      className="text-[#D92D20]"
                      onClick={() => onDelete?.(rowIndex)} // Trigger delete action
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default DataTable;
