"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const [locale, setLocale] = useState("");

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale"))
      ?.split("=")[1];
    if (cookieLocale) {
      if (cookieLocale === "ar") {
        document.dir = "rtl";
      } else {
        document.dir = "ltr";
      }
      setLocale(cookieLocale);
    } else {
      const brwoerLocale = navigator.language.slice(0, 2);
      setLocale(brwoerLocale);
      document.cookie = `locale=${brwoerLocale}`;
      router.refresh();
    }
  }, [router]);

  const changeLocale = (newLocale: string) => {
    if (newLocale === "ar") {
      document.dir = "rtl";
    } else {
      document.dir = "ltr";
    }
    setLocale(newLocale);
    document.cookie = `locale=${newLocale}`;
    router.refresh();
  };

  return (
    <select
      value={locale}
      onChange={(e) => changeLocale(e.target.value as "en" | "ar")}
      className="p-2 border rounded-md"
    >
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
};

export default LanguageSwitcher;
