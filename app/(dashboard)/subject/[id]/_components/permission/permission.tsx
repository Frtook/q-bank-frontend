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
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={privilege || []}
          sortValue="fullname"
          placeholderInput="Search by name "
          button={<AddPermissionDialog />}
        />
      )}
    </div>
  );
}
