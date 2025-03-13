"use client";
import { useGetacademy } from "@/hook/useAcademy";
import React from "react";
import AddAcadmy from "./_components/AddAcademy";
import { Button } from "@/components/ui/button";

export default function page() {
  const { data } = useGetacademy();

  const handleDelete = (id: number) => {
    console.log("delete", id);
  };

  return (
    <div>
      <span className="text-[#0A214C] hover:text-primary/90">academy</span>
      <AddAcadmy />
      {data &&
        data.map((acadmy) => (
          <div key={acadmy.id}>
            <p>{acadmy.name}</p>
            <p>{acadmy.logo}</p>
            <p>{acadmy.active}</p>
            <Button
              variant="destructive"
              onClick={() => handleDelete(acadmy.id)}
            >
              Delete
            </Button>
          </div>
        ))}
    </div>
  );
}
