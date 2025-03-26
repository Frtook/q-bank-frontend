import apiClient from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetSubject = () => {
  return useQuery({
    queryKey: ["subject"],
    queryFn: async () => {
      const res = await apiClient.get("/bank/subject/");
      return res.data as ISubject[];
    },
  });
};

export const useAddSubject = () => {
  return useMutation({
    mutationKey: ["subject"],
    mutationFn: async (data) => await apiClient.post("/bank/subject/", data),
  });
};
