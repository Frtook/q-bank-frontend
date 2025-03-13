"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegister } from "@/hook/useAuth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const schemaRegester = z
  .object({
    fullname: z.string().min(3, "the full name must have 3 characters"),
    username: z.string().min(3, "the username must have 3 characters"),
    email: z.string().email(),
    password: z.string().min(8, "the password shuld be more than 8"),
    password2: z.string(),
    academyName: z.string().min(3, "the academy name must have 3 characters"),
  })
  .refine((data) => data.password === data.password2, {
    message: "password not match",
    path: ["password2"],
  });
type TschemaRegester = z.infer<typeof schemaRegester>;

const RegisterPage = () => {
  const { mutate } = useRegister();
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

  const t = useTranslations("Regester");
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
    <div className="grid grid-cols-1 container mx-auto  md:grid-cols-2 p-2 md:p-6">
      <div className="border dark:border-white border-black rounded hidden md:block "></div>
      <div className=" mx-auto  md:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold">{t("createAccount")}</h1>
          <p className="text-gray-500 text-sm">
            {t("alreadyHaveAccount")}
            <Link href="login">
              <Button className=" mx-2" variant="default">
                {t("login")}
              </Button>
            </Link>
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input placeholder="fullname" {...field} />
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
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
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
                    <Input placeholder="Enter email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
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
                  <FormLabel>Repey Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Repey Password"
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
                  <FormLabel>Academy name</FormLabel>
                  <FormControl>
                    <Input placeholder="Academy name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
