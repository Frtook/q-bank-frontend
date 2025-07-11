"use client";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, RotateCwSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/DeleteDialog";
import { useTranslations } from "next-intl";
import { MangeUsers } from "@/types";
import { useRouter } from "next/navigation";

export const useColumns = (): ColumnDef<MangeUsers>[] => {
  const t = useTranslations("column");
  const router = useRouter();
  return [
    {
      accessorKey: "fullname",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("fullName")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "email",
      header: t("email"),
    },
    {
      accessorKey: "is_active",
      header: t("Active"),
      cell: ({ row }) => {
        const active = row.getValue("is_active");
        return (
          <Badge variant={active ? "default" : "destructive"}>
            {active ? t("Active") : t("unactive")}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3">
            <RotateCwSquare
              onClick={() => router.push(`/mange-users/${user.id}`)}
              className="cursor-pointer"
            />
            <DeleteDialog
              id={user.id}
              url="/manage/user"
              mutationKey="mange-user"
            />
          </div>
        );
      },
    },
  ];
};
