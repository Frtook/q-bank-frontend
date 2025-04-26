import apiClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetHistory = () => {
  return useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const res = await apiClient.get("/bank/exam-history/");
      return res.data;
    },
  });
};
