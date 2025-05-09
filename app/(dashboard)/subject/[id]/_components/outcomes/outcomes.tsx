"use client";
import AddOutcomeDialog from "./dialogs/AddOutCome";
import { columns } from "./columns";
import { useGetOutcome } from "@/hooks/subject/useOutcome";
import { DataTable } from "@/components/table/data-table";
import TableSkeleton from "@/components/table/table-skeleton";
import { usePathname } from "next/navigation";
import CardIcon from "@/components/card-icon";
import { BookA } from "lucide-react";

const Outcomes = () => {
  const subjectID = usePathname().split("/")[2];
  const { data } = useGetOutcome({ subjec: subjectID });

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <CardIcon
          count={data?.length}
          title="Totla Outcoem"
          icon={<BookA />}
        />
      </div>

      {data ? (
        <DataTable
          placeholderInput="Search Outcome.."
          sortValue="text"
          columns={columns}
          data={data}
          button={<AddOutcomeDialog />}
        />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
};

export default Outcomes;
