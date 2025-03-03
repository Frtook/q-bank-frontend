"use client";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegister } from "@/hook/useAuth";

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TschemaRegester>({
    resolver: zodResolver(schemaRegester),
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
              <Button className="p-2 mx-2" variant="primary">
                {t("login")}
              </Button>
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <p>Fullname</p>
          <Input
            {...register("fullname")}
            type="text"
            placeholder={t("fullName")}
          />
          {errors.fullname && (
            <p className="text-red-500">{errors.fullname.message}</p>
          )}
          <p>Username</p>
          <Input
            {...register("username")}
            type="text"
            placeholder={t("username")}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          <p>Email</p>
          <Input {...register("email")} type="email" placeholder={t("email")} />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <p>Password</p>
          <Input
            {...register("password")}
            type="password"
            placeholder={t("password")}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <p>Repey Password</p>
          <Input
            {...register("password2")}
            type="password"
            placeholder="repete password"
          />
          {errors.password2 && (
            <p className="text-red-500">{errors.password2.message}</p>
          )}
          <p>Academy name</p>
          <Input
            {...register("academyName")}
            type="text"
            placeholder="Acadmey name"
          />
          {errors.academyName && (
            <p className="text-red-500">{errors.academyName.message}</p>
          )}
          <Button
            disabled={isSubmitting}
            className="p-4"
            variant={isSubmitting ? "disabled" : "primary"}
          >
            {t("createAccountButton")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
