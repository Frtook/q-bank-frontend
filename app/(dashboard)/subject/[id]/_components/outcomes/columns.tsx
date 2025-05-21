"use client";
import { ColumnDef } from "@tanstack/react-table";
import DeleteDialog from "@/components/DeleteDialog";
import EditOutcomeDialog from "./dialogs/EditOutCome";
import { useTranslations } from "next-intl";
import { Outcome } from "@/types";

export const useColumns = (): ColumnDef<Outcome>[] => {
  const t = useTranslations("column");
  return [
    {
      accessorKey: "id",
      header: t("id"),
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "text",
      header: t("Outcome"),
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
};
