import apiClient from "@/lib/axios";
import { ToastError } from "@/lib/helperClient";
import { TschemaProfile } from "@/lib/validations/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await apiClient.get("/myprofile/");
      return res.data as TschemaProfile;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["profile"],
    mutationFn: async (data: TschemaProfile) =>
      await apiClient.patch("/myprofile/", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated");
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
