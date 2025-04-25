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
import { Checkbox } from "@/components/ui/checkbox";
import UploadFile from "@/components/UploadFile";
import { useUpdateAcademy } from "@/hooks/useAcademy";
import { Academy, AcademySchema } from "@/lib/validations/academy";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useRef } from "react";
import { PenLine } from "lucide-react";

type AcademyProps = {
  id: number;
  name: string;
  active: boolean;
  url?: string;
};

export default function EditAcademyDialog({
  active,
  name,
  url,
  id,
}: AcademyProps) {
  const { mutate: updateAcademy, isPending: isUpdated } = useUpdateAcademy();
  const refClose = useRef<HTMLButtonElement>(null);

  const form = useForm<Academy>({
    resolver: zodResolver(AcademySchema),
    defaultValues: {
      active,
      name,
      logo: undefined,
    },
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      refClose.current?.click();
    }
  }, [form.formState.isSubmitSuccessful]);

  const handleSubmit = (data: Academy) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("active", data.active.toString());
    if (data.logo) {
      formData.append("logo", data.logo);
    }

    updateAcademy({ id, formData });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer justify-between gap-3">
          <p>Update</p>
          <PenLine />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Academy</DialogTitle>
          <DialogDescription>
            Fill out the form below to update an academy.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mx-auto max-w-3xl space-y-8 py-10"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter academy name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <UploadFile
                      id="dropzone-file"
                      file={field.value}
                      url={url}
                    >
                      <Input
                        className="hidden"
                        accept="image/jpeg, image/jpg, image/png, image/webp"
                        id="dropzone-file"
                        type="file"
                        onChange={(event) => {
                          field.onChange(event.target.files?.[0]);
                        }}
                      />
                    </UploadFile>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
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
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              disabled={isUpdated}
              type="submit"
            >
              {isUpdated ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
      <DialogClose asChild>
        <button
          ref={refClose}
          className="hidden"
          aria-hidden="true"
        >
          hidden
        </button>
      </DialogClose>
    </Dialog>
  );
}
