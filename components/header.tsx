import React from "react";
import Breadcrumb from "./breadcrumb";
import LanguageSwitcher from "./Navbar/LanguageSwitcher";
import ThemeSwitcher from "./Navbar/ThemeSwitcher";

export default function Header({ lang }: { lang: string }) {
  return (
    <div className="flex h-fit w-full items-center justify-between rounded-lg bg-white px-6 py-4 shadow-sm dark:bg-[#19191d]">
      <Breadcrumb />
      <div className="flex items-center gap-4">
        <LanguageSwitcher lang={lang} />
        <ThemeSwitcher lang={lang} />
      </div>
    </div>
  );
}
