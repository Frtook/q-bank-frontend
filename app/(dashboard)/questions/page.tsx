"use client"
import { Button } from "@/components/ui/button";
import TooltipDemo from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
import DataTable from "@/components/ui/dataTable";
import SearchInput from "@/components/ui/search";
import { useState } from "react";

export default function Home() {
  const t = useTranslations("HomePage");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const columns = [
    { accessor: "id", header: "ID" },
    { accessor: "question", header: "Question" },
    { accessor: "teacher", header: "Teacher" },
    { accessor: "subject", header: "Subject" },
    { accessor: "difficulty", header: "Difficulty" },
    { accessor: "date_added", header: "Date Added" },
  ];

  const data = [
    {
      id: 1,
      question: "What is the capital of France?",
      teacher: "Mr. Johnson",
      subject: "Geography",
      difficulty: "Easy",
      date_added: "2024-03-01",
    },
    {
      id: 2,
      question: "Solve: 5x + 3 = 18",
      teacher: "Ms. Smith",
      subject: "Mathematics",
      difficulty: "Medium",
      date_added: "2024-03-05",
    },
    {
      id: 3,
      question: "Who wrote 'Hamlet'?",
      teacher: "Dr. Anderson",
      subject: "Literature",
      difficulty: "Hard",
      date_added: "2024-03-10",
    },
    {
      id: 4,
      question: "What is the powerhouse of the cell?",
      teacher: "Mrs. Brown",
      subject: "Biology",
      difficulty: "Easy",
      date_added: "2024-03-15",
    },
    {
      id: 5,
      question: "Explain Newton's Third Law of Motion.",
      teacher: "Mr. Williams",
      subject: "Physics",
      difficulty: "Medium",
      date_added: "2024-03-20",
    },
    {
      id: 6,
      question: "What year did World War II end?",
      teacher: "Ms. Davis",
      subject: "History",
      difficulty: "Hard",
      date_added: "2024-03-25",
    },
    {
      id: 5,
      question: "Explain Newton's Third Law of Motion.",
      teacher: "Mr. Williams",
      subject: "Physics",
      difficulty: "Medium",
      date_added: "2024-03-20",
    },
    {
      id: 6,
      question: "What year did World War II end?",
      teacher: "Ms. Davis",
      subject: "History",
      difficulty: "Hard",
      date_added: "2024-03-25",
    },
    {
      id: 5,
      question: "Explain Newton's Third Law of Motion.",
      teacher: "Mr. Williams",
      subject: "Physics",
      difficulty: "Medium",
      date_added: "2024-03-20",
    },
    {
      id: 6,
      question: "What year did World War II end?",
      teacher: "Ms. Davis",
      subject: "History",
      difficulty: "Hard",
      date_added: "2024-03-25",
    },
  ];

  const exportSelectedRows = () => {
    const selectedData = selectedRows.map((index) => data[index]);
    const blob = new Blob([JSON.stringify(selectedData, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "selected_rows.json";
    link.click();
  };

  return (
    <div className="mx-1">
      <div className=" flex flex-col gap-4">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
          <div className="bg-white dark:bg-[#19191d] w-full h-36 shadow-sm rounded-xl flex flex-col p-4 gap-6">
              <h3 className="text-base font-bold text-[#181D27] dark:text-white">Total Questions</h3>
                <span className="text-3xl font-bold text-[#181D27] dark:text-white">
                2,420
              </span>
          </div>
          <div className="bg-white dark:bg-[#19191d] w-full h-36 shadow-sm rounded-xl flex flex-col p-4 gap-6">
              <h3 className="text-base font-bold text-[#181D27] dark:text-white">Total Questions</h3>
                <span className="text-3xl font-bold text-[#181D27] dark:text-white">
                2,420
              </span>
          </div>
          <div className="bg-white dark:bg-[#19191d] w-full h-36 shadow-sm rounded-xl flex flex-col p-4 gap-6">
              <h3 className="text-base font-bold text-[#181D27] dark:text-white">Total Questions</h3>
                <span className="text-3xl font-bold text-[#181D27] dark:text-white">
                2,420
              </span>
          </div>

        </div>

        <div className="bg-white dark:bg-[#19191d]  w-full flex justify-between shadow-sm p-4 rounded-md ">
          <div className="flex gap-2">
            <SearchInput className="" placeholder="Search Questions" />
            <Button className="border border-[#D5D7DA] dark:border-none shadow-sm" variant="secondary">Filters</Button>
            <Button
              className="border border-[#D5D7DA] dark:border-none shadow-sm"
              variant="secondary"
              onClick={exportSelectedRows}
              disabled={selectedRows.length === 0}
            >
              Export
            </Button>
          </div>
          <div>
            <Button variant="default">+ New Question</Button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data}
          onRowSelectionChange={setSelectedRows}
        />
      </div>
    </div>
  );
}