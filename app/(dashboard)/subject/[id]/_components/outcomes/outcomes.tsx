"use client";
import AddOutcomeDialog from "./dialogs/AddOutCome";
import { columns } from "./columns";
import { useGetOutcome } from "@/hooks/useOutcome";
import { DataTable } from "@/components/table/data-table";
import TableSkeleton from "@/components/table/table-skeleton";
import { usePathname } from "next/navigation";

const Outcomes = () => {
  const subjectID = usePathname().split("/")[2];
  const { data } = useGetOutcome({ subjec: subjectID });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between rounded-md bg-white p-2">
        <h1 className="text-2xl font-bold">Outcome Page</h1>
        <AddOutcomeDialog />
      </div>
      {data ? (
        <DataTable
          placeholderInput="Search Outcome.."
          sortValue="text"
          columns={columns}
          data={data}
        />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
};

export default Outcomes;
