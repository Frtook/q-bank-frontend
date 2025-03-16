"use client";
import { setCookies } from "@/helper/cookie";
import apiClient from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DAYS = 60 * 60 * 1000 * 7;

export const useRegister = () => {
  const { push } = useRouter();
  return useMutation({
    mutationFn: async (registerData: IRegister) => {
      return await apiClient.post("/auth/register/", registerData);
    },
    onSuccess: async (data) => {
      toast.success(data.data.message);
      console.log(data.data);
      push("/login");
    },
    onError: (error: AxiosError) => {
      toast.error(
        (error.response?.data as { detail: string })?.detail || error.message,
      );
      return error;
    },
  });
};

export const useToken = () => {
  const { push } = useRouter();
  return useMutation({
    mutationFn: async (tokenData: ILogin) => {
      return await apiClient.post("/auth/token/", tokenData);
    },
    onSuccess: async (data) => {
      toast.success("welcome back");
      await setCookies("token", data.data.access, DAYS);
      push("/");
    },
    onError: (error: AxiosError) => {
      toast.error(
        (error.response?.data as { detail: string })?.detail || error.message,
      );
      return error;
    },
  });
};
