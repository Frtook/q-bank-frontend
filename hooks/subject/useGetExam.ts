import apiClient from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { TExam } from "@/lib/validations/subject/exam";
import { Exam } from "@/types";

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
export const useUpdateExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedExam: TExam & { id: number }) => {
      const res = await apiClient.put(
        `/bank/exam/${updatedExam.id}/`,
        updatedExam
      );
      return res.data;
    },
    onMutate: () => toast({ title: "Updating exam...", variant: "info" }),
    onSuccess: () => {
      toast({ title: "Exam updated successfully!", variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
    onError: () => {
      toast({
        title: "Failed to update exam. Check input data.",
        variant: "destructive",
      });
    },
  });
};

export const useGenerateExam = (examId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      subject: number;
      difficulty_level: number;
      outcomeWeights: { outcome: number; weight: number }[];
      countOfQuestions: number;
      timeToSolve: string;
    }) => {
      const res = await apiClient.post(`/bank/exam/${examId}/generate/`, data);
      return res.data;
    },
    onMutate: () => toast({ title: "Generating exam...", variant: "info" }),
    onSuccess: () => {
      toast({ title: "Exam generated successfully!", variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["exam", examId] });
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
    onError: () => {
      toast({
        title: "Failed to generate exam",
        variant: "destructive",
      });
    },
  });
};
