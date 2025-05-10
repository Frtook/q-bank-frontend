"use client";

import { useGetPrivilege } from "@/hooks/usePrivilege";
import AddPermissionDialog from "./dialogs/AddPermission";
import { usePathname } from "next/navigation";
import { DataTable } from "@/components/table/data-table";
import { useColumns } from "./columns";
import TableSkeleton from "@/components/table/table-skeleton";
import { useTranslations } from "next-intl";

export default function Permission() {
  const subjectID = usePathname().split("/")[2];
  const t = useTranslations("subject.search");
  const column = useColumns();
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
          columns={column}
          data={privilege || []}
          sortValue="fullname"
          placeholderInput={t("permission")}
          button={<AddPermissionDialog />}
        />
      )}
    </div>
  );
}
