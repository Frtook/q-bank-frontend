"use client";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ArrowUpDown, Images } from "lucide-react";
import { Button } from "@/components/ui/button";

import EditAcademyDialog from "./dialogs/EditAcademyDialog";
import DeleteDialog from "@/components/DeleteDialog";

export const columns: ColumnDef<IAcademy>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Academy
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
        <div className="flex items-center gap-3">
          <EditAcademyDialog
            active={academy.active}
            name={academy.name}
            id={academy.id}
            url={academy.logo}
          />
          <DeleteDialog
            id={academy.id}
            mutationKey="academy"
            url="/bank/academy"
          />
        </div>
      );
    },
  },
];
