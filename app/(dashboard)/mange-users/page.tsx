import React from "react";
import { isAdmin } from "@/lib/helperServer";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPermission from "./_components/(user-permission)/userPermission";
import UserGroup from "./_components/(user-group)/userGroup";
export default async function page() {
  if (!(await isAdmin())) {
    redirect("/");
  }
  return (
    <div>
      <Tabs defaultValue="permission">
        <TabsList className="mb-5">
          <TabsTrigger value="permission">User Permission</TabsTrigger>
          <TabsTrigger value="group">User Group</TabsTrigger>
        </TabsList>
        <TabsContent
          className="mb-5"
          value="permission"
        >
          <UserPermission />
        </TabsContent>
        <TabsContent value="group">
          <UserGroup />
        </TabsContent>
      </Tabs>
    </div>
  );
}
