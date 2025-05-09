import apiClient from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetDocument = () => {
  return useQuery({
    queryKey: ["document"],
    queryFn: async () => {
      const res = await apiClient.get("/bank/document/");
      return res.data as Documents[];
    },
  });
};

export const useAddDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["document"],
    mutationFn: async (data: FormData) =>
      apiClient.post("/bank/document/", data),
    onSuccess: () => {
      toast.success("Success Upload");
      queryClient.invalidateQueries({ queryKey: ["document"] });
    },
  });
};
