"use client";

import { useGetPrivilege } from "@/hooks/usePrivilege";
import AddPermissionDialog from "./dialogs/AddPermission";
import { usePathname } from "next/navigation";
import { DataTable } from "@/components/table/data-table";
import { columns } from "./columns";
import TableSkeleton from "@/components/table/table-skeleton";

export default function Permission() {
  const subjectID = usePathname().split("/")[2];

  const { data: privilege, isLoading } = useGetPrivilege({
    id: subjectID,
    type: "subject",
  });
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Permission</h1>
        <AddPermissionDialog />
      </div>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={privilege || []}
          sortValue="fullname"
          placeholderInput="Search by name "
        />
      )}
    </div>
  );
}
