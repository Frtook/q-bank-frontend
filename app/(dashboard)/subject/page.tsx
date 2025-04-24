"use client";
import { useGetSubject } from "@/hooks/useSubject";
import AddSubjectDialog from "./_components/dialogs/AddSubjectDialog";
import { useGetacademy } from "@/hooks/useAcademy";
import { DataTable } from "@/components/table/data-table";
import { getColumns } from "./_components/columns";

export default function Page() {
  const { data } = useGetSubject();
  const { data: academies } = useGetacademy();
  return (
    <div>
      <div className="flex justify-between">
        <h1>All Subject</h1>
        <AddSubjectDialog />
      </div>
      {data && academies ? (
        <DataTable
          columns={getColumns(academies)}
          data={data}
          placeholderInput="Filter name..."
          sortValue="name"
        />
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
