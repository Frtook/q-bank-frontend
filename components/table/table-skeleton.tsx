"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default function TableSkeleton() {
  const rows = Array.from({ length: 10 }, () => Array.from({ length: 6 }));

  return (
    <ScrollArea className="h-[calc(80vh-220px)] rounded-md">
      <Table className="relative border-separate border-spacing-y-3">
        <TableHeader>
          <TableRow className="rounded-xl bg-gray-300 px-6 dark:bg-gray-700">
            {Array.from({ length: 6 }).map((_, columnIndex) => (
              <TableHead
                className="text-right"
                key={columnIndex}
              >
                <div className="h-4 animate-pulse rounded bg-gray-300 dark:bg-gray-600"></div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((_, rowIndex) => (
            <TableRow
              className="border-muted bg-background dark:bg-gray-800"
              key={rowIndex}
            >
              {rows[rowIndex].map((_, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className="p-4 first:rounded-r-lg last:rounded-l-md"
                >
                  <div className="h-4 animate-pulse rounded bg-gray-300 dark:bg-gray-600"></div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
