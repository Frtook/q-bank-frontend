"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const routes = [
  { name: "login", path: "/login" },
  { name: "register", path: "/register" },
];
export default function Navbar() {
  const pathName = usePathname();
  const t = useTranslations("navAuth");
  return (
    <div className="flex items-center justify-between gap-5 border-b border-b-gray-500 px-8">
      <Image
        width={100}
        height={100}
        src={"/images/logo.png"}
        alt="logo"
      />
      <div>
        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.path}
          >
            <Button variant={pathName === route.path ? "default" : "secondary"}>
              {t(route.name)}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
