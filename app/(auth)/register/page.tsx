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
    <div className="container mx-auto mt-24 flex items-center justify-center">
      <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {t("createAccount")}
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {t("alreadyHaveAccount")}{" "}
            <Link href="login">
              <Button
                className="ml-2"
                variant="outline"
              >
                {t("login")}
              </Button>
            </Link>
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      {t("fullName")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fullName")}
                        {...field}
                        className="rounded-md border-gray-300 dark:border-gray-600"
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
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      {t("username")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("username")}
                        {...field}
                        className="rounded-md border-gray-300 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="academyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      {t("academyName")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("academyName")}
                        {...field}
                        className="rounded-md border-gray-300 dark:border-gray-600"
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
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      {t("email")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("email")}
                        {...field}
                        className="rounded-md border-gray-300 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    {t("password")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("password")}
                      type="password"
                      {...field}
                      className="rounded-md border-gray-300 dark:border-gray-600"
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
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    {t("reperPass")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("reperPass")}
                      type="password"
                      {...field}
                      className="rounded-md border-gray-300 dark:border-gray-600"
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
              className="w-full rounded-md"
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
