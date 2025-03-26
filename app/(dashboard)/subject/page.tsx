"use client";
import { DataTable } from "./data-table";
import { useGetSubject } from "@/hook/useSubject";
import { columns } from "./columns";
import AddSubjectDialog from "./AddSubjectDialog";

export default function Page() {
  const { data } = useGetSubject();
  return (
    <div className="m-2 block h-1 w-4 p-4">
      <div className="flex justify-between">
        <h1>All Subject</h1>
        <AddSubjectDialog />
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
