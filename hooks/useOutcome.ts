"use client";
import apiClient from "@/lib/axios";
import { ToastError } from "@/lib/helperClient";
import { TOutcome } from "@/lib/validations/outcome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type SearchParams = {
  subjec: string;
};
export const useGetOutcome = (params: SearchParams) => {
  return useQuery({
    queryKey: ["outcome"],
    queryFn: async () => {
      const res = await apiClient.get(
        `/bank/outcome/?subject=${params.subjec}`
      );
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
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
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
      toast.success("Success Update Outcome");
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
