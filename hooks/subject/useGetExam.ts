import apiClient from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { TExam } from "@/lib/validations/subject/exam";

export const useGetExams = () => {
  return useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const res = await apiClient.get("/bank/exam/");
      return res.data as Exam[];
    },
  });
};

export const useGetExamById = (id: number) => {
  return useQuery({
    queryKey: ["exam", id],
    queryFn: async () => {
      const res = await apiClient.get(`/bank/exam/${id}`);
      return res.data as Exam;
    },
  });
};

export const useAddExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newExam: TExam) => {
      const res = await apiClient.post("/bank/exam/", newExam); // Adjust if needed
      return res.data;
    },
    onMutate: () =>
      toast({ title: "Processing your request...", variant: "info" }),
    onSuccess: () => {
      toast({ title: "Exam created successfully!", variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
    onError: () => {
      toast({
        title: "Failed to create exam. Check input data.",
        variant: "destructive",
      });
    },
  });
};
export const useDeleteExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await apiClient.delete(`/bank/exam/${id}/`);
      return res.data;
    },
    onSuccess: () => {
      toast({ title: "Exam deleted successfully", variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["exams"] }); // Add this line
    },
    onError: () => {
      toast({
        title: "Failed to delete exam",
        variant: "destructive",
      });
    },
  });
};
