import apiClient from "@/lib/axios";
import { ToastError } from "@/lib/helperClient";
import { SchemaUser } from "@/lib/validations/permission/mange-user";
import { MangeUsers } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetMangeUser = () => {
  return useQuery({
    queryKey: ["mange-user"],
    queryFn: async () => {
      const res = await apiClient.get("/manage/user/");
      return res.data as MangeUsers[];
    },
  });
};

export const useGetOneMangeUser = (id: string) => {
  return useQuery({
    queryKey: ["mange-user", id],
    queryFn: async () => {
      const res = await apiClient.get(`/manage/user/${id}/`);
      return res.data as MangeUsers;
    },
    enabled: !!id,
  });
};
export const useAddMangeUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["mange-user"],
    mutationFn: async (body: SchemaUser) => {
      return apiClient.post("/manage/user/", body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mange-user"] });
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
