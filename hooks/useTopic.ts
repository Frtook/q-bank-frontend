import apiClient from "@/lib/axios";
import { TTopic } from "@/lib/validations/topic";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetTopic = () => {
  return useQuery({
    queryKey: ["topic"],
    queryFn: async () => {
      const res = await apiClient.get("/bank/topic/");
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
    },
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
    },
  });
};
