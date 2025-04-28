"use client";
import { ColumnDef } from "@tanstack/react-table";
import DeleteDialog from "@/components/DeleteDialog";
import EditOutcomeDialog from "./dialogs/EditOutCome";

export const columns: ColumnDef<Outcome>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "text",
    header: "Outcome",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const outcome = row.original;

      return (
        <div className="flex items-center gap-3">
          <EditOutcomeDialog
            id={outcome.id}
            subject={outcome.subject}
            text={outcome.text}
          />
          <DeleteDialog
            id={outcome.id}
            mutationKey="outcome"
            url="/bank/outcome"
          />
        </div>
      );
    },
  },
];
