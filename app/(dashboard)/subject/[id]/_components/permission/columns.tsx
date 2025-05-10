"use client";
import DeleteDialog from "@/components/DeleteDialog";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

export const useColumns = (): ColumnDef<Privilege>[] => {
  const t = useTranslations("column");

  return [
    {
      accessorKey: "id",
      header: t("id"),
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "fullname",
      header: t("fullName"),
    },
    {
      accessorKey: "perm",
      header: t("Permission"),
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
};
