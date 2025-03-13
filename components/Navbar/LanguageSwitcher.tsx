"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { Globe } from "lucide-react";

const LanguageSwitcher = ({ lang }: { lang: string }) => {
  const router = useRouter();

  useEffect(() => {
    document.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const toggleLocale = useCallback(() => {
    const newLocale = lang === "en" ? "ar" : "en";
    document.dir = newLocale === "ar" ? "rtl" : "ltr";
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year expiration
    router.refresh();
  }, [lang, router]);

  return (
    <button onClick={toggleLocale} className="flex gap-1">
      <Globe className="" />
      <span>{lang === "en" ? "AR" : "EN"}</span>
    </button>
  );
};

export default LanguageSwitcher;
