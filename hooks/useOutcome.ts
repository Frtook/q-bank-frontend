"use client";
import apiClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetOutcome = () => {
  return useQuery({
    queryKey: ["outcome"],
    queryFn: async () => {
      const res = await apiClient.get("/bank/outcome/");
      return res.data;
    },
  });
};
