import React from "react";
import Table from "./_components/table";
import { isAdmin } from "@/lib/helperServer";
import { redirect } from "next/navigation";

export default async function page() {
  if (!(await isAdmin())) {
    redirect("/");
  }
  return (
    <div>
      <Table />
    </div>
  );
}
