"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import SearchInput from "@/components/ui/search";
import DataTable from "@/components/ui/dataTable";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TExam, schemaExam } from "@/lib/validations/subject/exam";
import { useState, useEffect } from "react";
import { useUpdateExam } from "@/hooks/subject/useGetExam";
import { useGetQuestion } from "@/hooks/subject/useQuestion";
import { MdTimer } from "react-icons/md";
import { Exam } from "@/types";
import { usePathname } from "next/navigation";
import { useGetOutcome } from "@/hooks/subject/useOutcome";
import { useGetTopic } from "@/hooks/subject/useTopic";
import { MultiSelect } from "@/components/ui/multi-selector";
import { Checkbox } from "@/components/ui/checkbox";
import TableSkeleton from "@/components/table/table-skeleton";

interface EditExamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exam: Exam | null;
}

const EditExamDialog = ({ open, onOpenChange, exam }: EditExamDialogProps) => {
  const [originalSelectedQuestions, setOriginalSelectedQuestions] = useState<
    number[]
  >([]);
  const [workingSelectedQuestions, setWorkingSelectedQuestions] = useState<
    number[]
  >([]);
  const { mutate: updateExam } = useUpdateExam();
  const subjectID = usePathname().split("/")[2];
  const { data: topic } = useGetTopic({ subjec: subjectID });
  const { data: outcome } = useGetOutcome({ subjec: subjectID });
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
      questions: [],
      setting: {
        marks: 100,
        subject: 0,
        periodOfTime: "01:00:00",
        generation_config: "",
        level: 1,
        academy: 2,
      },
    },
  });

  // Initialize form with exam data when dialog opens or exam changes
  useEffect(() => {
    if (exam) {
      const initialQuestions = exam.questions?.map((q) => q.id) || [];
      form.reset({
        name: exam.name,
        confirmed: exam.confirmed,
        questions: initialQuestions,
        setting: {
          marks: exam.setting?.marks || 100,
          subject: exam.setting?.subject || 0,
          periodOfTime: exam.setting?.periodOfTime || "01:00:00",
          generation_config: exam.setting?.generation_config || "",
          level: exam.setting?.level || 1,
          academy: exam.setting?.academy || 2,
        },
      });

      // Set both original and working selections
      setOriginalSelectedQuestions(initialQuestions);
      setWorkingSelectedQuestions(initialQuestions);

      // Parse time if it exists
      if (exam.setting?.periodOfTime) {
        const [h, m, s] = exam.setting.periodOfTime.split(":").map(Number);
        setTime({ hours: h, minutes: m, seconds: s });
      }
    }
  }, [exam, form]);

  // Update form value when working selection changes
  useEffect(() => {
    form.setValue("questions", workingSelectedQuestions);
  }, [workingSelectedQuestions, form]);

  const onSubmit = (data: TExam) => {
    if (!exam) return;

    const payload = {
      id: exam.id,
      name: data.name,
      confirmed: true,
      questions: data.questions,
      setting: {
        marks: data.setting.marks,
        subject: 1,
        periodOfTime: data.setting.periodOfTime,
        generation_config: data.setting.generation_config || "",
        level: data.setting.level,
        academy: 1,
      },
    };

    updateExam(payload);
    // Update the original selection only on submit
    setOriginalSelectedQuestions(data.questions);
    onOpenChange(false);
  };

  // Reset working selection when dialog closes
  useEffect(() => {
    if (!open) {
      setWorkingSelectedQuestions(originalSelectedQuestions);
    }
  }, [open, originalSelectedQuestions]);

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
          {`${convertToMinutes(question.setting.periodOfTime.toString())} mins`}
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
            MCQ
          </span>
        ) : question.setting.type === 2 ? (
          <span className="inline-block rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
            True/False
          </span>
        ) : (
          "-"
        ),
    };
  });

  const columns = [
    { accessor: "text", header: "Question" },
    { accessor: "level", header: "Level" },
    { accessor: "periodOfTime", header: "Time Limit" },
    { accessor: "createdBy", header: "Created By" },
    { accessor: "type", header: "Question Type" },
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Exam</DialogTitle>
          <DialogDescription>
            Update the fields below to edit this exam.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Exam Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full flex-col rounded-md bg-white shadow-sm dark:bg-[#19191d]">
              <h2 className="my-2 font-medium">
                - Select Questions for the Exam
              </h2>
              <div className="flex w-full flex-col gap-2 px-4">
                <SearchInput
                  placeholder="Search Questions"
                  onSearch={(value) => setSearchTerm(value)}
                />
                <div className="flex flex-1 gap-5">
                  <MultiSelect
                    className="border-2"
                    onValueChange={(value) => {
                      settopics(value);
                    }}
                    options={
                      topic?.map((t) => ({
                        value: String(t.id),
                        label: t.name,
                      })) || []
                    }
                    placeholder="Select Topic"
                  />
                  <MultiSelect
                    className="border-2"
                    onValueChange={(value) => {
                      setOutcome(value);
                    }}
                    options={
                      outcome?.map((outcome) => ({
                        value: String(outcome.id),
                        label: outcome.text,
                      })) || []
                    }
                    placeholder="Select Outcome"
                  />
                  <MultiSelect
                    className="border-2"
                    onValueChange={(value) => {
                      setLevels(value);
                    }}
                    options={[...Array(10)].map((_, index) => ({
                      value: String(index + 1),
                      label: String(index + 1),
                    }))}
                    placeholder="Select Level"
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
                      is Active
                    </label>
                  </div>
                </div>
              </div>
              {questionsData ? (
                <DataTable
                  key={`exam-${exam?.id}`} // Important for resetting the table state
                  columns={columns}
                  data={formattedQuestions}
                  onRowSelectionChange={(selectedIndexes: number[]) => {
                    const selectedIds = selectedIndexes.map(
                      (index) => formattedQuestions[index].id
                    );
                    setWorkingSelectedQuestions(selectedIds);
                  }}
                  initialSelectedRows={formattedQuestions
                    .map((q, index) =>
                      workingSelectedQuestions.includes(q.id) ? index : -1
                    )
                    .filter((i) => i !== -1)}
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
                  <FormLabel>Generation Config</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="generation_config"
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
                  <FormLabel>Period of Time</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <select
                        value={time.hours}
                        onChange={(e) =>
                          setTime({ ...time, hours: Number(e.target.value) })
                        }
                        className="rounded-md border px-2 py-1"
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
                        className="rounded-md border px-2 py-1"
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
                        className="rounded-md border px-2 py-1"
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
                  <FormLabel>Total Marks</FormLabel>
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
                  <FormLabel>Difficulty Level: {field.value}/10</FormLabel>
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
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditExamDialog;
