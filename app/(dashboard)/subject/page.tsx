"use client";
import { useGetSubject } from "@/hooks/useSubject";
import AddSubjectDialog from "./_components/dialogs/AddSubjectDialog";
import { useGetacademy } from "@/hooks/useAcademy";
import { getColumns } from "./_components/columns";
import TableSkeleton from "@/components/table/table-skeleton";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/table/data-table";
import CardIcon from "@/components/card-icon";
import { Book } from "lucide-react";

export default function Page() {
  const { data } = useGetSubject();
  const { data: academies } = useGetacademy();
  const router = useRouter();

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <CardIcon
          count={data?.length}
          title="Totla Subjects"
          icon={<Book />}
        />
        {/* <CardIcon
          count={data?.filter((acadmey) => acadmey.active).length}
          title="Active Academies"
          icon={<ShieldCheck className="text-green-700" />}
        />
        <CardIcon
          count={data?.filter((acadmey) => !acadmey.active).length}
          title="Inctive Academies"
          icon={<ShieldX className="text-red-700" />}
        /> */}
      </div>

      {data && academies ? (
        <DataTable
          columns={getColumns(academies, router)}
          data={data}
          onRowClick={(_, { original }) => {
            router.push(`/subject/${original.id}`);
          }}
          placeholderInput="Search Subject.."
          sortValue="name"
          button={<AddSubjectDialog />}
        />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
}
