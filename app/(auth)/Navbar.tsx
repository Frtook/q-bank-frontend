"use client";
import Button from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const routes = [
  { name: "login", path: "/login" },
  { name: "regester", path: "/regester" },
];
export default function Navbar() {
  const pathName = usePathname();
  return (
    <div className="flex gap-5 p-4 border-b border-b-gray-500 ">
      <p className="text-4xl flex-1  font-bold">Logo</p>
      {routes.map((route, index) => (
        <Link key={index} href={route.path}>
          <Button
            variant={pathName === route.path ? "primary" : "secondary"}
            className="px-3 py-2"
          >
            {route.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
