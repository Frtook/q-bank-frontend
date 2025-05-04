"use client";
import React from "react";
import AddQuestionDialog from "./dialogs/AddQuestion";
import { useGetQuestion } from "@/hooks/useQuestion";
import QuestionList from "./QuestionList";

export default function Questions() {
  const { data, isLoading } = useGetQuestion();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Question Page</h1>
        <AddQuestionDialog />
      </div>
      {isLoading && (
        <div className="mt-5 animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-lg bg-gray-200"
            />
          ))}
        </div>
      )}
      {data?.length === 0 && <p className="text-center">No Qusetion</p>}
      {data && <QuestionList questions={data} />}
    </div>
  );
}
