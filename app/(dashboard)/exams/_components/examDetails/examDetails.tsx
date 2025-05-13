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

export default function ExamDetails({ examId }: { examId: number }) {
  const { data: exam, isLoading, isError } = useGetExamById(examId);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8">
        {/* Stats cards skeleton */}
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

        {/* Questions section skeleton */}
        <div className="w-full space-y-6 rounded-xl bg-white p-6 shadow-md dark:bg-[#18181b]">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-7 w-48 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="flex gap-2">
              <div className="h-10 w-28 rounded-md bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-10 w-28 rounded-md bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>

          {/* Questions list skeleton */}
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
  if (isError) {
    return <div>Error fetching exam data.</div>;
  }
  //  academy_logo, confirmed
  const { name, academy_name, questions, setting } = exam!;

  // Convert duration to minutes (assuming the format is "HH:mm:ss")
  const convertDurationToMinutes = (duration: string) => {
    const [hours, minutes] = duration.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const totalQuestions = questions.length;
  const durationInMinutes = convertDurationToMinutes(setting.periodOfTime);
  const staticDifficulty = "7/10"; // Static difficulty value

  const exportToDocx = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
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
                new TextRun({
                  text: "Duration: ",
                  bold: true,
                }),
                new TextRun(`${durationInMinutes} minutes`),
              ],
              spacing: { after: 100 },
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "Total Questions: ",
                  bold: true,
                }),
                new TextRun(totalQuestions.toString()),
              ],
              spacing: { after: 100 },
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "Difficulty: ",
                  bold: true,
                }),
                new TextRun(staticDifficulty),
              ],
              spacing: { after: 100 },
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "Total Marks: ",
                  bold: true,
                }),
                new TextRun(setting.marks.toString()),
              ],
              spacing: { after: 100 },
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "Instructions: ",
                  bold: true,
                }),
                new TextRun(
                  "Answer all questions. Choose the correct option for each question."
                ),
              ],
              spacing: { after: 400 },
            }),

            new Paragraph({
              text: "Questions",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 400 },
            }),

            ...questions.flatMap((q, index) => {
              const questionTitle = new Paragraph({
                text: `${index + 1}. ${q.text}`,
                heading: HeadingLevel.HEADING_3,
                spacing: { after: 200 },
              });

              const answerLetters = ["A", "B", "C", "D"];
              const answerParagraphs = q.answers.map(
                (ans, i) =>
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${answerLetters[i]}. ${ans.text.replace(/^\d+\)\s*/, "")}`,
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
  };

  const exportToPdf = () => {
    const doc = new jsPDF();
    const margin = 14;
    const pageWidth = doc.internal.pageSize.width;
    const center = pageWidth / 2;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(name, center, 20, { align: "center" });

    doc.setFontSize(14);
    doc.text(academy_name, center, 30, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Duration: ${durationInMinutes} minutes`, margin, 45);
    doc.text(`Marks: ${setting.marks}`, margin, 55);
    doc.text(`Difficulty: ${staticDifficulty}`, margin, 75);

    doc.setFont("helvetica", "bold");
    doc.text("Instructions:", margin, 85);
    doc.setFont("helvetica", "normal");
    const instructions =
      "Answer all questions. Choose the correct option for each question.";
    doc.text(instructions, margin + 5, 95);

    doc.setFont("helvetica", "bold");
    doc.text("Questions", center, 110, { align: "center" });

    let y = 120;
    const maxWidth = pageWidth - margin * 2;

    questions.forEach((q, idx) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      const questionText = `${idx + 1}. ${q.text}`;
      const splitQuestion = doc.splitTextToSize(questionText, maxWidth);
      doc.text(splitQuestion, margin, y);
      y += splitQuestion.length * 7 + 5;

      q.answers.forEach((ans, i) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }

        const answerText = `${["A", "B", "C", "D"][i]}. ${ans.text.replace(/^\d+\)\s*/, "")}`;
        const splitAnswer = doc.splitTextToSize(answerText, maxWidth - 10);
        doc.text(splitAnswer, margin + 5, y);

        y += splitAnswer.length * 7 + 5;
      });

      y += 5; // Extra space between questions
    });

    doc.save("exam-questions.pdf");
  };

  return (
    <div className="space-y-8">
      <div className="grid w-full grid-cols-1 gap-4 rounded-xl bg-white p-6 shadow-md dark:bg-[#18181b] sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: <LuFileQuestion className="text-4xl text-white" />,
            bg: "bg-indigo-500",
            label: "Total Questions",
            value: totalQuestions,
          },
          {
            icon: <GoNumber className="text-4xl text-white" />,
            bg: "bg-emerald-500",
            label: "Difficulty",
            value: staticDifficulty,
          },
          {
            icon: <GiDuration className="text-4xl text-white" />,
            bg: "bg-rose-500",
            label: "Duration",
            value: `${durationInMinutes} minutes`,
          },
          {
            icon: <TbNumber100Small className="text-4xl text-white" />,
            bg: "bg-amber-500",
            label: "Marks",
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
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white">
            <MdQuestionAnswer className="text-primary" />
            Exam Questions
          </h2>
          <div className="flex gap-2">
            <button
              onClick={exportToDocx}
              className="flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-white transition hover:opacity-90"
            >
              Export To DOCX <BsFiletypeDocx className="h-6 w-6" />
            </button>
            <button
              onClick={exportToPdf}
              className="flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-white transition hover:opacity-90"
            >
              Export To PDF
              <BsFileEarmarkPdf className="h-6 w-6" />
            </button>
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
