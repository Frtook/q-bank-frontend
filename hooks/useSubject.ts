"use client";
import apiClient from "@/lib/axios";
import { SchemaSubject } from "@/lib/validations/subject";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

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
  return useMutation({
    mutationKey: ["subject"],
    mutationFn: async (data: SchemaSubject) =>
      await apiClient.post("/bank/subject/", data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["subject"] });
      toast.success("success");
      return data;
    },
    onError: (error: AxiosError) => {
      toast.error(
        (error.response?.data as { detail: string })?.detail || error.message
      );
      return error;
    },
  });
};

export const useUpdateSubject = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["subject"],
    mutationFn: async (body: SchemaSubject) => {
      return await apiClient.patch(`/bank/subject/${id}/`, body);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["subject"] });
      toast.dismiss();
      toast.success("success");
      return data;
    },
    onError: (error: AxiosError) => {
      toast.dismiss();
      toast.error(
        (error.response?.data as { detail: string })?.detail || error.message
      );
      return error;
    },
  });
};
export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) =>
      await apiClient.delete(`/bank/subject/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subject"] });
      toast.success("Subject deleted");
    },
    onError: (err: AxiosError) => {
      toast.error("Failed to delete subject");
    },
  });
};
