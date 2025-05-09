"use client";
import {
  Dialog,
  DialogContent,
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
import { useUpdataTopic } from "@/hooks/subject/useTopic";
import { schemaTopic, TTopic } from "@/lib/validations/subject/topic";
import { MultiSelect } from "@/components/ui/multi-selector";
import { CirclePlus } from "lucide-react";

type Props = {
  id: number;
  name: string;
  outcomes: number[];
};
export default function EditTopicDialog({
  id,
  outcomes: defaultOutcome,
  name,
}: Props) {
  const subjectID = usePathname().split("/")[2];
  const { data: outcomes } = useGetOutcome({ subjec: subjectID });
  const { mutate: editTopic, isPending } = useUpdataTopic(id);
  const form = useForm<TTopic>({
    resolver: zodResolver(schemaTopic),
    defaultValues: {
      name,
      subject: Number(subjectID) || undefined,
      outcomes: defaultOutcome,
    },
  });

  const onsubmit = (data: TTopic) => {
    editTopic(data);
  };

  useEffect(() => {
    if (subjectID) {
      form.reset({
        name,
        subject: Number(subjectID),
      });
    }
  }, [subjectID, form, name]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <CirclePlus />
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit Topic</DialogTitle>
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
                  <FormLabel>Topic Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Topic text"
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
                  <FormLabel>Outcomes</FormLabel>
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
                      defaultValue={defaultOutcome.map((outcome) =>
                        String(outcome)
                      )}
                      placeholder="Select Outcomes"
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
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
