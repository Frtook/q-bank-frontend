"use client";
// import { DataTable } from "./data-table";
import { columns } from "./_components/columns";
import { useGetMangeUser } from "@/hooks/useMageUsers";
import AddUserDialog from "./_components/dialogs/AddUserDialog";
import { DataTable } from "@/components/table/data-table";
import TableSkeleton from "@/components/table/table-skeleton";
import CardIcon from "@/components/card-icon";
import { User } from "lucide-react";

export default function Page() {
  const { data } = useGetMangeUser();

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <CardIcon
          count={data?.length}
          title="Totla Users"
          icon={<User />}
        />
      </div>
      {data ? (
        <DataTable
          columns={columns}
          data={data}
          placeholderInput="Filter name..."
          sortValue="fullname"
          button={<AddUserDialog />}
        />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
}
