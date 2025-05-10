"use client";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ArrowUpDown, Images } from "lucide-react";
import { Button } from "@/components/ui/button";

import EditAcademyDialog from "./dialogs/EditAcademyDialog";
import DeleteDialog from "@/components/DeleteDialog";
import { useLocale, useTranslations } from "next-intl";

export const useColumns = (): ColumnDef<IAcademy>[] => {
  const t = useTranslations("column");
  const locale = useLocale();
  return [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            dir={locale === "en" ? "ltr" : "rtl"}
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("Academy")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "active",
      header: t("Active"),
      cell: ({ row }) => {
        const active = row.getValue("active");
        return (
          <Badge variant={active ? "default" : "destructive"}>
            {active ? t("Active") : t("unactive")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "logo",
      header: t("Logo"),
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
};
