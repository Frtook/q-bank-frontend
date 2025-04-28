"use client";
import {
  Dialog,
  DialogClose,
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
import { useEditOutcome } from "@/hooks/useOutcome";
import { TOutcome, schemaOutcome } from "@/lib/validations/outcome";
import { useEffect, useRef } from "react";
import { SquarePen } from "lucide-react";

type Props = {
  id: number;
  text: string;
  subject: number;
};
export default function EditOutcomeDialog({ text, subject, id }: Props) {
  const refClose = useRef<HTMLButtonElement>(null);
  const { mutate: editOutcome, isPending, isSuccess } = useEditOutcome(id);
  const form = useForm<TOutcome>({
    resolver: zodResolver(schemaOutcome),
    defaultValues: {
      text,
      subject,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      refClose.current?.click();
    }
    return () => {};
  }, [isSuccess]);

  const onsubmit = (data: TOutcome) => {
    editOutcome(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePen style={{ width: "20px", height: "20px" }} />
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
      <DialogClose asChild>
        <button
          ref={refClose}
          className="hidden"
        ></button>
      </DialogClose>
    </Dialog>
  );
}
