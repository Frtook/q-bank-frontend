"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useGetTopic } from "@/hooks/useTopic";
import { ChevronsUpDown } from "lucide-react";
import AddTopicDialog from "./dialogs/AddTopic";
import { useGetOutcome } from "@/hooks/useOutcome";
import DeleteDialog from "@/components/DeleteDialog";
import EditTopicDialog from "./dialogs/EditTopic";
import { usePathname } from "next/navigation";

const Topics = () => {
  const subjectID = usePathname().split("/")[2];
  const { data: topics, isLoading } = useGetTopic({
    subjec: subjectID,
  });
  const { data: outcomes } = useGetOutcome({
    subjec: subjectID,
  });

  return (
    <div className="mx-4">
      <div className="mb-8 flex items-center justify-between rounded-xl bg-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Course Topics</h1>
        <AddTopicDialog />
      </div>

      {isLoading && (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-lg bg-gray-200"
            />
          ))}
        </div>
      )}

      <div className="space-y-4">
        {topics?.map((topic) => (
          <Collapsible key={topic.id}>
            <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <div className="space-y-1 text-left">
                <h3 className="text-xl font-semibold text-gray-900">
                  {topic.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {topic.outcomes.length} learning outcomes
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <EditTopicDialog
                    name={topic.name}
                    outcomes={topic.outcomes}
                    id={topic.id}
                  />
                  <DeleteDialog
                    id={topic.id}
                    url="/bank/topic"
                    mutationKey="topic"
                  />
                </div>
                <ChevronsUpDown className="ml-4 h-6 w-6 text-gray-400 transition-transform group-data-[state=open]:rotate-180" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="mt-3 space-y-3 pl-6">
              {topic.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="rounded-lg bg-indigo-50/50 p-4 transition-colors hover:bg-indigo-100"
                >
                  <p className="text-sm font-medium text-indigo-800">
                    {outcomes?.find((out) => out.id === outcome)?.text}
                  </p>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default Topics;
