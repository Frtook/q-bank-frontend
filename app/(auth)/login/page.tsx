"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToken } from "@/hooks/useAuth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { schemaLogin, TschemaLogin } from "@/lib/validations/login";
import { useTranslations } from "next-intl";

const RegisterPage = () => {
  const t = useTranslations("login");
  const { mutate: login, isPending } = useToken();
  const form = useForm<TschemaLogin>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (data: TschemaLogin) => login(data);
  return (
    <div className="mt-24 flex items-center justify-center bg-cover bg-center">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="flex flex-col gap-3">
          <h1 className="text-center text-2xl font-bold">{t("welcome")}</h1>
          <p className="text-center text-sm text-gray-500">
            {t("noaccount")}
            <Link href="register">
              <Button
                className="mx-2"
                variant="outline"
              >
                {t("register")}
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
                  <FormDescription>{t("usernameDescription")}</FormDescription>
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
                  <FormDescription>{t("passwordDescription")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              variant={isPending ? "secondary" : "default"}
              type="submit"
              className="w-full"
            >
              {t("submit")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
