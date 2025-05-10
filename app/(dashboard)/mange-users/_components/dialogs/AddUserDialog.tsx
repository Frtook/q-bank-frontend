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
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect, useRef } from "react";
import { useAddMangeUser } from "@/hooks/useMageUsers";
import { schemaUser, SchemaUser } from "@/lib/validations/mange-user";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "next-intl";

export default function AddUserDialog() {
  const t = useTranslations("dialogs");
  const { mutate: addUser, isPending, isSuccess } = useAddMangeUser();
  const refClose = useRef<HTMLButtonElement>(null);
  const form = useForm<SchemaUser>({
    resolver: zodResolver(schemaUser),
    defaultValues: {
      email: "",
      fullname: "",
      is_activ: false,
      username: "",
    },
  });

  const onsubmit = (data: SchemaUser) => addUser(data);

  useEffect(() => {
    if (isSuccess) {
      refClose.current?.click();
    }
    return () => {};
  }, [isSuccess]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t("addUser")}</Button>
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FullName</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter FyllName"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_activ"
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
