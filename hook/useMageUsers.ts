import apiClient from "@/lib/axios";
import { SchemaUser } from "@/lib/validations/mange-user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetMangeUser = () => {
  return useQuery({
    queryKey: ["mange-user"],
    queryFn: async () => {
      const res = await apiClient.get("/manage/user/");
      return res.data as MangeUsers[];
    },
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
  });
};
