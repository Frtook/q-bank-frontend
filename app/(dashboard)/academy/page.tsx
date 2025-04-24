"use client";
import { useGetacademy } from "@/hooks/useAcademy";
import { columns } from "./_components/columns";
import AddAcademyDialog from "./_components/dialogs/AddAcademyDialog";
import { DataTable } from "@/components/table/data-table";

export default function Page() {
  const { data } = useGetacademy();

  return (
    <div>
      <div className="flex justify-between p-2">
        <span className="font-bold">academy</span>
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
        <div>loading...</div>
      )}
    </div>
  );
}
