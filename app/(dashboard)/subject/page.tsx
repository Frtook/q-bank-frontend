"use client";
import { useGetSubject } from "@/hooks/useSubject";
import AddSubjectDialog from "./_components/dialogs/AddSubjectDialog";
import { useGetacademy } from "@/hooks/useAcademy";
// import { DataTable } from "@/components/table/data-table";
import { getColumns } from "./_components/columns";
import TableSkeleton from "@/components/table/table-skeleton";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/table/data-table";

export default function Page() {
  const { data } = useGetSubject();
  const { data: academies } = useGetacademy();
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between rounded-md bg-white p-2">
        <h1>Subject Page</h1>
        <AddSubjectDialog />
      </div>

      {data && academies ? (
        <DataTable
          columns={getColumns(academies, router)}
          data={data}
          onRowClick={(_, { original }) => {
            router.push(`/subject/${original.id}`);
          }}
          placeholderInput="Search Subject.."
          sortValue="name"
        />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
}
