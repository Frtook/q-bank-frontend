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
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useRef } from "react";

import { CloudUpload, Trash } from "lucide-react";

import { useAddDocument } from "@/hooks/useDocument";
import { TDocment, DocmentSchema } from "@/lib/validations/document";
import prettyBytes from "pretty-bytes";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AddDocumentDialog() {
  const subjectID = usePathname().split("/")[2];
  const { mutate: addDocument, isPending, isSuccess } = useAddDocument();
  const refClose = useRef<HTMLButtonElement>(null);

  const form = useForm<TDocment>({
    resolver: zodResolver(DocmentSchema),
    defaultValues: {
      name: "",
      file: undefined,
      subject: undefined,
    },
  });

  const onsubmit = (data: TDocment) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("file", data.file);
    formData.append("subject", String(data.subject));
    addDocument(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      refClose.current?.click();
    }
    return () => {};
  }, [isSuccess]);

  useEffect(() => {
    if (subjectID) {
      form.reset({
        file: undefined,
        name: "",
        subject: Number(subjectID),
      });
    }
  }, [subjectID, form]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Updoad File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new File</DialogTitle>
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
                  <FormLabel>File name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter file name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex h-32 w-full items-center justify-center">
                      <label
                        htmlFor="file"
                        className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-800"
                      >
                        {field.value ? (
                          <div className="flex justify-between bg-white p-4">
                            <div className="flex items-center gap-5 rounded-2xl">
                              <Image
                                src="/images/pdf.png"
                                alt="pdf"
                                width={100}
                                height={200}
                              />
                              <div>
                                <p className="font-bold">{field.value.name}</p>
                                <p className="text-gray-500">
                                  {prettyBytes(field.value.size)}
                                </p>
                              </div>
                              <Trash
                                onClick={(e) => {
                                  e.preventDefault();
                                  field.onChange(undefined);
                                }}
                                className="text-red-700"
                              />
                            </div>
                          </div>
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
                              PDF , DOCX , and TXT
                            </p>
                          </div>
                        )}

                        <Input
                          className="hidden"
                          accept="application/pdf , application/docx application/txt"
                          id="file"
                          type="file"
                          onChange={(value) =>
                            field.onChange(value.target.files?.[0])
                          }
                        />
                      </label>
                    </div>
                  </FormControl>
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
