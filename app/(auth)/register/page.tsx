"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRegister } from "@/hooks/useAuth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { schemaRegester, TschemaRegester } from "@/lib/validations/register";

const RegisterPage = () => {
  const { mutate, isPending } = useRegister();
  const form = useForm<TschemaRegester>({
    resolver: zodResolver(schemaRegester),
    defaultValues: {
      username: "",
      password: "",
      academyName: "",
      email: "",
      fullname: "",
      password2: "",
    },
  });

  const t = useTranslations("regester");
  const onSubmit = async (data: TschemaRegester) => {
    const { fullname, username, email, password, password2, academyName } =
      data;
    mutate({
      fullname,
      username,
      email,
      password,
      password2,
      academy: { name: academyName },
    });
  };
  return (
    <div className="container mx-auto grid grid-cols-1 p-2 md:grid-cols-2 md:p-6">
      <div className="hidden rounded border border-black dark:border-white md:block"></div>
      <div className="mx-auto md:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold">{t("createAccount")}</h1>
          <p className="text-sm text-gray-500">
            {t("alreadyHaveAccount")}
            <Link href="login">
              <Button
                className="mx-2"
                variant="default"
              >
                {t("login")}
              </Button>
            </Link>
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fullName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("fullName")}
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
                      placeholder={t("username")}
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
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("email")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("password")}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("reperPass")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("reperPass")}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="academyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("academyName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("academyName")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              variant={isPending ? "secondary" : "default"}
              type="submit"
            >
              {t("createAccountButton")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
