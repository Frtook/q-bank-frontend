import apiClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetPermission = () => {
  return useQuery({
    queryKey: ["premission"],
    queryFn: async () => {
      const res = await apiClient.get("/bank/permission/");
      return res.data;
    },
  });
};
