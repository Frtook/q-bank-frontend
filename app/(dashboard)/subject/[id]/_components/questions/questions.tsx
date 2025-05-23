"use client";
import AddQuestionDialog from "./dialogs/AddQuestion";
import { useGetQuestion } from "@/hooks/subject/useQuestion";
import CardIcon from "@/components/card-icon";
import { MailQuestion, ShieldCheck, ShieldX } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-selector";
import { useTranslations } from "next-intl";
import { DataTable } from "@/components/table/data-table";
import TableSkeleton from "@/components/table/table-skeleton";
import { useColumns } from "./columns";
import { useGetTopic } from "@/hooks/subject/useTopic";
import { usePathname, useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetOutcome } from "@/hooks/subject/useOutcome";
import { useEffect, useState } from "react";

export default function Questions() {
  const t = useTranslations("subject");
  const subjectID = usePathname().split("/")[2];
  const router = useRouter();
  const pathname = usePathname();
  const columns = useColumns();
  const { data: topic } = useGetTopic({ subjec: subjectID });
  const { data: outcome } = useGetOutcome({ subjec: subjectID });
  const [topics, settopics] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [outcomes, setOutcome] = useState<string[]>([]);
  const [active, setActive] = useState(true);
  const { data } = useGetQuestion({
    level: levels.join(","),
    outcome: outcomes.join(","),
    topic: topics.join(","),
    active: active,
    subject: subjectID,
  });
  useEffect(() => {
    console.log(outcomes);
  }, [outcomes]);
  return (
    <div>
      <div className="mb-5 grid grid-cols-1 gap-3 lg:grid-cols-3">
        <CardIcon
          count={data?.length}
          title={t("questions.totalQuestions")}
          icon={<MailQuestion />}
        />
        <CardIcon
          count={data?.filter((questions) => questions.setting.active).length}
          title={t("questions.activeQuestions")}
          icon={<ShieldCheck className="text-green-700" />}
        />
        <CardIcon
          count={data?.filter((questions) => !questions.setting.active).length}
          title={t("questions.inactiveQuestions")}
          icon={<ShieldX className="text-red-700" />}
        />
      </div>

      <div className="flex justify-between gap-5 rounded-xl bg-white p-6 dark:bg-secondary">
        <div className="flex flex-1 gap-5">
          <MultiSelect
            className="border-2"
            onValueChange={(value) => {
              settopics(value);
            }}
            options={
              topic?.map((t) => ({
                value: String(t.id),
                label: t.name,
              })) || []
            }
            placeholder="Select Topic"
          />
          <MultiSelect
            className="border-2"
            onValueChange={(value) => {
              setOutcome(value);
            }}
            options={
              outcome?.map((outcome) => ({
                value: String(outcome.id),
                label: outcome.text,
              })) || []
            }
            placeholder="Select Outcome"
          />
          <MultiSelect
            className="border-2"
            onValueChange={(value) => {
              setLevels(value);
            }}
            options={[...Array(10)].map((_, index) => ({
              value: String(index + 1),
              label: String(index + 1),
            }))}
            placeholder="Select Level"
          />
          <div className="flex w-full items-center space-x-2">
            <Checkbox
              checked={active}
              onCheckedChange={() => setActive(!active)}
              id="terms"
            />
            <label
              htmlFor="terms"
              className="select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              is Active
            </label>
          </div>
        </div>
        <AddQuestionDialog />
      </div>

      {data ? (
        <DataTable
          data={data}
          columns={columns}
          placeholderInput="Search by name"
          sortValue="text"
          onRowClick={(_, { original }) => {
            router.push(`${pathname}/${original.id}`);
          }}
        />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
}
