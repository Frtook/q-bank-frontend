import apiClient from "@/lib/axios";
import { ToastError } from "@/lib/helperClient";
import { TTopic } from "@/lib/validations/subject/topic";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type SearchParams = {
  subjec: string;
};
export const useGetTopic = (params: SearchParams) => {
  return useQuery({
    queryKey: ["topic"],
    queryFn: async () => {
      const res = await apiClient.get(`/bank/topic/?subject=${params.subjec}`);
      return res.data as Topic[];
    },
  });
};

export const useAddTopic = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toast");
  return useMutation({
    mutationKey: ["topic"],
    mutationFn: async (data: TTopic) =>
      await apiClient.post("/bank/topic/", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topic"] });
      toast.success(t("topicAdded"));
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};

export const useUpdataTopic = (id: number) => {
  const queryClient = useQueryClient();
  const t = useTranslations("toast");
  return useMutation({
    mutationKey: ["topic"],
    mutationFn: async (body: TTopic) =>
      await apiClient.patch(`/bank/topic/${id}/`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topic"] });
      toast.success(t("topicUpdated"));
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
