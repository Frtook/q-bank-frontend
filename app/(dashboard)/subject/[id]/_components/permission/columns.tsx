"use client";
import DeleteDialog from "@/components/DeleteDialog";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Privilege>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "fullname",
    header: "Full Name",
  },
  {
    accessorKey: "perm",
    header: "Permission",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <DeleteDialog
            id={user.id}
            mutationKey="premission"
            url={`/bank/subject/${user.object_pk}/privilege`}
          />
        </div>
      );
    },
  },
];
