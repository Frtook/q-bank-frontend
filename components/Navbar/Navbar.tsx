import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  return (
    <div className=" flex justify-between items-center">
      <h1>App</h1>
      <LanguageSwitcher />
      <ThemeSwitcher />
    </div>
  );
}
