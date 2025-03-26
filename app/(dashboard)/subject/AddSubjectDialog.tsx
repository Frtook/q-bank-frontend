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
import { schemaSubject, TschemaSubject } from "@/lib/validations/subject";
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
import { useGetacademy } from "@/hook/useAcademy";
export const languages = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "French",
    value: "fr",
  },
  {
    label: "German",
    value: "de",
  },
  {
    label: "Spanish",
    value: "es",
  },
  {
    label: "Portuguese",
    value: "pt",
  },
  {
    label: "Russian",
    value: "ru",
  },
  {
    label: "Japanese",
    value: "ja",
  },
  {
    label: "Korean",
    value: "ko",
  },
  {
    label: "Chinese",
    value: "zh",
  },
];
export default function AddSubjectDialog() {
  const { data: academies } = useGetacademy();
  const refClose = useRef<HTMLButtonElement>(null);
  const form = useForm<TschemaSubject>({
    resolver: zodResolver(schemaSubject),
    defaultValues: {
      name: "",
      academy: undefined,
    },
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      refClose.current?.click();
    }
    return () => {};
  }, [form.formState.isSubmitSuccessful]);

  const onSubmit = (data: TschemaSubject) => {
    console.log(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Subject</Button>
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
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto max-w-3xl space-y-8 py-10"
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
              name="academy"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>academy name</FormLabel>
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
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandList>
                          <CommandEmpty>No language found.</CommandEmpty>
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
              disabled={form.formState.isSubmitting}
              type="submit"
            >
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
