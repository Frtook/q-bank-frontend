import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import SearchInput from "@/components/ui/search";
import DataTable from "@/components/ui/dataTable";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TExam, schemaExam } from "@/lib/validations/subject/exam";
import { useState, useEffect } from "react";
import { useAddExam } from "@/hooks/subject/useGetExam";
import { useGetQuestion } from "@/hooks/subject/useQuestion";
import { MdTimer } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useGetOutcome } from "@/hooks/subject/useOutcome";
import { useGetTopic } from "@/hooks/subject/useTopic";
import { MultiSelect } from "@/components/ui/multi-selector";
import { Checkbox } from "@/components/ui/checkbox";
import TableSkeleton from "@/components/table/table-skeleton";
import { useGetacademy } from "@/hooks/useAcademy";
import { useLocale, useTranslations } from "next-intl";

const ExamDialog = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const lang = useLocale();
  const t = useTranslations("examDialog");
  const { mutate: addExam } = useAddExam();
  const subjectID = usePathname().split("/")[2];
  const { data: topic } = useGetTopic({ subjec: subjectID });
  const { data: outcome } = useGetOutcome({ subjec: subjectID });
  const { data: academy } = useGetacademy();
  const [topics, settopics] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [outcomes, setOutcome] = useState<string[]>([]);
  const [active, setActive] = useState(true);
  const { data: questionsData } = useGetQuestion({
    level: levels.join(","),
    outcome: outcomes.join(","),
    topic: topics.join(","),
    active: active,
    subject: subjectID,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [time, setTime] = useState({ hours: 1, minutes: 0, seconds: 0 });

  const form = useForm<TExam>({
    resolver: zodResolver(schemaExam),
    defaultValues: {
      name: "",
      confirmed: true,
      questions: selectedQuestions,
      setting: {
        marks: 100,
        subject: 0,
        periodOfTime: "01:00:00",
        generation_config: "",
        level: 1,
        academy: 0,
      },
    },
  });

  useEffect(() => {
    form.setValue(
      "setting.periodOfTime",
      `${String(time.hours).padStart(2, "0")}:${String(time.minutes).padStart(2, "0")}:${String(time.seconds).padStart(2, "0")}`
    );
  }, [time, form]);

  useEffect(() => {
    const value = form.getValues("setting.periodOfTime");
    if (value && /^\d{2}:\d{2}:\d{2}$/.test(value)) {
      const [h, m, s] = value.split(":").map(Number);
      setTime({ hours: h, minutes: m, seconds: s });
    }
  }, []);

  useEffect(() => {
    form.setValue("questions", selectedQuestions);
  }, [selectedQuestions, form]);

  const onSubmit = (data: TExam) => {
    const payload = {
      name: data.name,
      confirmed: true,
      questions: data.questions,
      setting: {
        marks: data.setting.marks,
        subject: Number(subjectID),
        periodOfTime: data.setting.periodOfTime,
        generation_config: data.setting.generation_config || "",
        level: data.setting.level,
        academy: Number(academy?.[0]?.id),
      },
    };

    console.log("Submitting payload:", payload);
    addExam(payload);
  };

  const convertToMinutes = (timeStr: string) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 60 + minutes + Math.floor(seconds / 60);
  };

  const filteredQuestions =
    questionsData?.filter((question) =>
      question.text.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const formattedQuestions = filteredQuestions.map((question) => {
    const level = question.setting.level ?? "-";
    let levelClass = "bg-green-100 text-green-800";
    if (typeof level === "number") {
      if (level > 7) levelClass = "bg-red-100 text-red-800";
      else if (level > 5) levelClass = "bg-yellow-100 text-yellow-800";
    }

    return {
      id: question.id,
      text: question.text,
      level:
        typeof level === "number" ? (
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${levelClass}`}
          >
            {level}
          </span>
        ) : (
          "-"
        ),
      periodOfTime: question.setting.periodOfTime ? (
        <span className="flex w-fit items-center gap-1 rounded-md bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">
          <MdTimer />
          
          {`${convertToMinutes(question.setting.periodOfTime.toString())} ${t("minutes")}`}

        </span>
      ) : (
        <span className="flex items-center gap-1 rounded-md bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">
          <MdTimer /> -
        </span>
      ),
      createdBy: question.setting.createdBy ?? "-",
      type:
        question.setting.type === 1 ? (
          <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
            {t("questionTypes.mcq")}
          </span>
        ) : question.setting.type === 2 ? (
          <span className="inline-block rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
            {t("questionTypes.trueFalse")}
          </span>
        ) : (
          "-"
        ),
    };
  });

  const columns = [
    { accessor: "text", header: t("columns.question") },
    { accessor: "level", header: t("columns.level") },
    { accessor: "periodOfTime", header: t("columns.timeLimit") },
    { accessor: "createdBy", header: t("columns.createdBy") },
    { accessor: "type", header: t("columns.questionType") },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ {t("newExam")}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>{t("addNewExam")}</DialogTitle>
          <DialogDescription>{t("dialogDescription")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-1 space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("formLabels.name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("placeholders.examName")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full flex-col gap-2 rounded-md bg-white p-3 shadow-sm dark:bg-[#19191d]">
              <h2 className="my-2 font-medium">{t("selectQuestionsTitle")}</h2>
              <div className="flex w-full flex-col gap-2 px-4">
                <SearchInput
                  placeholder={t("placeholders.searchQuestions")}
                  onSearch={(value) => setSearchTerm(value)}
                />
                <div className="flex flex-1 gap-5">
                  <MultiSelect
                    className="border-2"
                    onValueChange={(value) => settopics(value)}
                    options={
                      topic?.map((t) => ({
                        value: String(t.id),
                        label: t.name,
                      })) || []
                    }
                    placeholder={t("placeholders.selectTopic")}
                  />
                  <MultiSelect
                    className="border-2"
                    onValueChange={(value) => setOutcome(value)}
                    options={
                      outcome?.map((outcome) => ({
                        value: String(outcome.id),
                        label: outcome.text,
                      })) || []
                    }
                    placeholder={t("placeholders.selectOutcome")}
                  />
                  <MultiSelect
                    className="border-2"
                    onValueChange={(value) => setLevels(value)}
                    options={[...Array(10)].map((_, index) => ({
                      value: String(index + 1),
                      label: String(index + 1),
                    }))}
                    placeholder={t("placeholders.selectLevel")}
                  />
                  <div className="flex w-full items-center space-x-2">
                    <Checkbox
                      checked={active}
                      onCheckedChange={() => setActive(!active)}
                      id="terms"
                    />
                    <label
                      htmlFor="terms"
                      className="select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t("isActive")}
                    </label>
                  </div>
                </div>
              </div>
              {questionsData ? (
                <DataTable
                  direction={lang === "ar" ? "rtl" : "ltr"}
                  columns={columns}
                  data={formattedQuestions}
                  onRowSelectionChange={(selectedIndexes: number[]) => {
                    const selectedIds = selectedIndexes.map(
                      (index) => formattedQuestions[index].id
                    );
                    setSelectedQuestions(selectedIds);
                  }}
                />
              ) : (
                <TableSkeleton />
              )}
            </div>

            <FormField
              control={form.control}
              name="setting.generation_config"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("formLabels.generationConfig")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("placeholders.generationConfig")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="setting.periodOfTime"
              render={() => (
                <FormItem>
                  <FormLabel>{t("formLabels.periodOfTime")}</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <select
                        value={time.hours}
                        onChange={(e) =>
                          setTime({ ...time, hours: Number(e.target.value) })
                        }
                        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      >
                        {Array.from({ length: 24 }, (_, i) => (
                          <option
                            key={i}
                            value={i}
                          >
                            {i}h
                          </option>
                        ))}
                      </select>
                      <select
                        value={time.minutes}
                        onChange={(e) =>
                          setTime({ ...time, minutes: Number(e.target.value) })
                        }
                        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      >
                        {Array.from({ length: 60 }, (_, i) => (
                          <option
                            key={i}
                            value={i}
                          >
                            {i}m
                          </option>
                        ))}
                      </select>
                      <select
                        value={time.seconds}
                        onChange={(e) =>
                          setTime({ ...time, seconds: Number(e.target.value) })
                        }
                        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      >
                        {Array.from({ length: 60 }, (_, i) => (
                          <option
                            key={i}
                            value={i}
                          >
                            {i}s
                          </option>
                        ))}
                      </select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="setting.marks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("formLabels.totalMarks")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="setting.level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("formLabels.difficultyLevel")}: {field.value}/10
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                      />
                      <span className="w-8 text-center text-sm text-gray-500">
                        {field.value}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <DialogClose asChild>
                <Button variant="outline">{t("buttons.cancel")}</Button>
              </DialogClose>
              <Button type="submit">{t("buttons.submit")}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ExamDialog;
