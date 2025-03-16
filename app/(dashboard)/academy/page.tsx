"use client";
import { useGetacademy } from "@/hook/useAcademy";
import React from "react";
import AddAcadmy from "./_components/AddAcademy";
import { Button } from "@/components/ui/button";
// import Image from "next/image";

export default function Page() {
  const { data } = useGetacademy();

  const handleDelete = (id: number) => {
    console.log("delete", id);
  };
  return (
    <div>
      <span className="">academy</span>
      <AddAcadmy />

      {data &&
        data.map((acadmy) => (
          <div key={acadmy.id}>
            <p>{acadmy.name}</p>
            {/* <Image src={acadmy.logo} width={30} height={30} alt="logo" /> */}
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
