import apiClient from "@/lib/axios";
import { ToastError } from "@/lib/helperClient";
import { TQuestion } from "@/lib/validations/subject/question";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "../use-toast";
import { useTranslations } from "next-intl";

type Params = {
  outcome?: string;
  topic?: string;
  level?: string;
  active?: boolean;
  subject?: string;
};

export const useGetQuestion = (params: Params) => {
  return useQuery({
    queryKey: ["question", params],
    queryFn: async () => {
      const res = await apiClient.get("/bank/question/", { params });
      return res.data as Question[];
    },
    enabled: !!params?.subject,
  });
};

export const useGetOneQuestion = (id: string) => {
  return useQuery({
    queryKey: ["question", id],
    queryFn: async () => {
      const res = await apiClient.get(`/bank/question/${id}/`);
      return res.data as Question;
    },
    enabled: id !== undefined,
  });
};
export const useAddQuestion = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toast");
  return useMutation({
    mutationKey: ["question"],
    mutationFn: async (data: TQuestion) =>
      apiClient.post("/bank/question/", data),
    onMutate: () =>
      toast({ title: "Processing your request...", variant: "info" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question"] });
      toast({ title: t("questionAdded"), variant: "success" });
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};

export const useUpdateQuestion = (id: number) => {
  const queryClient = useQueryClient();
  const t = useTranslations("toast");
  return useMutation({
    mutationKey: ["question"],
    mutationFn: async (body: TQuestion) =>
      apiClient.patch(`/bank/question/${id}/`, body),
    onMutate: () =>
      toast({ title: "Processing your request...", variant: "info" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question"] });
      toast({ title: t("questionUpdated"), variant: "success" });
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
