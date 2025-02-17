"use client";
import { useThemeStore } from "@/store/themeStore";
import { Sun, Moon } from "lucide-react";
import { useEffect } from "react";
export default function Navbar() {
  const { setTheme, theme } = useThemeStore();
  const handelClick = () => {
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
    <div className="">
      {theme === "dark" ? (
        <Sun onClick={handelClick} />
      ) : (
        <Moon onClick={handelClick} />
      )}
    </div>
  );
}
