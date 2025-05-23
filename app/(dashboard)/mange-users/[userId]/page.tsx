"use client";
import { use } from "react";
import { UserProfileCard } from "./_components/UserProfileCard";
import { UserPermissionsPanel } from "./_components/UserPermissionsPanel";
export default function Page({
  params,
}: {
  params: Promise<{
    userId: string;
  }>;
}) {
  const { userId } = use(params);
  return (
    <div>
      <UserProfileCard id={userId} />
      <UserPermissionsPanel id={userId} />
    </div>
  );
}
