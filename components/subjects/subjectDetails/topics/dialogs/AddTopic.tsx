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
import { useGetOutcome } from "@/hooks/useOutcome";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAddTopic } from "@/hooks/useTopic";
import { schemaTopic, TTopic } from "@/lib/validations/topic";
import { MultiSelect } from "@/components/ui/multi-selector";

export default function AddTopicDialog() {
  const subjectID = usePathname().split("/")[2];
  const { data: outcomes } = useGetOutcome();
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
    // console.log(data);
    addTopic(data);
  };

  useEffect(() => {
    if (subjectID) {
      form.reset({
        subject: Number(subjectID),
      });
    }
  }, [subjectID, form]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ New Topic</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Topic</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
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
                  <FormLabel>Topic Name</FormLabel>
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
                      placeholder="Select options"
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
