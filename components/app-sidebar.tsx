"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  School,
  FilePenLine,
  Book,
  Home,
  ScrollText,
  Bot,
  UserPlus,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useGetSubject } from "@/hooks/subject/useSubject";
export function AppSidebar() {
  const pathname = usePathname();
  const t = useTranslations("navitems");
  const { data: subject } = useGetSubject();
  const navItems = [
    {
      lable: "dashboard",
      href: "/",
      icon: Home,
    },
    {
      lable: "questions",
      href: "/questions",
      icon: ScrollText,
    },
    {
      lable: "academy",
      href: "/academy",
      icon: School,
    },
    {
      lable: "subject",
      href: "/subject",
      icon: Book,
      subnav: subject || [],
    },
    {
      lable: "exams",
      href: "/exams",
      icon: FilePenLine,
      disable: true,
    },
    {
      lable: "ai",
      href: "/ai",
      icon: Bot,
    },
    {
      lable: "users",
      href: "/mange-users",
      icon: UserPlus,
    },
    {
      lable: "settings",
      href: "/profile",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">
            {t("title")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.lable}>
                  {item.subnav && item.subnav.length > 0 ? (
                    <Collapsible
                      defaultOpen
                      className="group/collapsible"
                    >
                      <div className="flex w-full items-center justify-between">
                        <SidebarMenuButton
                          asChild
                          className="h-full w-full"
                        >
                          <Link
                            href={item.href}
                            aria-disabled={item.disable}
                            className={cn(
                              "flex w-full items-center gap-2 p-3",
                              {
                                "bg-black text-white dark:bg-primary":
                                  item.href === pathname,
                              }
                            )}
                          >
                            <item.icon
                              style={{ width: "22px", height: "22px" }}
                            />
                            <p className="text-[16px]">{t(item.lable)}</p>
                          </Link>
                        </SidebarMenuButton>
                        <CollapsibleTrigger asChild>
                          <button className="p-2">
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>
                        <SidebarMenuSub className="flex flex-col gap-2">
                          {item.subnav.map((subItem: any, idx: number) => (
                            <Link
                              key={idx}
                              href={`/subject/${subItem.id}`}
                              className={cn("rounded-md p-3 text-sm", {
                                "bg-black text-white dark:bg-primary":
                                  pathname === `/subject/${subItem.id}`,
                              })}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      className="h-full"
                      asChild
                    >
                      <Link
                        href={item.href}
                        aria-disabled={item.disable}
                        className={cn("p-3", {
                          "bg-foreground text-white dark:bg-primary":
                            item.href === pathname,
                        })}
                      >
                        <item.icon style={{ width: "22px", height: "22px" }} />
                        <p className="text-[16px]">{t(item.lable)}</p>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
