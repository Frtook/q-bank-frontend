import apiClient from "@/lib/axios";
import { ToastError } from "@/lib/helperClient";
import { TschemaProfile } from "@/lib/validations/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("toast");
  return useMutation({
    mutationKey: ["profile"],
    mutationFn: async (data: TschemaProfile) =>
      await apiClient.patch("/myprofile/", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success(t("profileUpdated"));
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
