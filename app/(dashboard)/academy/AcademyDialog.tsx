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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import UploadFile from "@/components/UploadFile";
import { useAddAcademy, useUpdateAcademy } from "@/hook/useAcademy";
import { AddAcademySchema, addAcademySchema } from "@/lib/validations/academy";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useRef } from "react";

type AcademyProps = {
  id: number;
  name: string;
  active: boolean;
  url?: string;
  isUpdate: boolean;
};
export default function AcademyDialog({
  active,
  name,
  url,
  isUpdate,
  id,
}: AcademyProps) {
  const { mutate: addAcademy } = useAddAcademy();
  const { mutate: UpdateAcademy } = useUpdateAcademy();
  const refClose = useRef<HTMLButtonElement>(null);
  const form = useForm<AddAcademySchema>({
    resolver: zodResolver(addAcademySchema),
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
    return () => {};
  }, [form.formState.isSubmitSuccessful]);

  const onSubmit = (data: AddAcademySchema) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("active", data.active.toString());
    if (data.logo) {
      formData.append("logo", data.logo);
    }
    isUpdate ? UpdateAcademy({ id, formData }) : addAcademy(formData);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{isUpdate ? "update" : "Add Academy"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "update academy" : "Add Academy"}
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter academy name" {...field} />
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
                  <FormLabel>images</FormLabel>
                  <FormControl>
                    <UploadFile id="dropzone-file" file={field.value} url={url}>
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
                  <FormDescription>upload images.</FormDescription>
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
                    <FormDescription>this is a description</FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
      <DialogClose asChild>
        <button ref={refClose} className="hidden"></button>
      </DialogClose>
    </Dialog>
  );
}
