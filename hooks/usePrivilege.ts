import apiClient from "@/lib/axios";
import { TPermission } from "@/lib/validations/permission";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

  return useMutation({
    mutationKey: ["privilege"],
    mutationFn: async (data: TPermission) =>
      await apiClient.post("/bank/subject/1/privilege/", data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["privilege"] });
      toast.success("success");
      return data;
    },
  });
};
