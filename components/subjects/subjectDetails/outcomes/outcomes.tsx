"use client";
import AddOutcomeDialog from "./dialogs/AddOutCome";
import { columns } from "./columns";
import { useGetOutcome } from "@/hooks/useOutcome";
import { DataTable } from "@/components/table/data-table";
import TableSkeleton from "@/components/table/table-skeleton";

const Outcomes = ({}: any) => {
  const { data } = useGetOutcome();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between rounded-md bg-white p-2">
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
