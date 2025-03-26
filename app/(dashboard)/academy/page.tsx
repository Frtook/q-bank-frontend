"use client";
import { useGetacademy } from "@/hook/useAcademy";
import AcademyDialog from "./AcademyDialog";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Page() {
  const { data } = useGetacademy();

  return (
    <div>
      <div className="flex justify-between p-2">
        <span className="font-bold">academy</span>
        <AcademyDialog id={0} isUpdate={false} active={false} name="" />
      </div>

      {data ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
