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
          <SidebarGroupLabel className="font-bold">
            {t("title")}
          </SidebarGroupLabel>
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
                        "bg-foreground text-white hover:bg-foreground hover:text-white":
                          item.href === pathname,
                      })}
                    >
                      <item.icon style={{ width: "22px", height: "22px" }} />
                      <p className="text-[16px]">{t(item.lable)}</p>
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
