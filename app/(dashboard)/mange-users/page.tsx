"use client";
// import { DataTable } from "./data-table";
import { columns } from "./_components/columns";
import { useGetMangeUser } from "@/hooks/useMageUsers";
import { toast } from "sonner";
import AddUserDialog from "./_components/dialogs/AddUserDialog";
import { DataTable } from "@/components/table/data-table";
import TableSkeleton from "@/components/table/table-skeleton";

export default function Page() {
  const { data, error, isError, isLoading } = useGetMangeUser();
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
      {data ? (
        <DataTable
          columns={columns}
          data={data}
          placeholderInput="Filter name..."
          sortValue="fullname"
        />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
}
