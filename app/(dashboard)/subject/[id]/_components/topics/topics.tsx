import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useGetTopic } from "@/hooks/subject/useTopic";
import { BookA, CircleArrowDownIcon } from "lucide-react";
import AddTopicDialog from "./dialogs/AddTopic";
import { useGetOutcome } from "@/hooks/subject/useOutcome";
import DeleteDialog from "@/components/DeleteDialog";
import EditTopicDialog from "./dialogs/EditTopic";
import { usePathname } from "next/navigation";
import CardIcon from "@/components/card-icon";

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
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <CardIcon
          count={topics?.length}
          title="Totla Topic"
          icon={<BookA />}
        />
      </div>
      <AddTopicDialog />

      {isLoading && (
        <div className="mt-4 animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-lg bg-gray-200 dark:bg-secondary"
            />
          ))}
        </div>
      )}

      <div className="mt-6 space-y-4">
        {topics?.map((topic) => (
          <Collapsible key={topic.id}>
            <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md focus:shadow-xl dark:bg-secondary">
              <div className="space-y-1 text-left">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
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
                <CircleArrowDownIcon className="ml-4 h-6 w-6 text-gray-400 transition-transform group-data-[state=open]:rotate-180" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="mt-3 space-y-3 pl-6">
              {topic.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="rounded-lg bg-indigo-50/50 p-4 transition-colors hover:bg-indigo-100 dark:bg-primary"
                >
                  <p className="text-sm font-medium text-indigo-800 dark:text-white">
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
