// components/ui/TabsContainer.tsx
"use client";

import * as Tabs from "@radix-ui/react-tabs";
import React from "react";
import clsx from "clsx";
import { useLocale } from "next-intl";

type TabItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

type TabsContainerProps = {
  tabs: TabItem[];
  defaultValue: string;
  children: React.ReactNode;
  fullWidth?: boolean;
};

const TabsContainer: React.FC<TabsContainerProps> = ({
  tabs,
  defaultValue,
  children,
  fullWidth = false,
}) => {
  const locale = useLocale();
  return (
    <Tabs.Root defaultValue={defaultValue}>
      <Tabs.List
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={clsx(
          "mb-6 flex border-b border-gray-300 dark:border-gray-700",
          fullWidth && "w-full"
        )}
      >
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={clsx(
              "relative rounded-t-lg px-4 py-3 font-medium transition-all duration-200",
              "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100",
              "hover:bg-gray-100 dark:hover:bg-primary",
              "data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400",
              "data-[state=active]:bg-white dark:data-[state=active]:bg-[#19191d]",
              "data-[state=active]:font-semibold",
              "flex items-center gap-2",
              "focus-visible:ring-primary-500/50 outline-none focus-visible:ring-2",
              fullWidth ? "flex-1 justify-center" : "",
              // Bottom border indicator
              "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5",
              "after:bg-transparent after:transition-all after:duration-200",
              "data-[state=active]:after:bg-primary-600"
            )}
          >
            {tab.icon && <span className="text-lg">{tab.icon}</span>}
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div dir={locale === "ar" ? "rtl" : "ltr"}>{children}</div>
    </Tabs.Root>
  );
};

export default TabsContainer;
