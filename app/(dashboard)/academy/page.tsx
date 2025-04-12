"use client";
import { useGetacademy } from "@/hook/useAcademy";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import AddAcademyDialog from "./AddAcademyDialog";

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
          columns={columns}
          data={data}
        />
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
