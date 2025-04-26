"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, RotateCwSquare } from "lucide-react";
import { getSubjectName } from "@/lib/helper";
import EditSubjectDialog from "./dialogs/EditSubjectDialog";
import DeleteDialog from "@/components/DeleteDialog";
import { useRouter } from "next/navigation";
export const getColumns = (
  academies: IAcademy[],
  router: ReturnType<typeof useRouter>
): ColumnDef<ISubject>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div
        className="flex cursor-pointer gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Subject
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: "academy",
    header: () => "Academy",
    cell: ({ row }) => {
      return getSubjectName(row.original.academy, academies);
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
