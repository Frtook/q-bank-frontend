"use client";
import { useGetacademy } from "@/hooks/useAcademy";
import { useColumns } from "./_components/columns";
import AddAcademyDialog from "./_components/dialogs/AddAcademyDialog";
import { DataTable } from "@/components/table/data-table";
import TableSkeleton from "@/components/table/table-skeleton";
import CardIcon from "@/components/card-icon";
import { School, ShieldCheck, ShieldX } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Page() {
  const { data } = useGetacademy();
  const t = useTranslations("academy");
  const columns = useColumns();

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <CardIcon
          count={data?.length}
          title={t("totalAcademies")}
          icon={<School />}
        />
        <CardIcon
          count={data?.filter((acadmey) => acadmey.active).length}
          title={t("activeAcademies")}
          icon={<ShieldCheck className="text-green-700" />}
        />
        <CardIcon
          count={data?.filter((acadmey) => !acadmey.active).length}
          title={t("inactiveAcademies")}
          icon={<ShieldX className="text-red-700" />}
        />
      </div>

      {data ? (
        <DataTable
          placeholderInput={t("search.filterAcademy")}
          sortValue="name"
          columns={columns}
          data={data}
          button={<AddAcademyDialog />}
        />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
}
