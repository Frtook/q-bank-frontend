"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetOutcome } from "@/hooks/subject/useOutcome";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAddTopic } from "@/hooks/subject/useTopic";
import { schemaTopic, TTopic } from "@/lib/validations/subject/topic";
import { MultiSelect } from "@/components/ui/multi-selector";
import { useTranslations } from "next-intl";

export default function AddTopicDialog() {
  const t = useTranslations("dialogs");
  const subjectID = usePathname().split("/")[2];
  const { data: outcomes } = useGetOutcome({ subjec: subjectID });
  const { mutate: addTopic, isPending } = useAddTopic();
  const form = useForm<TTopic>({
    resolver: zodResolver(schemaTopic),
    defaultValues: {
      name: "",
      subject: Number(subjectID) || undefined,
      outcomes: [],
    },
  });

  const onsubmit = (data: TTopic) => {
    addTopic(data);
    form.reset({
      name: "",
      outcomes: undefined,
      subject: Number(subjectID),
    });
  };

  useEffect(() => {
    if (subjectID) {
      form.reset({
        name: "",
        subject: Number(subjectID),
      });
    }
  }, [subjectID, form]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-5">{t("addNewTopic")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("addTopic")}</DialogTitle>
          <DialogDescription>{t("actionCannotBeUndone")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="mx-auto max-w-3xl space-y-8 py-10"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("topicName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("enterTopicText")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="outcomes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("outcomeText")}</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={
                        outcomes?.map((outcome) => ({
                          value: String(outcome.id),
                          label: outcome.text,
                        })) || []
                      }
                      onValueChange={(value) =>
                        field.onChange(value.map((val) => Number(val)))
                      }
                      // defaultValue={field.value}
                      placeholder={t("selectOutcomes")}
                      variant="inverted"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mx-auto block"
              disabled={isPending}
              type="submit"
            >
              {isPending ? t("submitting") : t("submit")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
