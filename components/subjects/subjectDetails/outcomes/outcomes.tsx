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
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Outcomes = ({
  selectedRows,
  setSelectedRows,
  exportSelectedRows,
  setActiveData,
}: any) => {
  const [data, setData] = useState([
    {
      id: 1,
      outcome: "What is the capital of France?",
      subject: "Mr. Johnson",
    },
    { id: 2, outcome: "Solve: 5x + 3 = 18", subject: "Ms. Smith" },
    { id: 3, outcome: "Who wrote 'Hamlet'?", subject: "Dr. Anderson" },
    {
      id: 4,
      outcome: "What is the powerhouse of the cell?",
      subject: "Mrs. Brown",
    },
    {
      id: 5,
      outcome: "Explain Newton's Third Law of Motion.",
      subject: "Mr. Williams",
    },
    { id: 6, outcome: "What year did World War II end?", subject: "Ms. Davis" },
  ]);

  const [outcomeName, setOutcomeName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<number | null>(null);

  const columns = [
    { accessor: "id", header: "ID" },
    { accessor: "outcome", header: "Outcome" },
    { accessor: "subject", header: "Subject" },
  ];

  useEffect(() => {
    setActiveData(data);
  }, [data, setActiveData]);

  const handleSave = () => {
    if (isEditMode && currentRow !== null) {
      // Update existing outcome
      const updatedData = [...data];
      updatedData[currentRow] = {
        ...updatedData[currentRow],
        outcome: outcomeName,
      };
      setData(updatedData);
    } else {
      // Add new outcome
      const newOutcome = {
        id: data.length + 1,
        outcome: outcomeName,
        subject: "N/A",
      };
      setData([...data, newOutcome]);
    }

    // Reset form
    setOutcomeName("");
    setIsEditMode(false);
    setCurrentRow(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (rowIndex: number) => {
    const rowData = data[rowIndex];
    setOutcomeName(rowData.outcome);
    setCurrentRow(rowIndex);
    setIsEditMode(true);
    setIsDialogOpen(true);
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
            <SearchInput placeholder="Search Outcomes..." />
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
                  setOutcomeName("");
                }}
              >
                + New Outcome
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditMode ? "Edit Outcome" : "Add New Outcome"}
                </DialogTitle>
                <DialogDescription>
                  {isEditMode
                    ? "Edit the outcome below."
                    : "Enter the outcome name below."}
                </DialogDescription>
              </DialogHeader>
              <Input
                className="h-12"
                placeholder="Outcome Name"
                value={outcomeName}
                onChange={(e) => setOutcomeName(e.target.value)}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={handleSave}>
                    {isEditMode ? "Update" : "Add Outcome"}
                  </Button>
                </DialogClose>
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
                Are you sure you want to delete this outcome? This action cannot
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

export default Outcomes;
