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
import { useAddOutcome } from "@/hooks/useOutcome";
import { TOutcome, schemaOutcome } from "@/lib/validations/outcome";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AddOutcomeDialog() {
  const subjectID = usePathname().split("/")[2];
  const { mutate: addOutcome, isPending } = useAddOutcome();
  const form = useForm<TOutcome>({
    resolver: zodResolver(schemaOutcome),
    defaultValues: {
      text: "",
      subject: Number(subjectID) || undefined,
    },
  });

  const onsubmit = (data: TOutcome) => {
    addOutcome(data);
    form.reset({
      text: "",
      subject: Number(subjectID),
    });
  };

  useEffect(() => {
    if (subjectID) {
      form.reset({
        text: "",
        subject: Number(subjectID),
      });
    }
  }, [subjectID, form]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ New Outcome</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
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
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outcome Text</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Outcome text"
                      {...field}
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
