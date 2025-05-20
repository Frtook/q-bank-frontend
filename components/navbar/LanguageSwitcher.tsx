"use client";

import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import Cookies from "js-cookie";
const LanguageSwitcher = () => {
  const router = useRouter();
  const lang = useLocale();

  const toggleLocale = async () => {
    router.refresh();
    if (lang == "ar") {
      Cookies.set("locale", "en");
    } else {
      Cookies.set("locale", "ar");
    }
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex gap-1"
    >
      <Globe />
      <span>{lang === "en" ? "AR" : "EN"}</span>
    </button>
  );
};

export default LanguageSwitcher;
