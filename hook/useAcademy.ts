"use client";
import { toast } from "sonner";
import apiClient from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetacademy = () => {
  return useQuery({
    queryKey: ["academy"],
    queryFn: async () => {
      const res = await apiClient.get("/bank/academy/");
      return res.data as IAcademy[];
    },
  });
};

export const useAddAcademy = () => {
  return useMutation({
    mutationKey: ["academy"],
    mutationFn: (data: FormData) => {
      return apiClient.post("/bank/academy/", data);
    },
    onSuccess: (data) => {
      toast.success("success");
      return data;
    },
    onMutate: () => {
      toast.loading("loading");
    },
    onError: (error: AxiosError) => {
      toast.error(
        (error.response?.data as { detail: string })?.detail || error.message
      );
      return error;
    },
  });
};
