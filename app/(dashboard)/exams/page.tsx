// app/exams/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/dataTable";
import SearchInput from "@/components/ui/search";
import ExamDialog from "./_components/createExam/createDialog";
import { useGetExams, useDeleteExam } from "@/hooks/subject/useGetExam";
import TableSkeleton from "@/components/table/table-skeleton";
import { useRouter } from "next/navigation";
import { MdTimer } from "react-icons/md";
import { useState } from "react";
import EditExamDialog from "./_components/editExam/editDialog";
import { Exam } from "@/types";
import { useLocale, useTranslations } from "next-intl";

export default function Exams() {
  const t = useTranslations("exams");
  const { data, isLoading } = useGetExams();
  const deleteExam = useDeleteExam();
  const router = useRouter();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const lang = useLocale();

  const handleEdit = (index: number) => {
    const examId = formattedData[index].id as number;
    const examToEdit = data?.find((exam) => exam.id === examId);
    if (examToEdit) {
      setCurrentExam(examToEdit);
      setEditDialogOpen(true);
    }
  };

  const formatDate = (isoDate: string) =>
    new Date(isoDate).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const convertToMinutes = (timeStr: string) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 60 + minutes + Math.floor(seconds / 60);
  };

  const columns = [
    { accessor: "id", header: t("columns.id") },
    { accessor: "name", header: t("columns.name") },
    { accessor: "marks", header: t("columns.marks") },
    { accessor: "level", header: t("columns.level") },
    { accessor: "periodOfTime", header: t("columns.duration") },
    { accessor: "questionCount", header: t("columns.questions") },
    { accessor: "createdAt", header: t("columns.createdAt") },
  ];

  const filteredData = (data ?? []).filter((exam) =>
    exam.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formattedData = filteredData.map((exam) => {
    const level = exam.setting?.level ?? "-";
    let levelClass = "bg-green-100 text-green-800";
    if (level > 7) levelClass = "bg-red-100 text-red-800";
    else if (level > 5) levelClass = "bg-yellow-100 text-yellow-800";

    return {
      id: exam.id,
      name: (
        <span className="font-medium text-gray-900 dark:text-white">
          {exam.name}
        </span>
      ),
      marks: (
        <span className="inline-block rounded-md bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
          {exam.setting?.marks ?? "-"}
        </span>
      ),
      level:
        typeof level === "number" ? (
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${levelClass}`}
          >
            {level}
          </span>
        ) : (
          "-"
        ),
      periodOfTime: (
        <span className="flex w-fit items-center gap-1 rounded-md bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">
          <MdTimer />{" "}
          {exam.setting?.periodOfTime
            ? `${convertToMinutes(exam.setting.periodOfTime)} ${t("minutes")}`
            : "-"}
        </span>
      ),
      questionCount: (
        <span className="inline-block rounded bg-gray-100 px-2 py-1 font-mono text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-200">
          {exam.questions?.length ?? 0}
        </span>
      ),
      createdAt: exam.setting?.createdAt ? (
        <span className="text-xs text-gray-700 dark:text-gray-300">
          {formatDate(exam.setting.createdAt)}
        </span>
      ) : (
        "-"
      ),
    };
  });

  const handleDelete = (index: number) => {
    const examId = formattedData[index].id as number;
    deleteExam.mutate(examId);
  };

  return (
    <div className="mx-1">
      <div className="flex flex-col gap-4">
        {/* Top Stats */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {[
            {
              title: t("stats.totalExams"),
              value: "2,420",
            },
            {
              title: t("stats.activeExams"),
              value: "1,850",
            },
            {
              title: t("stats.upcomingExams"),
              value: "570",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex h-36 w-full flex-col gap-6 rounded-xl bg-white p-4 shadow-sm dark:bg-[#19191d]"
            >
              <h3 className="text-base font-bold text-[#181D27] dark:text-white">
                {stat.title}
              </h3>
              <span className="text-3xl font-bold text-[#181D27] dark:text-white">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex w-full justify-between rounded-md bg-white p-4 shadow-sm dark:bg-[#19191d]">
          <div className="flex gap-2">
            <SearchInput
              placeholder={t("search.placeholder")}
              onSearch={(value) => setSearchTerm(value)}
            />
            <Button
              className="border border-[#D5D7DA] shadow-sm dark:border-none"
              variant="secondary"
            >
              {t("filters")}
            </Button>
          </div>
          <div className="flex gap-3">
            <ExamDialog />
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <DataTable
              columns={columns}
              data={formattedData}
              onRowClick={(row) => router.push(`/exams/${row.id}`)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              deleteDialogTitle={t("deleteDialog.title")}
              deleteDialogDescription={t("deleteDialog.description")}
              direction={lang === "ar" ? "rtl" : "ltr"}
            />
            <EditExamDialog
              open={editDialogOpen}
              onOpenChange={setEditDialogOpen}
              exam={currentExam}
            />
          </>
        )}
      </div>
    </div>
  );
}
