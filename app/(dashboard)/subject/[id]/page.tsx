"use client";
import TabsContainer from "@/components/ui/tabContainer";
import * as Tabs from "@radix-ui/react-tabs";
import { MdOutlineTopic } from "react-icons/md";
import Outcomes from "@/app/(dashboard)/subject/[id]/_components/outcomes/outcomes";
import Topics from "@/app/(dashboard)/subject/[id]/_components/topics/topics";
import { LiaClipboardListSolid } from "react-icons/lia";
import { ShieldCheck } from "lucide-react";
import Permission from "@/app/(dashboard)/subject/[id]/_components/permission/permission";

export default function Page() {
  return (
    <TabsContainer
      tabs={[
        { label: "Outcomes", value: "outcomes", icon: <MdOutlineTopic /> },
        { label: "Topics", value: "topics", icon: <LiaClipboardListSolid /> },
        {
          label: "Permission",
          value: "permission",
          icon: <ShieldCheck />,
        },
      ]}
      defaultValue="outcomes"
    >
      <Tabs.Content value="outcomes">
        <Outcomes />
      </Tabs.Content>

      <Tabs.Content value="topics">
        <Topics />
      </Tabs.Content>
      <Tabs.Content value="permission">
        <Permission />
      </Tabs.Content>
    </TabsContainer>
  );
}
