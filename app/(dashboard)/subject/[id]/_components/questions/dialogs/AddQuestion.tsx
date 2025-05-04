"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { usePathname } from "next/navigation";
import { useAddQuestion } from "@/hooks/useQuestion";
import { TQuestion, schemaQuestion } from "@/lib/validations/question";
import { TypeQuestion } from "@/lib/constants";
import { SingleSelect } from "@/components/ui/single-select";
import { useGetTopic } from "@/hooks/useTopic";
import { Slider } from "@/components/ui/slider";
import { useLocale } from "next-intl";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useRef, useState } from "react";
import { CloudUpload, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
export default function AddQuestionDialog() {
  const subjectID = usePathname().split("/")[2];
  const { mutateAsync: addQusetion, isPending, isSuccess } = useAddQuestion();
  const { data: topics } = useGetTopic({ subjec: subjectID });
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(
    null
  );
  const refClose = useRef<HTMLButtonElement>(null);

  const locale = useLocale();
  const form = useForm<TQuestion>({
    resolver: zodResolver(schemaQuestion),
    defaultValues: {
      text: "",
      answers: [
        { isPerfectAns: false, text: "" },
        { isPerfectAns: false, text: "" },
      ],
      hint: "",
      image: undefined,
      setting: {
        active: true,
        level: 5,
        periodOfTime: "000500",
        rondomnizable: true,
        topic: undefined,
        type: undefined,
      },
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "answers",
  });
  const onsubmit = async (data: TQuestion) => {
    console.log(data);
    await addQusetion(data);
    form.reset({
      answers: [{ isPerfectAns: false, text: "" }],
      text: "",
      hint: "",
      setting: {
        topic: undefined,
        periodOfTime: "000500",
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      refClose.current?.click();
    }
    return () => {};
  }, [isSuccess]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ New Qusetion</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="inline">
          <DialogTitle>
            Add Question
            {form.formState.errors && JSON.stringify(form.formState.errors)}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="h- flex flex-col justify-between"
          >
            <div className="mb-5 grid grid-cols-3 gap-2">
              <div
                className={`col-span-1 space-y-4 ${locale === "ar" && "border-l-4 pl-5"}`}
              >
                <FormField
                  control={form.control}
                  name="setting.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Qustion</FormLabel>
                      <FormControl>
                        <SingleSelect
                          options={TypeQuestion.map((type) => ({
                            value: String(type.value),
                            label: type.lable,
                          }))}
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          placeholder="Select Type"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="setting.topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <SingleSelect
                          options={
                            topics?.map((topic) => ({
                              value: String(topic.id),
                              label: topic.name,
                            })) || []
                          }
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          placeholder="Select Topic"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="setting.level"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormLabel>Difficulty level ({value}/10)</FormLabel>
                      <FormControl>
                        <Slider
                          min={0}
                          max={10}
                          step={1}
                          defaultValue={[5]}
                          onValueChange={(vals) => {
                            onChange(vals[0]);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="setting.active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Active</FormLabel>
                        <FormDescription>is qusetion is active</FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="setting.rondomnizable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Rondomnizable </FormLabel>
                        <FormDescription>
                          is qusetion can be Rondomnizable
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div
                className={`col-span-2 ${locale === "en" && "border-l-4 pl-5"} space-y-4`}
              >
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qusetion name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Qustion name"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex h-32 w-full items-center justify-center">
                          <label
                            htmlFor="file"
                            className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-800"
                          >
                            {field.value ? (
                              <img
                                className="h-32 bg-cover"
                                src={field.value}
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                <CloudUpload
                                  className="my-2"
                                  size={30}
                                />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="px-2 font-semibold">
                                    Click to upload
                                  </span>
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  SVG, PNG, JPG or jpeg (MAX. 3MB)
                                </p>
                              </div>
                            )}

                            <Input
                              className="hidden"
                              accept="image/jpeg, image/jpg, image/png, image/webp"
                              id="file"
                              type="file"
                              onChange={(event) => {
                                const file = event.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = () =>
                                    form.setValue(
                                      "image",
                                      reader.result as string
                                    );
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <ScrollArea className="h-[200px]">
                  <RadioGroup
                    value={
                      correctAnswerIndex !== null
                        ? String(correctAnswerIndex)
                        : ""
                    }
                    onValueChange={(value) => {
                      const index = Number(value);
                      setCorrectAnswerIndex(index);

                      form.setValue(
                        "answers",
                        form.getValues("answers").map((ans, i) => ({
                          ...ans,
                          isPerfectAns: i === index,
                        }))
                      );
                    }}
                  >
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="mt-2 flex items-center gap-2"
                      >
                        <RadioGroupItem value={String(index)} />
                        <FormField
                          control={form.control}
                          name={`answers.${index}.text`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder={`Answers ${index + 1}`}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Trash
                          className="text-red-600"
                          onClick={() => {
                            remove(index);
                            // Update correct answer index if needed
                            if (correctAnswerIndex === index) {
                              setCorrectAnswerIndex(null);
                            } else if (
                              correctAnswerIndex !== null &&
                              correctAnswerIndex > index
                            ) {
                              setCorrectAnswerIndex(correctAnswerIndex - 1);
                            }
                          }}
                        />
                      </div>
                    ))}
                    <span className="text-red-600">
                      {form.formState.errors.answers &&
                        form.formState.errors.answers.root?.message}
                    </span>
                  </RadioGroup>
                </ScrollArea>

                <Button
                  className="mt-5"
                  onClick={() => append({ isPerfectAns: false, text: "" })}
                  variant={"outline"}
                  type="button"
                >
                  Add option
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                disabled={isPending}
                type="submit"
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                onClick={() => refClose.current?.click()}
                variant="outline"
              >
                Back
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
      <DialogClose asChild>
        <button
          ref={refClose}
          className="hidden"
        ></button>
      </DialogClose>
    </Dialog>
  );
}
