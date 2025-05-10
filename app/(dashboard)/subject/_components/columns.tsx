"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, RotateCwSquare } from "lucide-react";
import { getSubjectName } from "@/lib/helperClient";
import EditSubjectDialog from "./dialogs/EditSubjectDialog";
import DeleteDialog from "@/components/DeleteDialog";
import { useRouter } from "next/navigation";
import { useGetacademy } from "@/hooks/useAcademy";
import { useTranslations } from "next-intl";
export const useColumns = (): ColumnDef<ISubject>[] => {
  const router = useRouter();
  const { data: academies } = useGetacademy();
  const t = useTranslations("column");
  return [
    {
      accessorKey: "id",
      header: t("id"), // Translated "ID"
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div
          className="flex cursor-pointer gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("subject")}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
    },
    {
      accessorKey: "academy",
      header: () => t("Academy"), // Translated "Academy"
      cell: ({ row }) => {
        return getSubjectName(row.original.academy, academies || []);
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const subject = row.original;
        return (
          <div className="flex items-center gap-3">
            <RotateCwSquare
              onClick={() => router.push(`/subject/${subject.id}`)}
              className="cursor-pointer"
            />
            <EditSubjectDialog
              academy={subject.academy}
              name={subject.name}
              id={subject.id}
            />
            <DeleteDialog
              mutationKey="subject"
              url="/bank/subject"
              id={subject.id}
            />
          </div>
        );
      },
    },
  ];
};
