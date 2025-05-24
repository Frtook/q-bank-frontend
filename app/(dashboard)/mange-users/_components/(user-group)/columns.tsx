"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/DeleteDialog";
import { useTranslations } from "next-intl";
import { UserGroupPermission } from "@/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
export const useColumns = (): ColumnDef<
  UserGroupPermission,
  "permissions"
>[] => {
  const t = useTranslations("column");
  return [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name of Group
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "academy_name",
      header: t("Academy"),
    },
    {
      accessorKey: "permissions",
      header: "Permission",
      cell: ({ row }) => {
        return (
          <HoverCard>
            <HoverCardTrigger className="cursor-context-menu">
              Hover
            </HoverCardTrigger>
            <HoverCardContent className="space-y-4">
              {row.original.permissions.map((perm) => {
                return <div key={perm.id}>{perm.name}</div>;
              })}
            </HoverCardContent>
          </HoverCard>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3">
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
