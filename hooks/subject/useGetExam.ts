import apiClient from "@/lib/axios";
import { ToastError } from "@/lib/helperClient";
import { TQuestion } from "@/lib/validations/subject/question";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Exam } from "@/types";
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
    onSuccess: () => {
      toast.success("Exam created successfully!");
      queryClient.invalidateQueries(["exams"]);
    },
    onError: (error: AxiosError) => {
      ToastError(error);
      toast.error("Failed to create exam. Check input data.");
    },
  });
};
