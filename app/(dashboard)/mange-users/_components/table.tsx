"use client";
// import { DataTable } from "./data-table";
import { useColumns } from "./columns";
import { useGetMangeUser } from "@/hooks/permission/useMageUsers";
import AddUserDialog from "./dialogs/AddUserDialog";
import { DataTable } from "@/components/table/data-table";
import TableSkeleton from "@/components/table/table-skeleton";
import CardIcon from "@/components/card-icon";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Table() {
  const { data } = useGetMangeUser();
  const columns = useColumns();
  const t = useTranslations("column");
  console.log(data);
  return (
    <div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <CardIcon
          count={data?.length}
          title={t("users")}
          icon={<User />}
        />
      </div>
      {data ? (
        <DataTable
          columns={columns}
          data={data}
          placeholderInput={t("filterName")}
          sortValue="fullname"
          button={<AddUserDialog />}
        />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
}
