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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAddPrivilege } from "@/hooks/permission/usePrivilege";
import { TPermission, schemaPermission } from "@/lib/validations/permission";
import { useGetPermission } from "@/hooks/permission/usePermission";
import { useGetMangeUser } from "@/hooks/permission/useMageUsers";
import { SingleSelect } from "@/components/ui/single-select";
import { useTranslations } from "next-intl";

export default function AddPermissionDialog() {
  const t = useTranslations("dialogs");
  const subjectID = usePathname().split("/")[2];
  const { mutate: addPrivilege, isPending, isSuccess } = useAddPrivilege();
  const { data: permission } = useGetPermission({
    type: "subject",
  });
  const { data: users } = useGetMangeUser();
  const refClose = useRef<HTMLButtonElement>(null);

  const form = useForm<TPermission>({
    resolver: zodResolver(schemaPermission),
    defaultValues: {
      permission: undefined,
      user: undefined,
      object_pk: subjectID,
    },
  });

  const onsubmit = (data: TPermission) => {
    addPrivilege(data);
  };

  useEffect(() => {
    if (subjectID) {
      form.reset({
        object_pk: subjectID,
      });
    }
  }, [subjectID, form]);

  useEffect(() => {
    if (isSuccess) {
      refClose.current?.click();
    }
    return () => {};
  }, [isSuccess]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t("addNewPermission")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("addPermission")}</DialogTitle>
          <DialogDescription>{t("actionCannotBeUndone")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="mx-auto max-w-3xl space-y-8 py-10"
          >
            <FormField
              control={form.control}
              name="permission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("permissionLabel")}</FormLabel>
                  <SingleSelect
                    options={
                      permission?.map((perm) => ({
                        value: String(perm.id),
                        label: perm.name,
                      })) || []
                    }
                    placeholder={t("permissionPlaceholder")}
                    onValueChange={(value) => field.onChange(Number(value))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("userLabel")}</FormLabel>
                  <SingleSelect
                    options={
                      users?.map((user) => ({
                        value: String(user.id),
                        label: user.fullname,
                      })) || []
                    }
                    placeholder={t("userPlaceholder")}
                    onValueChange={(value) => field.onChange(Number(value))}
                  />
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
      <DialogClose asChild>
        <button
          ref={refClose}
          className="hidden"
        ></button>
      </DialogClose>
    </Dialog>
  );
}
