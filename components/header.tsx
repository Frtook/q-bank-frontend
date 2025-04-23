import React from "react";
import LanguageSwitcher from "./Navbar/LanguageSwitcher";
import ThemeSwitcher from "./Navbar/ThemeSwitcher";
import { SidebarTrigger } from "./ui/sidebar";
import Breadcrumbs from "./breadcrumb";

export default function Header() {
  return (
    <div className="flex h-fit w-full items-center justify-between rounded-lg bg-white px-6 py-4 shadow-sm dark:bg-[#19191d]">
      <SidebarTrigger />
      <Breadcrumbs />
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
}
