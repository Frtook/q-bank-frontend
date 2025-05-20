"use client";
import { setCookies } from "@/lib/helperServer";
import apiClient from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "./use-toast";
import { ToastError } from "@/lib/helperClient";
import { useTranslations } from "next-intl";

const DAYS = 60 * 60 * 1000 * 7;

export const useRegister = () => {
  const { push } = useRouter();
  const t = useTranslations("toast");
  return useMutation({
    mutationFn: async (registerData: IRegister) => {
      return await apiClient.post("/auth/register/", registerData);
    },
    onMutate: () =>
      toast({ title: "Processing your request...", variant: "info" }),
    onSuccess: async (data) => {
      toast({
        title: t("registrationSuccess"),
        variant: "success",
      });
      push("/login");
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};

export const useToken = () => {
  const { push } = useRouter();
  const t = useTranslations("toast");
  return useMutation({
    mutationFn: async (tokenData: ILogin) => {
      return await apiClient.post("/auth/token/", tokenData);
    },
    onMutate: () =>
      toast({ title: "Processing your request...", variant: "info" }),
    onSuccess: async (data) => {
      toast({
        title: t("welcomeBack"),

        variant: "success",
      });
      await setCookies("accessToken", data.data.access, DAYS);
      await setCookies("refreshToken", data.data.refresh, DAYS * 30);
      push("/");
    },
    onError: (error: AxiosError) => ToastError(error?.response?.data as Error),
  });
};
