"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, RotateCwSquare } from "lucide-react";
import DeleteDialog from "@/components/DeleteDialog";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
export const useColumns = (): ColumnDef<Question>[] => {
  const router = useRouter();
  const t = useTranslations("");
  const pathName = usePathname();

  const getTypeQuestion = (type: number) => {
    switch (type) {
      case 1:
        return t("subject.questions.multiChoice");
      case 2:
        return t("subject.questions.trueFalse");
      case 3:
        return t("subject.questions.shortAnswer");
    }
  };
  return [
    {
      accessorKey: "id",
      header: t("column.id"),
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "text",
      header: ({ column }) => (
        <div
          className="flex cursor-pointer gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("column.question")}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      ),
    },
    {
      accessorKey: "setting.acive",
      header: t("column.status"),
      cell: ({ row }) => {
        const active = row.original.setting.active;
        return (
          <Badge variant={active ? "default" : "destructive"}>
            {active ? t("column.Active") : t("column.unactive")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "setting.type",
      header: t("column.typeQuestion"),
      cell: ({ row }) => getTypeQuestion(row.original.setting.type),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const question = row.original;
        return (
          <div className="flex items-center gap-3">
            <RotateCwSquare
              onClick={() => router.push(`${pathName}/${question.id}`)}
              className="cursor-pointer"
            />
            {/* <EditSubjectDialog
              academy={subject.academy}
              name={subject.name}
              id={subject.id}
            /> */}
            <DeleteDialog
              mutationKey="subject"
              url="/bank/subject"
              id={question.id}
            />
          </div>
        );
      },
    },
  ];
};
