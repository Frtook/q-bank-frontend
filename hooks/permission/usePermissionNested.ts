import apiClient from "@/lib/axios";
import { PermissionNested } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetPermissionNested = () => {
  return useQuery({
    queryKey: ["permission-nested"],
    queryFn: async () => {
      const res = await apiClient.get("/bank/permission/nested/");
      return res.data as PermissionNested[];
    },
  });
};
