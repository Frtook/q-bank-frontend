"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSubjectName } from "@/lib/helper";
import EditSubjectDialog from "./dialogs/EditSubjectDialog";
import DeleteDialog from "@/components/DeleteDialog";
export const getColumns = (academies: IAcademy[]): ColumnDef<ISubject>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "academy",
    header: () => "Academy",
    cell: ({ row }) => {
      return getSubjectName(row.original.academy, academies);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const subject = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="flex flex-col p-6"
            align="end"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <DeleteDialog
                mutationKey="subject"
                url="/bank/subject"
                id={subject.id}
              />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <EditSubjectDialog
                academy={subject.academy}
                name={subject.name}
                id={subject.id}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
