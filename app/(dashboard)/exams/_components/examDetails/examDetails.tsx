"use client";

import {
  MdQuestionAnswer,
  MdOutlineCheckCircle,
  MdOutlineCancel,
} from "react-icons/md";
import { GiDuration } from "react-icons/gi";
import { TbNumber100Small } from "react-icons/tb";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { useGetExamById } from "@/hooks/subject/useGetExam";
import { GoNumber } from "react-icons/go";
import { LuFileQuestion } from "react-icons/lu";
import { BsFiletypeDocx, BsFileEarmarkPdf } from "react-icons/bs";
import ExamGenerator from "../autoGenerate/generateExam";
import { useTranslations } from "next-intl";

export default function ExamDetails({ examId }: { examId: number }) {
  const t = useTranslations("examDetails");
  const { data: exam, isLoading, isError } = useGetExamById(examId);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="grid w-full grid-cols-1 gap-4 rounded-xl bg-white p-6 shadow-md dark:bg-[#18181b] sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div className="flex flex-col gap-2">
                <div className="h-8 w-20 rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-[#18181b]">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-7 w-48 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex gap-2">
              <div className="h-10 w-28 rounded-md bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-10 w-28 rounded-md bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>
          {[1, 2].map((q) => (
            <div
              key={q}
              className="space-y-4 border-b pb-6 last:border-b-0"
            >
              <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="flex flex-col gap-3 pl-6">
                {[1, 2].map((a) => (
                  <div
                    key={a}
                    className="flex items-center gap-2"
                  >
                    <div className="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-5 w-2/3 rounded bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) return <div>{t("errorFetchingExam")}</div>;

  const { name, academy_name, questions, setting } = exam!;
  const convertDurationToMinutes = (duration: string) => {
    const [hours, minutes] = duration.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const totalQuestions = questions.length;
  const durationInMinutes = convertDurationToMinutes(setting.periodOfTime);
  const staticDifficulty = setting.level;

  function exportToPdf() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const center = pageWidth / 2;

    const img = new Image();
    img.src = "/images/image.jpeg";

    img.onload = () => {
      const imgProps = doc.getImageProperties(img);
      const imgWidth = 25;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      const imgX = (pageWidth - imgWidth) / 2;
      const imgY = 10;

      doc.addImage(img, "JPEG", imgX, imgY, imgWidth, imgHeight);

      const textY = imgY + imgHeight / 2 + 3;
      const sideMargin = 10;

      doc.setFont("helvetica", "bold").setFontSize(12);
      doc.text(`${t("academy")}: ${academy_name}`, sideMargin, textY);
      doc.text(
        `${t("duration")}: ${durationInMinutes} ${t("minutes")}`,
        sideMargin,
        textY + 7
      );
      const rightX = pageWidth - sideMargin - 70;
      doc.text(`${t("marks")}: ${setting.marks}`, rightX, textY);
      doc.text(`${t("subject")}: ${name}`, rightX, textY + 7);

      let y = imgY + imgHeight + 25;
      doc.setFont("helvetica", "bold").setFontSize(11);
      doc.text(`${t("instructions")}:`, sideMargin, y);
      doc.setFont("helvetica", "normal");
      doc.text(t("instructionsContent"), sideMargin + 5, y + 7);

      y += 25;
      doc.setFontSize(14).text(t("questions"), center, y, { align: "center" });
      y += 10;
      doc.setFontSize(11).setFont("helvetica", "normal");
      const maxWidth = pageWidth - sideMargin * 2;

      questions.forEach((q, idx) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        const questionText = `${idx + 1}. ${q.text}`;
        const splitQuestion = doc.splitTextToSize(questionText, maxWidth);
        doc.text(splitQuestion, sideMargin, y);
        y += splitQuestion.length * 7 + 5;

        q.answers.forEach((ans, i) => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          const answerText = `${["A", "B", "C", "D"][i]}. ${ans.text.replace(/^\d+\)\s*/, "")}`;
          const splitAnswer = doc.splitTextToSize(answerText, maxWidth - 5);
          doc.text(splitAnswer, sideMargin + 5, y);
          y += splitAnswer.length * 7 + 5;
        });

        y += 5;
      });

      doc.save("exam-questions.pdf");
    };
  }

  function exportToDocx() {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: name,
              heading: HeadingLevel.HEADING_1,
              alignment: "center",
              spacing: { after: 400 },
            }),
            new Paragraph({
              text: academy_name,
              heading: HeadingLevel.HEADING_2,
              alignment: "center",
              spacing: { after: 400 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `${t("duration")}: `, bold: true }),
                new TextRun(`${durationInMinutes} ${t("minutes")}`),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `${t("totalQuestions")}: `, bold: true }),
                new TextRun(totalQuestions.toString()),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `${t("difficulty")}: `, bold: true }),
                new TextRun(String(staticDifficulty ?? "")),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `${t("marks")}: `, bold: true }),
                new TextRun(setting.marks.toString()),
              ],
              spacing: { after: 50 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `${t("instructions")}: `, bold: true }),
                new TextRun(t("instructionsContent")),
              ],
              spacing: { after: 400 },
            }),
            new Paragraph({
              text: t("questions"),
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 400 },
            }),
            ...questions.flatMap((q, index) => {
              const questionTitle = new Paragraph({
                text: `${index + 1}. ${q.text}`,
                heading: HeadingLevel.HEADING_3,
                spacing: { after: 200 },
              });

              const answerParagraphs = q.answers.map(
                (ans, i) =>
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${["A", "B", "C", "D"][i]}. ${ans.text.replace(/^\d+\)\s*/, "")}`,
                      }),
                    ],
                    indent: { left: 400 },
                    spacing: { after: 100 },
                  })
              );

              return [questionTitle, ...answerParagraphs];
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "exam-questions.docx");
    });
  }

  return (
    <div className="space-y-8">
      <div className="grid w-full grid-cols-1 gap-4 rounded-xl bg-white p-6 shadow-md dark:bg-[#18181b] sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: <LuFileQuestion className="text-4xl text-white" />,
            bg: "bg-indigo-500",
            label: t("totalQuestions"),
            value: totalQuestions,
          },
          {
            icon: <GoNumber className="text-4xl text-white" />,
            bg: "bg-emerald-500",
            label: t("difficulty"),
            value: staticDifficulty,
          },
          {
            icon: <GiDuration className="text-4xl text-white" />,
            bg: "bg-rose-500",
            label: t("duration"),
            value: `${durationInMinutes} ${t("minutes")}`,
          },
          {
            icon: <TbNumber100Small className="text-4xl text-white" />,
            bg: "bg-amber-500",
            label: t("marks"),
            value: setting.marks,
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2"
          >
            <div className={`${item.bg} rounded-full p-4`}>{item.icon}</div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-medium">{item.value}</span>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-[#18181b]">
        <div
          className={`mb-4 flex ${questions.length === 0 ? "flex-col gap-4" : "items-center"} justify-between`}
        >
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white">
            <MdQuestionAnswer className="text-primary" />
            {t("examQuestions")}
          </h2>
          <div className="flex gap-2">
            {questions.length === 0 ? (
              <div className="flex w-full flex-col items-center justify-center rounded-md border border-dashed border-primary bg-primary/10 p-6 text-center">
                <p className="mb-3 text-sm font-medium text-primary">
                  {t("noQuestionsPrompt")}
                </p>
                <ExamGenerator
                  examId={exam?.id}
                  subjectId={exam?.setting.subject}
                />
              </div>
            ) : (
              <>
                <button
                  onClick={exportToDocx}
                  className="flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-white transition hover:opacity-90"
                >
                  {t("exportDocx")} <BsFiletypeDocx className="h-6 w-6" />
                </button>
                <button
                  onClick={exportToPdf}
                  className="flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-white transition hover:opacity-90"
                >
                  {t("exportPdf")} <BsFileEarmarkPdf className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>

        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="space-y-3 border-b pb-4 last:border-b-0"
          >
            <div className="flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-white">
              <span>{idx + 1}.</span>
              <span>{q.text}</span>
            </div>
            <div className="flex flex-col gap-2 pl-6">
              {q.answers.map((ans, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 text-lg ${ans.isPerfectAns ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {ans.isPerfectAns ? (
                    <MdOutlineCheckCircle className="text-xl" />
                  ) : (
                    <MdOutlineCancel className="text-xl" />
                  )}
                  <span>{ans.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
