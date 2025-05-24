import apiClient from "@/lib/axios";
import { ToastError } from "@/lib/helperClient";
import { TPermission } from "@/lib/validations/permission/permission";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { Privilege } from "@/types";
import { toast } from "../use-toast";

type SearchParams = {
  type: "subject" | "acadmey";
  id: string;
};
export const useGetPrivilege = (params: SearchParams) => {
  return useQuery({
    queryKey: ["privilege"],
    queryFn: async () => {
      const res = await apiClient.get(
        `/bank/${params.type}/${params.id}/privilege/`
      );
      return res.data as Privilege[];
    },
    enabled: !!params.id,
  });
};

export const useAddPrivilege = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toast");
  return useMutation({
    mutationKey: ["privilege"],
    mutationFn: async (data: TPermission) =>
      await apiClient.post("/bank/subject/1/privilege/", data),
    onMutate: () =>
      toast({
        title: "Adding Privilege...",
        variant: "info",
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["privilege"] });
      toast({
        title: t("privilegeAdded"),
        variant: "success",
      });
      return data;
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
