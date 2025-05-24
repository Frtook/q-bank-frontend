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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useGetOutcome } from "@/hooks/subject/useOutcome";
import { MdTimer, MdOutlineAutoAwesome } from "react-icons/md";
import { MultiSelect } from "@/components/ui/multi-selector";
import { z } from "zod";
import { useGenerateExam } from "@/hooks/subject/useGetExam";
import { useTranslations } from "next-intl";

const schema = z.object({
  subject: z.number().default(0),
  difficulty_level: z.number().min(1).max(10),
  outcomeWeights: z.array(
    z.object({
      outcome: z.number(),
      weight: z.number().min(0).max(100),
    })
  ),
  topics: z.array(z.number()),
  exams: z.array(z.number()),
  exclude_exams: z.boolean().default(true),
  exclude_topics: z.boolean().default(false),
  difficultyDistribution: z.array(
    z.object({
      difficulty: z.number().min(1).max(10),
      weight: z.number().min(0).max(100),
    })
  ),
  countOfQuestions: z.number().min(1),
  timeToSolve: z.string(),
});

type ExamGeneratorFormValues = z.infer<typeof schema>;

const ExamGenerator = ({
  examId,
  subjectId,
}: {
  examId?: number;
  subjectId?: number;
}) => {
  const t = useTranslations("ExamGenerator");

  const { data: outcomes } = useGetOutcome({ subjec: String(subjectId) });
  const [outcomeWeights, setOutcomeWeights] = useState<
    { outcome: number; weight: number }[]
  >([]);
  const [selectedOutcome, setSelectedOutcome] = useState<number | null>(null);
  const [outcomeWeightValue, setOutcomeWeightValue] = useState<number>(0);

  const generateExamMutation = useGenerateExam(Number(examId));

  const form = useForm<ExamGeneratorFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: subjectId,
      difficulty_level: 5,
      outcomeWeights: [],
      topics: [],
      exams: [],
      exclude_exams: true,
      exclude_topics: false,
      difficultyDistribution: [{ difficulty: 5, weight: 100 }],
      countOfQuestions: 20,
      timeToSolve: "01:00:00",
    },
  });

  const onSubmit = (data: ExamGeneratorFormValues) => {
    console.log("Submitted data:", data);

    const requestData = {
      subject: data.subject,
      difficulty_level: data.difficulty_level,
      outcomeWeights: data.outcomeWeights,
      countOfQuestions: data.countOfQuestions,
      timeToSolve: data.timeToSolve,
    };

    generateExamMutation.mutate(requestData);
  };

  const addOutcomeWeight = () => {
    if (selectedOutcome !== null && outcomeWeightValue > 0) {
      const newOutcomeWeight = {
        outcome: selectedOutcome,
        weight: outcomeWeightValue,
      };
      setOutcomeWeights([...outcomeWeights, newOutcomeWeight]);
      form.setValue("outcomeWeights", [...outcomeWeights, newOutcomeWeight]);
      setSelectedOutcome(null);
      setOutcomeWeightValue(0);
    }
  };

  const removeOutcomeWeight = (index: number) => {
    const newWeights = [...outcomeWeights];
    newWeights.splice(index, 1);
    setOutcomeWeights(newWeights);
    form.setValue("outcomeWeights", newWeights);
  };

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="h-12 text-base"
      >
        <Button variant="default">
          {t("autoGenerateExam")} <MdOutlineAutoAwesome />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("examGenerator")}</DialogTitle>
          <DialogDescription>{t("configureParameters")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-1 space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              {/* Number of Questions */}
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="countOfQuestions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("numberOfQuestions")}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Difficulty Level */}
              <FormField
                control={form.control}
                name="difficulty_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("difficultyLevel")}</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min={1}
                          max={10}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                        />
                        <span className="w-8 text-center text-sm font-medium">
                          {field.value}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time to Solve */}
              <FormField
                control={form.control}
                name="timeToSolve"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("timeToSolve")}</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-md border px-2 py-1">
                          <MdTimer className="mr-2 text-gray-500" />
                          <select
                            value={field.value.split(":")[0]}
                            onChange={(e) => {
                              const [, m, s] = field.value.split(":");
                              field.onChange(`${e.target.value}:${m}:${s}`);
                            }}
                            className="bg-transparent outline-none"
                          >
                            {Array.from({ length: 24 }, (_, i) => (
                              <option
                                key={i}
                                value={i.toString().padStart(2, "0")}
                              >
                                {i}h
                              </option>
                            ))}
                          </select>
                          <span className="mx-1">:</span>
                          <select
                            value={field.value.split(":")[1]}
                            onChange={(e) => {
                              const [h, , s] = field.value.split(":");
                              field.onChange(`${h}:${e.target.value}:${s}`);
                            }}
                            className="bg-transparent outline-none"
                          >
                            {Array.from({ length: 60 }, (_, i) => (
                              <option
                                key={i}
                                value={i.toString().padStart(2, "0")}
                              >
                                {i}m
                              </option>
                            ))}
                          </select>
                          <span className="mx-1">:</span>
                          <select
                            value={field.value.split(":")[2]}
                            onChange={(e) => {
                              const [h, m] = field.value.split(":");
                              field.onChange(`${h}:${m}:${e.target.value}`);
                            }}
                            className="bg-transparent outline-none"
                          >
                            {Array.from({ length: 60 }, (_, i) => (
                              <option
                                key={i}
                                value={i.toString().padStart(2, "0")}
                              >
                                {i}s
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Outcome Weights */}
            <div className="space-y-4">
              <FormLabel>{t("outcomeWeights")}</FormLabel>
              <div className="rounded-lg border p-4">
                {outcomeWeights.length > 0 ? (
                  <div className="mb-4 space-y-2">
                    {outcomeWeights.map((weight, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md bg-gray-100 px-3 py-2 dark:bg-gray-800"
                      >
                        <span>
                          {outcomes?.find((o) => o.id === weight.outcome)?.text}{" "}
                          - {weight.weight}%
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOutcomeWeight(index)}
                        >
                          {t("remove")}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mb-4 text-sm text-gray-500">
                    {t("noOutcomeWeights")}
                  </p>
                )}
                <div className="flex gap-2">
                  <select
                    value={selectedOutcome || ""}
                    onChange={(e) =>
                      setSelectedOutcome(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    className="flex-1 rounded-md border px-3 py-2"
                  >
                    <option value="">{t("selectOutcome")}</option>
                    {outcomes?.map((outcome) => (
                      <option
                        key={outcome.id}
                        value={outcome.id}
                      >
                        {outcome.text}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder={t("weightPercent")}
                    value={outcomeWeightValue}
                    onChange={(e) =>
                      setOutcomeWeightValue(Number(e.target.value))
                    }
                    className="w-24"
                  />
                  <Button
                    type="button"
                    onClick={addOutcomeWeight}
                    disabled={!selectedOutcome || outcomeWeightValue <= 0}
                  >
                    {t("add")}
                  </Button>
                </div>
              </div>
            </div>

            {/* Hidden fields for topics and exams */}
            <FormField
              control={form.control}
              name="topics"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <MultiSelect
                      onValueChange={(values) =>
                        field.onChange(values.map(Number))
                      }
                      options={[]}
                      placeholder={t("selectTopics")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exams"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <MultiSelect
                      onValueChange={(values) =>
                        field.onChange(values.map(Number))
                      }
                      options={[]}
                      placeholder={t("selectExams")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <DialogClose asChild>
                <Button variant="outline">{t("cancel")}</Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={generateExamMutation.isPending}
              >
                {generateExamMutation.isPending
                  ? t("generating")
                  : t("generateExam")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ExamGenerator;
