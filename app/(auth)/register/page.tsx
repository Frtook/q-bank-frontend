import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import Link from "next/link";

const RegisterPage = () => {
  const t = useTranslations("Regester");
  return (
    <div className="grid grid-cols-1 container mx-auto mt-10 md:grid-cols-2 p-2 md:p-6">
      <div className="border dark:border-white border-black rounded hidden md:block "></div>
      <div className=" mx-auto  md:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold">{t("createAccount")}</h1>
          <p className="text-gray-500 text-sm">
            {t("alreadyHaveAccount")}
            <Link href="login">
              <Button variant="primary">{t("login")}</Button>
            </Link>
          </p>
        </div>
        <form className="flex flex-col gap-5">
          <Input placeholder={t("fullName")}></Input>
          <Input placeholder={t("username")} />
          <Input placeholder={t("email")} />
          <Input placeholder={t("password")} />
          <Button>{t("createAccountButton")}</Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
