import apiClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type SearchParams = {
  type?: string;
};
export const useGetPermission = (params: SearchParams) => {
  return useQuery({
    queryKey: ["premission"],
    queryFn: async () => {
      const res = await apiClient.get("/bank/permission/", { params });
      return res.data as { id: number; name: string }[];
    },
  });
};
