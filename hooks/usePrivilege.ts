import apiClient from "@/lib/axios";
import { ToastError } from "@/lib/helperClient";
import { TPermission } from "@/lib/validations/permission";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

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
  });
};

export const useAddPrivilege = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toast");
  return useMutation({
    mutationKey: ["privilege"],
    mutationFn: async (data: TPermission) =>
      await apiClient.post("/bank/subject/1/privilege/", data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["privilege"] });
      toast.success(t("privilegeAdded"));
      return data;
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
