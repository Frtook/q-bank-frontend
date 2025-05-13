"use client";

import { use } from "react";
import ExamDetails from "../_components/examDetails/examDetails";

export default function Page({
  params,
}: {
  params: Promise<{
    id: number;
  }>;
}) {
  const { id } = use(params);
  return (
    <div className="flex flex-col gap-5">
      <ExamDetails examId={id} />
    </div>
  );
}
