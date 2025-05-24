import apiClient from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { AxiosError } from "axios";
import { ToastError } from "@/lib/helperClient";
import { Documents } from "@/types";

type Params = {
  subject: string;
};
export const useGetDocument = (params: Params) => {
  return useQuery({
    queryKey: ["document"],
    queryFn: async () => {
      const res = await apiClient.get("/bank/document/", { params });
      return res.data as Documents[];
    },
    enabled: !!params.subject,
  });
};

export const useAddDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["document"],
    mutationFn: async (data: FormData) =>
      apiClient.post("/bank/document/", data),
    onMutate: () =>
      toast({
        title: "Uploading...",
        description: "Your document is being uploaded.",
        variant: "info",
      }),
    onSuccess: () => {
      toast({
        title: "Success Upload",
        description: "Your document has been successfully uploaded.",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["document"] });
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
