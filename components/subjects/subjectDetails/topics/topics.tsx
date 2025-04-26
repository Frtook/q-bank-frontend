"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/search";
import DataTable from "@/components/ui/dataTable";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const Topics = ({
  selectedRows,
  setSelectedRows,
  exportSelectedRows,
  setActiveData,
}: any) => {
  const [data, setData] = useState([
    { id: 1, topic: "Introduction to Quantum Physics", subject: "Mr. Johnson" },
    {
      id: 2,
      topic: "The Rise and Fall of the Roman Empire",
      subject: "Ms. Smith",
    },
    { id: 3, topic: "Photosynthesis in Plants", subject: "Dr. Anderson" },
    {
      id: 4,
      topic: "Shakespeare's Influence on Modern Literature",
      subject: "Mrs. Brown",
    },
    {
      id: 5,
      topic: "Introduction to Probability and Statistics",
      subject: "Mr. Williams",
    },
    { id: 6, topic: "The Structure of the Human Brain", subject: "Ms. Davis" },
  ]);

  const [topicName, setTopicName] = useState("");
  const [selectedOutcome, setSelectedOutcome] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<number | null>(null);

  const outcomes = [
    { value: "Understand Newton's Laws", label: "Understand Newton's Laws" },
    { value: "Identify Literary Devices", label: "Identify Literary Devices" },
    { value: "Solve Linear Equations", label: "Solve Linear Equations" },
  ];

  const columns = [
    { accessor: "id", header: "ID" },
    { accessor: "topic", header: "Topic" },
    { accessor: "subject", header: "Subject" },
  ];

  useEffect(() => {
    setActiveData(data);
  }, [data, setActiveData]);

  const handleEdit = (rowIndex: number) => {
    const rowData = data[rowIndex];
    setTopicName(rowData.topic);
    setCurrentRow(rowIndex);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (isEditMode && currentRow !== null) {
      const updatedData = [...data];
      updatedData[currentRow] = {
        ...updatedData[currentRow],
        topic: topicName,
      };
      setData(updatedData);
    } else {
      const newRow = {
        id: data.length + 1,
        topic: topicName,
        subject: "New Subject",
      };
      setData([...data, newRow]);
    }

    setTopicName("");
    setSelectedOutcome("");
    setIsEditMode(false);
    setCurrentRow(null);
    setIsDialogOpen(false);
  };

  const handleDeleteClick = (rowIndex: number) => {
    setRowToDelete(rowIndex);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (rowToDelete !== null) {
      setData(data.filter((_, index) => index !== rowToDelete));
    }
    setIsDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  return (
    <div className="mx-1">
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between rounded-md bg-white p-4 shadow-sm dark:bg-[#19191d]">
          <div className="flex gap-2">
            <SearchInput placeholder="Search Topics..." />
            <Button
              className="border border-[#D5D7DA] shadow-sm dark:border-none"
              variant="secondary"
            >
              Filters
            </Button>
            <Button
              className="border border-[#D5D7DA] shadow-sm dark:border-none"
              variant="secondary"
              onClick={exportSelectedRows}
              disabled={selectedRows.length === 0}
            >
              Export
            </Button>
          </div>

          {/* Add/Edit Dialog */}
          <Dialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="default"
                onClick={() => {
                  setIsEditMode(false);
                  setTopicName("");
                  setSelectedOutcome("");
                }}
              >
                + New Topic
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditMode ? "Edit Topic" : "Add New Topic"}
                </DialogTitle>
                <DialogDescription>
                  {isEditMode
                    ? "Edit the topic details below."
                    : "Enter the topic name and choose an outcome."}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                <Input
                  className="h-12"
                  placeholder="Topic Name"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                />

                <Select
                  placeholder="Select Outcome"
                  value={selectedOutcome}
                  onValueChange={setSelectedOutcome}
                  options={outcomes}
                />
              </div>

              <DialogFooter>
                <Button onClick={handleSave}>
                  {isEditMode ? "Update" : "Save"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this topic? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={cancelDelete}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DataTable
          columns={columns}
          data={data}
          onRowSelectionChange={setSelectedRows}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>
    </div>
  );
};

export default Topics;
