import apiClient from "@/lib/axios";
import { ToastError } from "@/lib/helperClient";
import { TTopic } from "@/lib/validations/topic";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

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

  return useMutation({
    mutationKey: ["topic"],
    mutationFn: async (data: TTopic) =>
      await apiClient.post("/bank/topic/", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topic"] });
      toast.success("Success Add Topic");
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};

export const useUpdataTopic = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["topic"],
    mutationFn: async (body: TTopic) =>
      await apiClient.patch(`/bank/topic/${id}/`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topic"] });
      toast.success("Success Updata Topic");
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
