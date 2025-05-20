"use client";

import CardIcon from "@/components/card-icon";
import { useGetCountState } from "@/hooks/useCountState";
import { useGetHistory } from "@/hooks/useHistory";
import { Book, CircleHelp, FileText, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import ActivityCard from "./ActivityCard";

export default function Home() {
  const t = useTranslations("homePage");
  const { data: countState } = useGetCountState();
  const { data: history, isLoading } = useGetHistory();

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:gap-9">
        <CardIcon
          count={countState?.subject_count}
          title={t("Subjects")}
          icon={
            <Book
              className="text-blue-700"
              strokeWidth={2.5}
            />
          }
        />
        <CardIcon
          count={countState?.question_count}
          title={t("NumberOfQuestions")}
          icon={
            <CircleHelp
              className="text-blue-700"
              strokeWidth={2.5}
            />
          }
        />
        <CardIcon
          count={countState?.exam_count}
          title={t("Exam")}
          icon={
            <FileText
              className="text-blue-700"
              strokeWidth={2.5}
            />
          }
        />
        <CardIcon
          count={countState?.user_count}
          title={t("Users")}
          icon={
            <Users
              className="text-blue-700"
              strokeWidth={2.5}
            />
          }
        />
        <CardIcon
          count={countState?.academy_count}
          title={t("Academy")}
          icon={
            <Users
              className="text-blue-700"
              strokeWidth={2.5}
            />
          }
        />
        <CardIcon
          count={countState?.topic_count}
          title={t("Topic")}
          icon={
            <Users
              className="text-blue-700"
              strokeWidth={2.5}
            />
          }
        />
      </div>

      <div className="mt-4 rounded-md bg-white p-6 shadow-xl dark:bg-primary">
        <p className="text-3xl font-bold">{t("History")}</p>
        <ActivityCard
          data={history}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
