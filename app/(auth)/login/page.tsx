"use client";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToken } from "@/hook/useAuth";

const schemaLogin = z.object({
  username: z.string().min(3, "the username must have 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type TschemaLogin = z.infer<typeof schemaLogin>;

const RegisterPage = () => {
  const { mutate: login } = useToken();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TschemaLogin>({
    resolver: zodResolver(schemaLogin),
  });

  const onSubmit = async (data: TschemaLogin) => {
    login(data);

    reset();
  };
  return (
    <div className="grid grid-cols-1 container mx-auto  md:grid-cols-2 p-2 md:p-6">
      <div className="border dark:border-white border-black rounded hidden md:block "></div>
      <div className=" mx-auto  md:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p className="text-gray-500 text-sm">
            Don't have an accont yet?
            <Link href="register">
              <Button className="p-2 mx-2" variant="primary">
                register
              </Button>
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <label>
            <p className="mt-5">Enter Username</p>
            <Input
              {...register("username")}
              type="text"
              placeholder="username"
            />
          </label>
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          <label>
            <p>Enter your Password</p>
            <Input
              {...register("password")}
              type="password"
              placeholder="password"
            />
          </label>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          {/* {message && <span className="text-red-500">{message}</span>} */}
          <Button
            className="p-2"
            disabled={isSubmitting}
            variant={isSubmitting ? "disabled" : "primary"}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
