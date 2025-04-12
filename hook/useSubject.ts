import apiClient from "@/lib/axios";
import { Subject } from "@/lib/validations/subject";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetSubject = () => {
  return useQuery({
    queryKey: ["subject"],
    queryFn: async () => {
      const res = await apiClient.get("/bank/subject/");
      return res.data as Omit<Subject, "academy">[];
    },
  });
};

export const useAddSubject = () => {
  return useMutation({
    mutationKey: ["subject"],
    mutationFn: async (data: Subject) =>
      await apiClient.post("/bank/subject/", data),
  });
};
