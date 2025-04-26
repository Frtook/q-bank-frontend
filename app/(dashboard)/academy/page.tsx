"use client";
import { useGetacademy } from "@/hooks/useAcademy";
import { columns } from "./_components/columns";
import AddAcademyDialog from "./_components/dialogs/AddAcademyDialog";
import { DataTable } from "@/components/table/data-table";
import TableSkeleton from "@/components/table/table-skeleton";

export default function Page() {
  const { data } = useGetacademy();

  return (
    <div>
      <div className="flex justify-between rounded-md bg-white p-4">
        <span className="font-bold">Academy Page</span>
        <AddAcademyDialog />
      </div>

      {data ? (
        <DataTable
          placeholderInput="Filter name..."
          sortValue="name"
          columns={columns}
          data={data}
        />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
}
