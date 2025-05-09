"use client";
import React, { useEffect, useState } from "react";
import AddQuestionDialog from "./dialogs/AddQuestion";
import { useGetQuestion } from "@/hooks/subject/useQuestion";
import QuestionList from "./QuestionList";
import CardIcon from "@/components/card-icon";
import { MailQuestion, ShieldCheck, ShieldX } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-selector";

export default function Questions() {
  const { data, isLoading } = useGetQuestion();
  const [filter, setFilter] = useState<string[]>([]);
  useEffect(() => {
    console.log(filter);
  }, [filter]);
  const options = [
    { value: "test1", label: "test1" },
    { value: "test2", label: "test2" },
    { value: "test3", label: "test3" },
    { value: "test4", label: "test4" },
  ];
  return (
    <div>
      <div className="mb-5 grid grid-cols-1 gap-3 lg:grid-cols-3">
        <CardIcon
          count={data?.length}
          title="Totla Questions"
          icon={<MailQuestion />}
        />
        <CardIcon
          count={data?.filter((questions) => questions.setting.active).length}
          title="Active Questions"
          icon={<ShieldCheck className="text-green-700" />}
        />
        <CardIcon
          count={data?.filter((questions) => !questions.setting.active).length}
          title="Inctive Questions"
          icon={<ShieldX className="text-red-700" />}
        />
      </div>

      <div className="flex gap-5 rounded-xl bg-white p-6 dark:bg-secondary">
        <MultiSelect
          className="border-2"
          onValueChange={(value) => setFilter(value)}
          options={options}
          placeholder="Filter Question"
        />
        <AddQuestionDialog />
      </div>
      {isLoading && (
        <div className="mt-5 animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-lg bg-gray-200 dark:bg-secondary"
            />
          ))}
        </div>
      )}
      {data?.length === 0 && <p className="mt-10 text-center">No Qusetion</p>}
      {data && <QuestionList questions={data} />}
    </div>
  );
}
