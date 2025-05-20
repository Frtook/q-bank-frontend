"use client";

import DeleteDialog from "@/components/DeleteDialog";
import { useGetOneQuestion } from "@/hooks/subject/useQuestion";
import { useTranslations } from "next-intl";
import { use } from "react";
import EditQuestionDialog from "../_components/questions/dialogs/EditQuestion";
import {
  Beaker,
  Check,
  Lightbulb,
  X,
  ClipboardList,
  ShieldCheck,
  HelpCircle,
  ArrowUp,
} from "lucide-react";
import Image from "next/image";

export default function Page({
  params,
}: {
  params: Promise<{
    question: string;
  }>;
}) {
  const { question: qustionID } = use(params);
  const { data: question, isLoading } = useGetOneQuestion(qustionID);
  const t = useTranslations("subject");

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const getTypeQuestion = (type: number) => {
    switch (type) {
      case 1:
        return {
          label: t("questions.multiChoice"),
          icon: ClipboardList,
          color: "bg-blue-100 text-blue-800",
        };
      case 2:
        return {
          label: t("questions.trueFalse"),
          icon: ShieldCheck,
          color: "bg-purple-100 text-purple-800",
        };
      case 3:
        return {
          label: t("questions.shortAnswer"),
          icon: HelpCircle,
          color: "bg-orange-100 text-orange-800",
        };
      default:
        return {
          label: t("questions.unknown"),
          icon: Beaker,
          color: "bg-gray-100 text-gray-800",
        };
    }
  };

  if (question) {
    const typeDetails = getTypeQuestion(question.setting.type);
    const TypeIcon = typeDetails.icon;
    return (
      <div
        key={question.id}
        className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800"
      >
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {question.text}
            </h3>
            <div className="flex gap-3">
              <EditQuestionDialog question={question} />
              <DeleteDialog
                id={question.id}
                mutationKey="question"
                url="/bank/question"
              />
            </div>
          </div>

          {question.hint && (
            <div className="mb-4 flex items-start rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900">
              <Lightbulb className="mr-2 h-5 w-5 flex-shrink-0 text-yellow-600 dark:text-yellow-300" />
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {question.hint}
              </p>
            </div>
          )}
          {question.image && (
            <div className="relative h-48 w-full">
              <Image
                src={question.image}
                alt={question.text}
                fill
                className="object-contain object-center"
              />
            </div>
          )}
          <div className="mb-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
            <h4 className="mb-3 flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
              <Beaker className="mr-2 h-5 w-5" />
              {t("questions.settings")}
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center">
                {question.setting.active ? (
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  {question.setting.active
                    ? t("questions.active")
                    : t("questions.inactive")}
                </span>
              </div>

              <div
                className={`flex items-center rounded-full px-3 py-1 ${typeDetails.color}`}
              >
                <TypeIcon className="mr-2 h-4 w-4" />
                <span>{typeDetails.label}</span>
              </div>

              <div className="flex items-center">
                <ArrowUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  {t("questions.difficulty")} {question.setting.level}/10
                </span>
              </div>

              <div className="flex items-center">
                {question.setting.rondomnizable ? (
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  {question.setting.rondomnizable
                    ? t("questions.randomizable")
                    : t("questions.notRandomizable")}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
              <ClipboardList className="mr-2 h-5 w-5" />
              {t("questions.answers")} ({question.answers.length})
            </h4>
            <div className="space-y-2">
              {question.answers.map((answer) => (
                <div
                  key={answer.id}
                  className={`flex items-center justify-between rounded-md border p-3 ${
                    answer.isPerfectAns
                      ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900"
                      : "border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-gray-700 dark:text-gray-200">
                      {answer.text}
                    </span>
                  </div>
                  {answer.isPerfectAns && (
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
