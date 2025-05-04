"use client";

import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { setCookies } from "@/lib/helperServer";

const LanguageSwitcher = () => {
  const router = useRouter();
  const lang = useLocale();

  const toggleLocale = async () => {
    const days = 60 * 60 * 24 * 7;
    router.refresh();
    if (lang == "ar") {
      await setCookies("locale", "en", days);
    } else {
      await setCookies("locale", "ar", days);
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
