"use client";
import apiClient from "@/lib/axios";
import { TOutcome } from "@/lib/validations/outcome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetOutcome = () => {
  return useQuery({
    queryKey: ["outcome"],
    queryFn: async () => {
      const res = await apiClient.get("/bank/outcome/");
      return res.data as Outcome[];
    },
  });
};

export const useAddOutcome = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["outcome"],
    mutationFn: async (data: TOutcome) => {
      return await apiClient.post("/bank/outcome/", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outcome"] });
    },
  });
};

export const useEditOutcome = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["outcome"],
    mutationFn: async (data: TOutcome) => {
      return await apiClient.patch(`/bank/outcome/${id}/`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outcome"] });
    },
  });
};
