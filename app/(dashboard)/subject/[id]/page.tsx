"use client";
import { useState } from "react";
import TabsContainer from "@/components/ui/tabContainer";
import * as Tabs from "@radix-ui/react-tabs";
import { MdOutlineTopic } from "react-icons/md";
import Outcomes from "@/components/subjects/subjectDetails/outcomes/outcomes";
import Topics from "@/components/subjects/subjectDetails/topics/topics";
import { LiaClipboardListSolid } from "react-icons/lia";

export default function Page() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [activeData, setActiveData] = useState<any[]>([]); // stores current tab's data

  const exportSelectedRows = () => {
    const selectedData = selectedRows.map((index) => activeData[index]);
    const blob = new Blob([JSON.stringify(selectedData, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "selected_rows.json";
    link.click();
  };

  return (
    <TabsContainer
      tabs={[
        { label: "Outcomes", value: "outcomes", icon: <MdOutlineTopic /> },
        { label: "Topics", value: "topics", icon: <LiaClipboardListSolid /> },
      ]}
      defaultValue="outcomes"
    >
      <Tabs.Content value="outcomes">
        <Outcomes
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          exportSelectedRows={exportSelectedRows}
          setActiveData={setActiveData}
        />
      </Tabs.Content>

      <Tabs.Content value="topics">
        <Topics
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          exportSelectedRows={exportSelectedRows}
          setActiveData={setActiveData}
        />
      </Tabs.Content>
    </TabsContainer>
  );
}
