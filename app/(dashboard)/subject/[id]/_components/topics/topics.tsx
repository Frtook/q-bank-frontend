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

  const { data: topics, isLoading: isLoadingTopic } = useGetTopic({
    subjec: subjectID,
  });
  const { data: outcomes } = useGetOutcome({
    subjec: subjectID,
  });

  return (
    <div className="mx-1">
      <div className="mb-8 flex items-center justify-between rounded-md bg-white p-2">
        <p className="text-2xl font-bold">Topic Page</p>
        <AddTopicDialog />
      </div>
      {isLoadingTopic && "loading..."}
      <div className="flex flex-col gap-5">
        {topics?.map((topic) => (
          <Collapsible key={topic.id}>
            <CollapsibleTrigger className="flex w-full justify-between rounded-md bg-white p-4">
              <p className="text-xl font-bold">{topic.name}</p>
              <div className="flex gap-2">
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
                <ChevronsUpDown className="ml-10" />
              </div>
            </CollapsibleTrigger>
            <div className="mt-4 space-y-5 pl-10">
              {topic.outcomes.map((outcome) => (
                <CollapsibleContent key={outcome}>
                  {outcomes?.find((out) => out.id === outcome)?.text}
                </CollapsibleContent>
              ))}
            </div>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default Topics;
