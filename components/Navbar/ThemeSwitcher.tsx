"use client";
import { useThemeStore } from "@/store/themeStore";
import { Sun, Moon } from "lucide-react";
import { useEffect } from "react";

export default function ThemeSwitcher({ lang }: { lang: string }) {
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
      className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-gray-200 p-1 transition dark:bg-[#111113]"
    >
      <div
        className={`h-6 w-6 transform rounded-full bg-white shadow-md transition-transform dark:bg-[#19191d] ${
          theme === "dark"
            ? lang === "ar"
              ? "-translate-x-6"
              : "translate-x-6"
            : "translate-x-0"
        }`}
      />
      <div className="absolute left-2 text-xs text-gray-600 dark:text-gray-400">
        {theme === "dark" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </div>
    </div>
  );
}
