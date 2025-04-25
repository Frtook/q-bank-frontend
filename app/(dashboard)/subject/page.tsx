"use client";
import { useState } from "react";
import {
  useGetSubject,
  useAddSubject,
  useUpdateSubject,
  useDeleteSubject,
} from "@/hooks/useSubject";
import { useGetacademy } from "@/hooks/useAcademy";
import DataTable from "@/components/ui/dataTable";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/search";
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
import { useRouter } from "next/navigation";
import TableSkeleton from "@/components/table/table-skeleton";

type Subject = {
  id: number;
  name: string;
  academy: number | string;
};

type DataRow = {
  [key: string]: any;
};

export default function Page() {
  const { data: subjects, isLoading } = useGetSubject();
  const { data: academies } = useGetacademy();
  const addSubject = useAddSubject();
  const deleteSubject = useDeleteSubject();

  const [subjectName, setSubjectName] = useState("");
  const [selectedAcademy, setSelectedAcademy] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRowId, setCurrentRowId] = useState<number | null>(null);
  const [rowToDeleteId, setRowToDeleteId] = useState<number | null>(null);

  const router = useRouter();

  const updateSubject = useUpdateSubject(currentRowId as number);

  const academiesList = academies?.map((academy) => ({
    value: academy.id.toString(),
    label: academy.name,
  }));

  const handleRowClick = (rowData: DataRow) => {
    // Type assertion since we know the shape of our data
    const subject = rowData as Subject;
    router.push(`/subject/${subject.id}`);
  };

  const handleEdit = (rowIndex: number) => {
    const subject = subjects?.[rowIndex];
    if (!subject) return;
    setSubjectName(subject.name);
    setSelectedAcademy(subject.academy.toString());
    setCurrentRowId(subject.id);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const payload = {
      name: subjectName,
      academy: Number(selectedAcademy),
    };

    if (currentRowId !== null) {
      updateSubject.mutate(payload, {
        onSuccess: () => {
          setIsDialogOpen(false);
          resetForm();
        },
      });
    } else {
      addSubject.mutate(payload, {
        onSuccess: () => {
          setIsDialogOpen(false);
          resetForm();
        },
      });
    }
  };

  const handleDeleteClick = (rowIndex: number) => {
    const subject = subjects?.[rowIndex];
    if (!subject) return;
    setRowToDeleteId(subject.id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (rowToDeleteId !== null) {
      deleteSubject.mutate(rowToDeleteId);
      setIsDeleteDialogOpen(false);
      setRowToDeleteId(null);
    }
  };

  const resetForm = () => {
    setSubjectName("");
    setSelectedAcademy("");
    setCurrentRowId(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full justify-between rounded-md bg-white p-4 shadow-sm dark:bg-[#19191d]">
        <div className="flex gap-2">
          <SearchInput placeholder="Search Subjects.." />
          <Button variant="secondary">Filters</Button>
          <Button variant="secondary">Export</Button>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              variant="default"
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
            >
              + New Subject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {currentRowId !== null ? "Edit Subject" : "Add New Subject"}
              </DialogTitle>
              <DialogDescription>
                {currentRowId !== null
                  ? "Edit the subject details below."
                  : "Enter the subject name and choose an academy."}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <Input
                className="h-12"
                placeholder="Subject Name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
              />

              <Select
                placeholder="Select Academy"
                value={selectedAcademy}
                onValueChange={setSelectedAcademy}
                options={academiesList || []}
              />
            </div>

            <DialogFooter>
              <Button onClick={handleSave}>
                {currentRowId !== null ? "Update" : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this subject? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
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

      {isLoading || !academies ? (
        <TableSkeleton />
      ) : (
        <DataTable
          columns={[
            { accessor: "id", header: "ID" },
            { accessor: "name", header: "Name" },
            { accessor: "academy", header: "Academy" },
          ]}
          data={subjects || []}
          onRowClick={handleRowClick}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}
    </div>
  );
}
