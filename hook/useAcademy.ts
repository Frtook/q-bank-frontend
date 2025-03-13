"use client";
import apiClient from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetacademy = () => {
  return useQuery({
    queryKey: ["academy"],
    queryFn: async () => {
      const res = await apiClient.get("/bank/academy/");
      return res.data;
    },
  });
};
