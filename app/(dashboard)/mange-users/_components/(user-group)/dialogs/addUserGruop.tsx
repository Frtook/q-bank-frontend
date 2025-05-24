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
import {
  SchemaUserGroupPermissioin,
  schemaUserGroupPermissioin,
} from "@/lib/validations/permission/user-group-permission";
import { useAddGruopPermission } from "@/hooks/permission/useGroupPermission";
import { MultiSelect } from "@/components/ui/multi-selector";
import { useGetPermission } from "@/hooks/permission/usePermission";
import { IsDev } from "@/lib/helperClient";

export default function AddUserGruopDialog() {
  const {
    mutate: addUserGruop,
    isPending,
    isSuccess,
  } = useAddGruopPermission();
  const refClose = useRef<HTMLButtonElement>(null);
  const form = useForm<SchemaUserGroupPermissioin>({
    resolver: zodResolver(schemaUserGroupPermissioin),
    defaultValues: {
      name: "",
    },
  });

  const { data: permissions } = useGetPermission({});
  const onsubmit = (data: SchemaUserGroupPermissioin) => addUserGruop(data);

  useEffect(() => {
    if (isSuccess) {
      refClose.current?.click();
    }
    return () => {};
  }, [isSuccess]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Gruop</Button>
      </DialogTrigger>
      <DialogContent>
        {IsDev() && JSON.stringify(form.formState.errors)}
        <DialogHeader>
          <DialogTitle>Add Gruop</DialogTitle>
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
                  <FormLabel>Name of Gruop</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permissions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permission</FormLabel>
                  <FormControl>
                    <MultiSelect
                      className="border-2"
                      onValueChange={field.onChange}
                      options={
                        permissions?.map((permission) => ({
                          value: String(permission.id),
                          label: permission.name,
                        })) || []
                      }
                      placeholder="Select Permission"
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
