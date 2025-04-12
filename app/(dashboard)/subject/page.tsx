"use client";
import { DataTable } from "./data-table";
import { useGetSubject } from "@/hook/useSubject";
import { columns } from "./columns";
import AddSubjectDialog from "./AddSubjectDialog";

export default function Page() {
  const { data } = useGetSubject();
  return (
    <div>
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
