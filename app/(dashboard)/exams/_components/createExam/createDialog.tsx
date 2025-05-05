import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import DataTable from "@/components/ui/dataTable";

// const topics = [
//   { value: "0", label: "Math" },
//   { value: "1", label: "Science" },
//   { value: "2", label: "History" },
// ];

// const academy = [
//   { value: "1", label: "1" },
//   { value: "2", label: "2" },
// ];

const ExamDialog = () => {
  const form = useForm({
    defaultValues: {
      text: "",
      hint: "",
      active: true,
      timeLimit: 5, // in minutes
      type: "1",
      level: 3, // 1-5 difficulty scale
      randomizable: true,
      topic: "0",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Submitted data:", data);
  };

  const columns = [
    { accessor: "id", header: "ID" },
    { accessor: "question", header: "Question" },
    { accessor: "teacher", header: "Teacher" },
    { accessor: "subject", header: "Subject" },
    { accessor: "difficulty", header: "Difficulty" },
    { accessor: "date_added", header: "Date Added" },
  ];

  const data = [
    {
      id: 1,
      question: "What is the capital of France?",
      teacher: "Mr. Johnson",
      subject: "Geography",
      difficulty: "Easy",
      date_added: "2024-03-01",
    },
    {
      id: 2,
      question: "Solve: 5x + 3 = 18",
      teacher: "Ms. Smith",
      subject: "Mathematics",
      difficulty: "Medium",
      date_added: "2024-03-05",
    },
    {
      id: 3,
      question: "Who wrote 'Hamlet'?",
      teacher: "Dr. Anderson",
      subject: "Literature",
      difficulty: "Hard",
      date_added: "2024-03-10",
    },
    {
      id: 4,
      question: "What is the powerhouse of the cell?",
      teacher: "Mrs. Brown",
      subject: "Biology",
      difficulty: "Easy",
      date_added: "2024-03-15",
    },
    {
      id: 5,
      question: "Explain Newton's Third Law of Motion.",
      teacher: "Mr. Williams",
      subject: "Physics",
      difficulty: "Medium",
      date_added: "2024-03-20",
    },
    {
      id: 6,
      question: "What year did World War II end?",
      teacher: "Ms. Davis",
      subject: "History",
      difficulty: "Hard",
      date_added: "2024-03-25",
    },
    {
      id: 5,
      question: "Explain Newton's Third Law of Motion.",
      teacher: "Mr. Williams",
      subject: "Physics",
      difficulty: "Medium",
      date_added: "2024-03-20",
    },
    {
      id: 6,
      question: "What year did World War II end?",
      teacher: "Ms. Davis",
      subject: "History",
      difficulty: "Hard",
      date_added: "2024-03-25",
    },
    {
      id: 5,
      question: "Explain Newton's Third Law of Motion.",
      teacher: "Mr. Williams",
      subject: "Physics",
      difficulty: "Medium",
      date_added: "2024-03-20",
    },
    {
      id: 6,
      question: "What year did World War II end?",
      teacher: "Ms. Davis",
      subject: "History",
      difficulty: "Hard",
      date_added: "2024-03-25",
    },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ New Exam</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Exam</DialogTitle>
          <DialogDescription>
            Fill out the fields below to create a new exam.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="my-3">
              <h3 className="text-xl font-medium">- Select Questions First</h3>
              <DataTable
                columns={columns}
                data={data}
                // onRowSelectionChange={setSelectedRows}
              />
            </div>
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>generation_config</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="generation_config"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Limit (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max="60"
                      placeholder="Enter time limit in minutes"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level: {field.value}/10</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={field.value}
                        onChange={field.onChange}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                      />
                      <span className="w-8 text-center text-sm text-gray-500">
                        {field.value}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ExamDialog;
