"use client";
import { useThemeStore } from "@/store/themeStore";
import { useEffect, useState } from "react";

export default function Hydrated({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    (async () => {
      await useThemeStore.persist.rehydrate();
      setIsHydrated(true);
    })();
  }, []);

  return isHydrated && <>{children}</>;
}
