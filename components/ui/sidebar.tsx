"use client";

import { JSX, useState } from "react";
import { Home, ScrollText, FilePenLine, Bot, Users, Menu, SlidersHorizontal, ChevronDown, ChevronUp, Hash  } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ lang }: { lang: string }) => {
  const t = useTranslations("navitems");
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

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
      subItems: [
        { href: "/questions/math", label: "test" },
      ],
    },
    {
      key: "exams", // Unique key for toggling
      icon: <FilePenLine />,
      label: t("exams"),
      subItems: [
        { href: "/exams/math", label: "test" },
      ],
    },
    { href: "/ai", icon: <Bot />, label: t("ai"), disabled: true, subItems: [] },
    { href: "/users", icon: <Users />, label: t("users"), disabled: true, subItems: [] },
    { href: "/settings", icon: <SlidersHorizontal />, label: t("settings"), disabled: true, subItems: [] },
  ];

  return (
    <div className={`h-screen bg-white dark:bg-[#19191d] text-primary p-4 transition-all duration-300 shadow-sm rounded-lg relative ${collapsed ? 'w-20' : 'w-64'}`}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`absolute ${lang === 'en' ? '-right-4' : '-left-4'} top-1/2 transform -translate-y-1/2 bg-primary opacity-35 text-white rounded-full p-2 shadow-lg hover:opacity-100 transition-all duration-300 z-10`}
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex items-center justify-center space-x-2 mb-6 py-8 border-b border-gray-200 dark:border-primary">
        {!collapsed && <span className="text-xl font-semibold  text-primary dark:text-white">{t("title")}</span>}
      </div>

      <nav className={`space-y-4 ${collapsed ? 'flex flex-col items-center' : ''}`}>
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
            expanded={expandedItems[item.key ?? item.href ?? '']}
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
  lang
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
  lang:string
}) => {
  const hasSubItems = subItems && subItems.length > 0;

  return (
    <div>
      {/* Render as a link if there are no subitems */}
      {!hasSubItems && href && (
        <Link
          href={disabled ? "#" : href}
          className={`group relative flex items-center gap-2 space-x-3 p-3 rounded-lg transition  ${
            isActive ? 'bg-primary font-bold text-white' : 'hover:bg-gray-200 dark:hover:bg-primary text-primary dark:text-white'
          } ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
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
              className={`absolute ${lang === 'en' ? 'left-full ml-2' : 'right-full mr-2'} px-3 py-1 w-fit text-nowrap rounded-md text-base bg-white shadow-sm border border-gray-200 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300`}
            >
              {label}
            </span>
          )}
        </Link>
      )}

      {/* Render as a toggleable item if there are subitems */}
      {hasSubItems && (
        <div
          className={`group relative flex items-center gap-2 space-x-3 p-3 rounded-lg transition dark:text-white  ${
            isActive ? 'bg-primary font-bold' : 'hover:bg-gray-200 dark:hover:bg-primary'
          } ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
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
              className={`absolute ${lang === 'en' ? 'left-full ml-2' : 'right-full mr-2'} px-3 py-1 w-fit text-nowrap rounded-md text-base bg-white shadow-sm border border-gray-200 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300`}
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
            expanded ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <div className={`${lang === 'en' ? 'pl-4' : 'pr-4'} mt-2 space-y-2`}>
            {subItems.map((subItem, index) => (
              <Link
                key={index}
                href={subItem.href}
                className={`flex items-center gap-2 p-2 rounded-lg transition  ${
                  isActive ? 'bg-primary font-bold text-white' : 'hover:bg-gray-200 dark:hover:bg-primary dark:text-white text-primary'
                }`}
              >
                <Hash className="" />
                <span>
                  {subItem.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;