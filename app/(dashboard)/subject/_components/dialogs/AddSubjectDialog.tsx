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
  SchemaSubject,
  schemaSubject,
} from "@/lib/validations/subject/subject";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useGetacademy } from "@/hooks/useAcademy";
import { useAddSubject } from "@/hooks/subject/useSubject";
import { useTranslations } from "next-intl";

export default function AddSubjectDialog() {
  const t = useTranslations("");
  const { data: academies } = useGetacademy();
  const { mutate: addSubject, isPending, isSuccess } = useAddSubject();
  const refClose = useRef<HTMLButtonElement>(null);
  const form = useForm<SchemaSubject>({
    resolver: zodResolver(schemaSubject),
    defaultValues: {
      name: "",
      academy: undefined,
    },
  });

  const onsubmit = (data: SchemaSubject) => {
    addSubject(data);
  };

  useEffect(() => {
    if (isSuccess) {
      refClose.current?.click();
    }
    return () => {};
  }, [isSuccess]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t("dialogs.addNewSubject")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("subject.home.newSubject")}</DialogTitle>
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
                  <FormLabel>{t("subject.home.name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("subject.home.academyPlaseholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="academy"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{t("subject.home.academyName")}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? academies?.find(
                                (academy) => academy.id === Number(field.value)
                              )?.name
                            : t("subject.home.selectAcademy")}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder={t("subject.home.searchAcademy")}
                        />
                        <CommandList>
                          <CommandEmpty>
                            {t("subject.home.noAcademy")}
                          </CommandEmpty>
                          <CommandGroup>
                            {academies?.map((academy) => (
                              <CommandItem
                                value={academy.name}
                                key={academy.id}
                                onSelect={() => {
                                  form.setValue("academy", academy.id);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    academy.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {academy.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mx-auto block"
              disabled={isPending}
              type="submit"
            >
              {isPending
                ? t("subject.home.Submitting")
                : t("subject.home.submit")}
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
