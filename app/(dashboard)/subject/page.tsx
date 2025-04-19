"use client";
import { DataTable } from "./data-table";
import { useGetSubject } from "@/hook/useSubject";
import { getColumns } from "./columns";
import AddSubjectDialog from "./AddSubjectDialog";
import { useGetacademy } from "@/hook/useAcademy";

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
        />
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
