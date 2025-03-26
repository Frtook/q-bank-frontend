"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToken } from "@/hook/useAuth";
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

const RegisterPage = () => {
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
    <div className="container mx-auto grid grid-cols-1 p-2 md:grid-cols-2 md:p-6">
      <div className="hidden rounded border border-black dark:border-white md:block"></div>
      <div className="mx-auto md:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p className="text-sm text-gray-500">
            Don&apos;t have an account yet?
            <Link href="register">
              <Button
                className="mx-2"
                variant="default"
              >
                register
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
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Username must have 3 characters
                  </FormDescription>
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
                    <Input
                      placeholder="password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Password must be at least 8 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              variant={isPending ? "secondary" : "default"}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
