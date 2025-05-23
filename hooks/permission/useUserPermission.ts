import apiClient from "@/lib/axios";
import { UserPermission } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { AxiosError } from "axios";
import { ToastError } from "@/lib/helperClient";

export const useGetUserPermission = () => {
  return useQuery({
    queryKey: ["user-permission"],
    queryFn: async () => {
      const res = await apiClient.get("/auth/manage/user-permission/");
      return res.data as UserPermission[];
    },
  });
};

export const useGetOneUserPermission = (id: string) => {
  return useQuery({
    queryKey: ["user-permission", id],
    queryFn: async () => {
      const res = await apiClient.get(`/auth/manage/user-permission/${id}/`);
      return res.data as UserPermission;
    },
  });
};

type Body = {
  username?: string;
  is_active?: boolean;
  is_superuser?: boolean;
  user_permissions?: number[] | undefined;
};
export const useUpdateUserPermission = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["user-permission", id],
    mutationFn: async (body: Body) =>
      await apiClient.patch(`/auth/manage/user-permission/${id}/`, body),
    onMutate: () =>
      toast({
        title: "updating user...",
        description: "please wait",
        variant: "info",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-permission", id] });
      toast({
        title: "success update user",
        variant: "success",
      });
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
