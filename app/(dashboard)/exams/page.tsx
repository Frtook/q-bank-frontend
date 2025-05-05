"use client";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/dataTable";
import SearchInput from "@/components/ui/search";
import ExamDialog from "./_components/createExam/createDialog";

export default function Home() {
  // const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const columns = [
    { accessor: "id", header: "ID" },
    { accessor: "marks", header: "Marks" },
    { accessor: "subject", header: "Subject" },
    { accessor: "academy", header: "Academy" },
    { accessor: "level", header: "Level" },
    { accessor: "periodOfTime", header: "Duration" },
    { accessor: "generation_config", header: "Config" },
    { accessor: "createdAt", header: "Created At" },
  ];

  const data = [
    {
      id: 1,
      marks: 100,
      subject: 1,
      academy: 1,
      level: 10,
      periodOfTime: "90 minutes",
      generation_config: "standard_v1",
      createdAt: "2025-05-01T10:00:00.000Z",
    },
    {
      id: 2,
      marks: 80,
      subject: 2,
      academy: 2,
      level: 9,
      periodOfTime: "60 minutes",
      generation_config: "config_A",
      createdAt: "2025-05-02T11:30:00.000Z",
    },
    {
      id: 3,
      marks: 90,
      subject: 3,
      academy: 1,
      level: 11,
      periodOfTime: "75 minutes",
      generation_config: "config_B",
      createdAt: "2025-05-03T09:45:00.000Z",
    },
    {
      id: 4,
      marks: 100,
      subject: 4,
      academy: 3,
      level: 12,
      periodOfTime: "120 minutes",
      generation_config: "standard_v2",
      createdAt: "2025-05-04T08:20:00.000Z",
    },
    {
      id: 5,
      marks: 70,
      subject: 5,
      academy: 2,
      level: 8,
      periodOfTime: "45 minutes",
      generation_config: "light_mode",
      createdAt: "2025-05-05T07:15:00.000Z",
    },
  ];

  return (
    <div className="mx-1">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="flex h-36 w-full flex-col gap-6 rounded-xl bg-white p-4 shadow-sm dark:bg-[#19191d]">
            <h3 className="text-base font-bold text-[#181D27] dark:text-white">
              Total Exams
            </h3>
            <span className="text-3xl font-bold text-[#181D27] dark:text-white">
              2,420
            </span>
          </div>
          <div className="flex h-36 w-full flex-col gap-6 rounded-xl bg-white p-4 shadow-sm dark:bg-[#19191d]">
            <h3 className="text-base font-bold text-[#181D27] dark:text-white">
              Total Exams
            </h3>
            <span className="text-3xl font-bold text-[#181D27] dark:text-white">
              2,420
            </span>
          </div>
          <div className="flex h-36 w-full flex-col gap-6 rounded-xl bg-white p-4 shadow-sm dark:bg-[#19191d]">
            <h3 className="text-base font-bold text-[#181D27] dark:text-white">
              Total Exams
            </h3>
            <span className="text-3xl font-bold text-[#181D27] dark:text-white">
              2,420
            </span>
          </div>
        </div>

        <div className="flex w-full justify-between rounded-md bg-white p-4 shadow-sm dark:bg-[#19191d]">
          <div className="flex gap-2">
            <SearchInput
              className=""
              placeholder="Search Exam"
            />
            <Button
              className="border border-[#D5D7DA] shadow-sm dark:border-none"
              variant="secondary"
            >
              Filters
            </Button>
          </div>
          <div>
            <ExamDialog />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data}
          // onRowSelectionChange={setSelectedRows}
        />
      </div>
    </div>
  );
}
