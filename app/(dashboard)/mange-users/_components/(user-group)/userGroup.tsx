"use client";
import { DataTable } from "@/components/table/data-table";
import TableSkeleton from "@/components/table/table-skeleton";
import CardIcon from "@/components/card-icon";
import { Users2 } from "lucide-react";
import { useColumns } from "./columns";
import { useGetGroupPermission } from "@/hooks/permission/useGroupPermission";
import AddUserGruopDialog from "./dialogs/addUserGruop";

export default function UserGroup() {
  const { data } = useGetGroupPermission();
  const columns = useColumns();
  console.log(data);
  return (
    <div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <CardIcon
          count={data?.length}
          title="Total of gruop"
          icon={<Users2 />}
        />
      </div>
      {data ? (
        <DataTable
          columns={columns}
          data={data}
          placeholderInput={"Name of Gruop"}
          sortValue="name"
          button={<AddUserGruopDialog />}
        />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
}
