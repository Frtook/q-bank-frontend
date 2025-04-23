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

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Question Bank</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.lable}>
                  <SidebarMenuButton
                    className="h-full"
                    asChild
                  >
                    <div
                      className={cn("p-3", {
                        "bg-foreground text-white": item.href === pathname,
                      })}
                    >
                      <item.icon />
                      <Link
                        href={item.href}
                        aria-disabled={item.disable}
                      >
                        {item.lable}
                      </Link>
                    </div>
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
