"use client";

import { JSX, useState } from "react";
import {
  Home,
  ScrollText,
  FilePenLine,
  Bot,
  Users,
  Menu,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Hash,
  School,
  Book,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ lang }: { lang: string }) => {
  const t = useTranslations("navitems");
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const toggleSubItems = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Example dynamic data (can be replaced with API data in the future)
  const navItems = [
    { href: "/", icon: <Home />, label: t("dashboard"), subItems: [] },
    {
      key: "questions", // Unique key for toggling
      icon: <ScrollText />,
      label: t("questions"),
      subItems: [{ href: "/questions", label: "test" }],
    },
    {
      key: "academy", // Unique key for toggling
      icon: <School />,
      label: t("academy"),
      subItems: [],
    },
    {
      key: "subject", // Unique key for toggling
      icon: <Book />,
      label: t("subject"),
      subItems: [],
    },
    {
      key: "exams", // Unique key for toggling
      icon: <FilePenLine />,
      label: t("exams"),
      subItems: [{ href: "/exams", label: "test", icon: <Book /> }],
    },
    {
      href: "/ai",
      icon: <Bot />,
      label: t("ai"),
      disabled: true,
      subItems: [],
    },
    {
      href: "/users",
      icon: <Users />,
      label: t("users"),
      disabled: true,
      subItems: [],
    },
    {
      href: "/settings",
      icon: <SlidersHorizontal />,
      label: t("settings"),
      disabled: true,
      subItems: [],
    },
  ];

  return (
    <div
      className={`relative h-screen rounded-lg bg-white p-4 text-primary shadow-sm transition-all duration-300 dark:bg-[#19191d] ${collapsed ? "w-20" : "w-64"}`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`absolute ${lang === "en" ? "-right-4" : "-left-4"} top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-primary p-2 text-white opacity-35 shadow-lg transition-all duration-300 hover:opacity-100`}
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="mb-6 flex items-center justify-center space-x-2 border-b border-gray-200 py-8 dark:border-primary">
        {!collapsed && (
          <span className="text-xl font-semibold text-primary dark:text-white">
            {t("title")}
          </span>
        )}
      </div>

      <nav
        className={`space-y-4 ${collapsed ? "flex flex-col items-center" : ""}`}
      >
        {navItems.map((item) => (
          <SidebarItem
            lang={lang}
            key={item.key || item.href} // Use key or href as a unique identifier
            href={item.href}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
            isActive={pathname === item.href}
            disabled={item.disabled}
            subItems={item.subItems}
            expanded={expandedItems[item.key ?? item.href ?? ""]}
            onToggle={() => item.key && toggleSubItems(item.key)}
          />
        ))}
      </nav>
    </div>
  );
};

const SidebarItem = ({
  href,
  icon,
  label,
  collapsed,
  isActive,
  disabled = false,
  subItems,
  expanded,
  onToggle,
  lang,
}: {
  href?: string;
  icon: JSX.Element;
  label: string;
  collapsed: boolean;
  isActive: boolean;
  disabled?: boolean;
  subItems?: { href: string; label: string }[];
  expanded?: boolean;
  onToggle?: () => void;
  lang: string;
}) => {
  const hasSubItems = subItems && subItems.length > 0;

  return (
    <div>
      {/* Render as a link if there are no subitems */}
      {!hasSubItems && href && (
        <Link
          href={disabled ? "#" : href}
          className={`group relative flex items-center gap-2 space-x-3 rounded-lg p-3 transition ${
            isActive
              ? "bg-primary font-bold text-white"
              : "text-primary hover:bg-gray-200 dark:text-white dark:hover:bg-primary"
          } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          aria-disabled={disabled}
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
            }
          }}
        >
          {icon}
          {!collapsed && <span>{label}</span>}
          {collapsed && (
            <span
              className={`absolute ${lang === "en" ? "left-full ml-2" : "right-full mr-2"} w-fit text-nowrap rounded-md border border-gray-200 bg-white px-3 py-1 text-base text-primary opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100`}
            >
              {label}
            </span>
          )}
        </Link>
      )}

      {/* Render as a toggleable item if there are subitems */}
      {hasSubItems && (
        <div
          className={`group relative flex items-center gap-2 space-x-3 rounded-lg p-3 transition dark:text-white ${
            isActive
              ? "bg-primary font-bold"
              : "hover:bg-gray-200 dark:hover:bg-primary"
          } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          onClick={() => {
            if (!disabled) {
              onToggle?.();
            }
          }}
        >
          {icon}
          {!collapsed && <span>{label}</span>}
          {collapsed && (
            <span
              className={`absolute ${lang === "en" ? "left-full ml-2" : "right-full mr-2"} w-fit text-nowrap rounded-md border border-gray-200 bg-white px-3 py-1 text-base text-primary opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100`}
            >
              {label}
            </span>
          )}
          {!collapsed && (
            <span className="ml-auto transition-transform duration-300">
              {expanded ? <ChevronUp /> : <ChevronDown />}
            </span>
          )}
        </div>
      )}

      {/* Render subitems if expanded */}
      {hasSubItems && !collapsed && (
        <div
          className={`overflow-hidden transition-all duration-300 ${
            expanded ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className={`${lang === "en" ? "pl-4" : "pr-4"} mt-2 space-y-2`}>
            {subItems.map((subItem, index) => (
              <Link
                key={index}
                href={subItem.href}
                className={`flex items-center gap-2 rounded-lg p-2 transition ${
                  isActive
                    ? "bg-primary font-bold text-white"
                    : "text-primary hover:bg-gray-200 dark:text-white dark:hover:bg-primary"
                }`}
              >
                <Hash className="" />
                <span>{subItem.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
