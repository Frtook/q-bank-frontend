"use client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useGetMangeUser } from "@/hook/useMageUsers";
import { toast } from "sonner";
import AddUserDialog from "./AddUserDialog";
import { useGetPermission } from "@/hook/usePermission";

export default function Page() {
  const { data, error, isError, isLoading } = useGetMangeUser();
  const { data: per } = useGetPermission();
  console.log(per);
  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    toast.error(error.message);
  }
  return (
    <div>
      <div className="flex justify-between">
        <h1>All Users</h1>
        <AddUserDialog />
      </div>
      {data && (
        <DataTable
          columns={columns}
          data={data}
        />
      )}
    </div>
  );
}
