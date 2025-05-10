"use client";
import { useGetSubject } from "@/hooks/subject/useSubject";
import AddSubjectDialog from "./_components/dialogs/AddSubjectDialog";
import { useColumns } from "./_components/columns";
import TableSkeleton from "@/components/table/table-skeleton";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/table/data-table";
import CardIcon from "@/components/card-icon";
import { Book } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Page() {
  const { data } = useGetSubject();
  const router = useRouter();
  const columns = useColumns();
  const t = useTranslations("");
  return (
    <div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <CardIcon
          count={data?.length}
          title={t("homePage.Subjects")}
          icon={<Book />}
        />
      </div>

      {data ? (
        <DataTable
          columns={columns}
          data={data}
          onRowClick={(_, { original }) => {
            router.push(`/subject/${original.id}`);
          }}
          placeholderInput={t("subject.search.subject")}
          sortValue="name"
          button={<AddSubjectDialog />}
        />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
}
