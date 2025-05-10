"use client";
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
import { useGetProfile, useUpdateProfile } from "@/hooks/useProfile";
import { schemaProfile, TschemaProfile } from "@/lib/validations/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const { data: profile } = useGetProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const form = useForm({
    resolver: zodResolver(schemaProfile),
    defaultValues: { fullname: "", email: "", username: "" },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        fullname: profile.fullname,
        email: profile.email,
        username: profile.username,
      });
    }
  }, [profile, form]);

  const onSubmit = (data: TschemaProfile) => updateProfile(data);
  const locale = useLocale();
  const t = useTranslations("profile");
  return (
    <div className="space-y-5">
      <div
        className={`h-60 rounded-xl bg-gradient-to-r ${locale === "en" ? "from-[#0C7FDA] to-white dark:from-primary dark:to-secondary" : "from-white to-[#0C7FDA] dark:from-secondary dark:to-primary"} p-10 text-[#E9F5FE]`}
      >
        <p className="font-semibold">{profile?.username}</p>
        <p className="mt-5 text-3xl font-bold">{profile?.fullname}</p>
        <p className="text-xl text-gray-300">{profile?.email}</p>
      </div>
      <div className="p-4">
        <p className="text-xl font-bold">{t("personalInfo")}</p>
        <p className="mt-4 text-gray-500">{t("updateDetails")}</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 rounded-xl bg-white p-4 dark:bg-secondary"
          >
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fullname")}</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:border-white"
                        placeholder={t("fullnamePlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("username")}</FormLabel>
                    <FormControl>
                      <Input
                        className="dark:border-white"
                        placeholder={t("usernamePlaceholder")}
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
                  <FormItem className="col-span-2">
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="dark:border-white"
                        placeholder={t("emailPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-5 flex justify-end gap-5">
              <Link href="/">
                <Button variant="secondary">{t("cancel")}</Button>
              </Link>
              <Button
                type="submit"
                disabled={isPending}
              >
                {isPending ? t("saving") : t("saveChanges")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
