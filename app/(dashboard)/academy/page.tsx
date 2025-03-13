"use client";
import { useGetacademy } from "@/hook/useAcademy";
import React from "react";

export default function page() {
  const { data, error } = useGetacademy();
  console.log(data);
  console.log(error);
  return (
    <div>
      <span>academy</span>
    </div>
  );
}
