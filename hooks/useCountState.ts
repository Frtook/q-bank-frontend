import apiClient from "@/lib/axios";
import { CountState } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetCountState = () => {
  return useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await apiClient.get("/stats/count/");
      return res.data as CountState;
    },
  });
};
