import apiClient from "@/lib/axios";
import { ToastError } from "@/lib/helperClient";
import { TQuestion } from "@/lib/validations/question";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useGetQuestion = () => {
  return useQuery({
    queryKey: ["question"],
    queryFn: async () => {
      const res = await apiClient.get("/bank/question/");
      return res.data as Question[];
    },
  });
};

export const useAddQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["question"],
    mutationFn: async (data: TQuestion) =>
      apiClient.post("/bank/question/", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question"] });
      toast.success("Qustion updated");
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};

export const useUpdateQuestion = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["question"],
    mutationFn: async (body: TQuestion) =>
      apiClient.patch(`/bank/question/${id}/`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question"] });
      toast.success("Qustion updated");
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
