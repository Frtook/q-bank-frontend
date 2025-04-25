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
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navItems } from "@/lib/constants";
import { useTranslations } from "next-intl";

export function AppSidebar() {
  const pathname = usePathname();
  const t = useTranslations("navitems");
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("title")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.lable}>
                  <SidebarMenuButton
                    className="h-full"
                    asChild
                  >
                    <Link
                      href={item.href}
                      aria-disabled={item.disable}
                      className={cn("p-3", {
                        "bg-foreground text-white hover:bg-foreground hover:text-white dark:bg-white dark:text-black hover:dark:bg-white hover:dark:text-black":
                          item.href === pathname,
                      })}
                    >
                      <item.icon />
                      <div>{t(item.lable)}</div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
