import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { SidebarTrigger } from "../ui/sidebar";
import UserIcon from "./userIcon";
import Breadcrumbs from "./breadcrumb";

export default function Header() {
  return (
    <div className="mx-6 flex h-fit w-full items-center justify-between rounded-lg bg-white px-6 py-4 shadow-sm dark:bg-secondary">
      <div className="flex items-center gap-10">
        <SidebarTrigger />
        <Breadcrumbs />
      </div>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <ThemeSwitcher />
        <UserIcon />
      </div>
    </div>
  );
}
