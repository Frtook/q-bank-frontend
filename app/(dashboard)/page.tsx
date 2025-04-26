"use client";

import { Book, CircleHelp, FileText, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("homePage");

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-9">
        <Card
          count={24}
          name={t("Subjects")}
          icon={
            <Book
              className="text-blue-700"
              strokeWidth={2.5}
            />
          }
        />
        <Card
          count={24}
          name={t("NumberOfQuestions")}
          icon={
            <CircleHelp
              className="text-blue-700"
              strokeWidth={2.5}
            />
          }
        />
        <Card
          count={24}
          name={t("Exam")}
          icon={
            <FileText
              className="text-blue-700"
              strokeWidth={2.5}
            />
          }
        />
        <Card
          count={24}
          name={t("Users")}
          icon={
            <Users
              className="text-blue-700"
              strokeWidth={2.5}
            />
          }
        />
        <CardName
          name={t("AddNewQuestion")}
          icon={
            <CircleHelp
              className="text-blue-700"
              strokeWidth={2.5}
            />
          }
          text={t("AddNewQuestionText")}
        />
        <CardName
          name={t("GenerateExam")}
          icon={
            <FileText
              className="text-blue-700"
              strokeWidth={2.5}
            />
          }
          text={t("GenerateExamText")}
        />
      </div>

      <div className="mt-4 rounded-md bg-white p-6">
        <p className="text-3xl font-bold">{t("History")}</p>
      </div>
    </div>
  );
}

type CardProp = {
  name: string;
  icon: React.ReactNode;
  count: number;
};

const Card: React.FC<CardProp> = ({ name, icon, count }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-gray-500">{name}</p>
        <div className="rounded-full bg-gray-100 p-4">{icon}</div>
      </div>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
};

const CardName: React.FC<Omit<CardProp, "count"> & { text: string }> = ({
  name,
  icon,
  text,
}) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-blue-500">{name}</p>
        <div className="rounded-full bg-gray-100 p-4">{icon}</div>
      </div>
      <p className="text-gray-500">{text}</p>
    </div>
  );
};
