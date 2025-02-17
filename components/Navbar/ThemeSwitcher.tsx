"use client";
import { useThemeStore } from "@/store/themeStore";
import { Sun, Moon } from "lucide-react";
import { useEffect } from "react";

export default function ThemeSwitcher({lang}: {lang: string}) {
  const { setTheme, theme } = useThemeStore();
  const handleClick = () => {
    setTheme();
  };


  useEffect(() => {
    (async () => {
      const localTheme = localStorage.getItem("theme");
      if (localTheme) {
        document.documentElement.setAttribute(
          "data-mode",
          JSON.parse(localTheme).state.theme
        );
        document.documentElement.className = JSON.parse(localTheme).state.theme;
      }
    })();
  }, [theme]);

  return (
    <div
    onClick={handleClick}
    className="w-14 h-8 flex items-center bg-gray-200 dark:bg-[#111113] rounded-full p-1 cursor-pointer transition relative"
  >
    <div
      className={`w-6 h-6 bg-white dark:bg-[#19191d] rounded-full shadow-md transform transition-transform ${
        theme === "dark" ? (lang === "ar" ? "-translate-x-6" : "translate-x-6") : "translate-x-0"
      }`}
    />
    <div className="absolute left-2 text-gray-600 dark:text-gray-400 text-xs">
      {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </div>
  </div>
  );
}
