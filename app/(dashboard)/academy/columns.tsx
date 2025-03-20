"use client";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ArrowUpDown, Images, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AcademyDialog from "./AcademyDialog";
import DeleteDialog from "./DeleteDialog";

export const columns: ColumnDef<IAcademy>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => {
      const active = row.getValue("active");
      return (
        <Badge variant={active ? "default" : "destructive"}>
          {active ? "Active" : "unactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      if (row.getValue("logo")) {
        return (
          <Image
            src={row.getValue("logo")}
            width={50}
            height={50}
            alt={row.getValue("name")}
          />
        );
      } else {
        return <Images />;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const academy = row.original;

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex-col flex p-6" align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <AcademyDialog
                  active={academy.active}
                  name={academy.name}
                  isUpdate={true}
                  id={academy.id}
                  url={academy.logo}
                />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <DeleteDialog id={academy.id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
