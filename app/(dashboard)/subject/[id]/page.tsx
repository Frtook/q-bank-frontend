"use client";
import TabsContainer from "@/components/ui/tabContainer";
import * as Tabs from "@radix-ui/react-tabs";
import { MdOutlineTopic } from "react-icons/md";
import Outcomes from "@/app/(dashboard)/subject/[id]/_components/outcomes/outcomes";
import Topics from "@/app/(dashboard)/subject/[id]/_components/topics/topics";
import { LiaClipboardListSolid } from "react-icons/lia";
import { ShieldCheck } from "lucide-react";
import Permission from "@/app/(dashboard)/subject/[id]/_components/permission/permission";
import Questions from "./_components/questions/questions";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { use } from "react";
import { useGetSubject } from "@/hooks/subject/useSubject";
import { notFound } from "next/navigation";

export default function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = use(params);
  const { data: subjects } = useGetSubject();
  if (subjects) {
    if (!subjects.some((subject) => subject.id === +id)) {
      notFound();
    }
  }
  const taps = [
    {
      label: "Outcomes",
      value: "outcomes",
      icon: <MdOutlineTopic />,
      component: <Outcomes />,
    },
    {
      label: "Topics",
      value: "topics",
      icon: <LiaClipboardListSolid />,
      component: <Topics />,
    },
    {
      label: "Questions",
      value: "questions",
      icon: <QuestionMarkCircledIcon />,
      component: <Questions />,
    },
    {
      label: "Permission",
      value: "permission",
      icon: <ShieldCheck />,
      component: <Permission />,
    },
  ];
  return (
    <TabsContainer
      tabs={taps}
      defaultValue="outcomes"
    >
      {taps.map((tap) => (
        <Tabs.Content
          value={tap.value}
          key={tap.value}
        >
          {tap.component}
        </Tabs.Content>
      ))}
    </TabsContainer>
  );
}
