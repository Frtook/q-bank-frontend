"use client";
import apiClient from "@/lib/axios";
import { ToastError } from "@/lib/helperClient";
import { SchemaSubject } from "@/lib/validations/subject/subject";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const useGetSubject = () => {
  return useQuery({
    queryKey: ["subject"],
    queryFn: async () => {
      const res = await apiClient.get("/bank/subject/");
      return res.data as ISubject[];
    },
  });
};

export const useAddSubject = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toast");
  return useMutation({
    mutationKey: ["subject"],
    mutationFn: async (data: SchemaSubject) =>
      await apiClient.post("/bank/subject/", data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["subject"] });
      toast.success(t("subjectAdded"));
      return data;
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};

export const useUpdateSubject = (id: number) => {
  const queryClient = useQueryClient();
  const t = useTranslations("toast");

  return useMutation({
    mutationKey: ["subject"],
    mutationFn: async (body: SchemaSubject) => {
      return await apiClient.patch(`/bank/subject/${id}/`, body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["subject"] });
      toast.dismiss();
      toast.success(t("subjectUpdated"));
      return data;
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toast");
  return useMutation({
    mutationFn: async (id: number) =>
      await apiClient.delete(`/bank/subject/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subject"] });
      toast.success(t("subjectDeleted"));
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
