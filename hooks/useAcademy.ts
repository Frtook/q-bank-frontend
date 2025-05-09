"use client";
import { toast } from "sonner";
import apiClient from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ToastError } from "@/lib/helperClient";
import { useTranslations } from "next-intl";

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
  const queryClient = useQueryClient();
  const t = useTranslations("toast");
  return useMutation({
    mutationKey: ["academy"],
    mutationFn: (data: FormData) => {
      return apiClient.post("/bank/academy/", data);
    },
    onSuccess: (data) => {
      toast.dismiss();
      queryClient.invalidateQueries({ queryKey: ["academy"] });
      toast.success(t("academyAdded"));
      return data;
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};

export const useUpdateAcademy = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toast");
  return useMutation({
    mutationKey: ["academy"],
    mutationFn: (data: { id: number; formData: FormData }) => {
      return apiClient.patch(`/bank/academy/${data.id}/`, data.formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["academy"] });
      toast.success(t("academyUpdated"));
      return data;
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
