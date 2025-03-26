"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const routes = [
  { name: "login", path: "/login" },
  { name: "register", path: "/register" },
];
export default function Navbar() {
  const pathName = usePathname();
  return (
    <div className="flex gap-5 border-b border-b-gray-500 p-4">
      <p className="flex-1 text-4xl font-bold">Logo</p>
      {routes.map((route, index) => (
        <Link
          key={index}
          href={route.path}
        >
          <Button variant={pathName === route.path ? "default" : "secondary"}>
            {route.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
