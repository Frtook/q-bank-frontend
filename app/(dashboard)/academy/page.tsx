"use client";
import { useGetacademy } from "@/hook/useAcademy";
import AddAcadmy from "./AddAcademy";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Page() {
  const { data } = useGetacademy();

  return (
    <div>
      <div className="flex p-2 justify-between">
        <span className="font-bold">academy</span>
        <AddAcadmy />
      </div>

      {data ? (
        <DataTable columns={columns} data={data} />
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
