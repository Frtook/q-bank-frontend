import apiClient from "@/lib/axios";
import { SchemaUserGroupPermissioin } from "@/lib/validations/permission/user-group-permission";
import { UserGroupPermission } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { AxiosError } from "axios";
import { ToastError } from "@/lib/helperClient";

export const useGetGroupPermission = () => {
  return useQuery({
    queryKey: ["group-permission"],
    queryFn: async () => {
      const res = await apiClient.get("/auth/manage/group-permission/");
      return res.data as UserGroupPermission[];
    },
  });
};

export const useAddGruopPermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["group-permission"],
    mutationFn: async (body: SchemaUserGroupPermissioin) =>
      await apiClient.post("/auth/manage/group-permission/", body),
    onMutate: () =>
      toast({
        title: "Adding Gruop...",
        variant: "info",
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["group-permission"] });
      toast({
        title: "success add gruop",
        variant: "success",
      });
      return data;
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
