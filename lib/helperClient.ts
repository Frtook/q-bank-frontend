import { toast } from "@/hooks/use-toast";
import { IAcademy } from "@/types";
import Cookies from "js-cookie";

export const getSubjectName = (id: number, academies: IAcademy[]) => {
  const academy = academies.find((academy) => academy.id === id);
  return academy?.name ?? "_";
};

export const ToastError = (errors: Error) => {
  Object?.entries(errors).forEach(([field, messages]) => {
    if (typeof messages === "string") {
      toast({
        title: `${field}: ${messages}`,
        variant: "destructive",
      });
    }
    messages.forEach((message) => {
      toast({
        title: `${field}: ${message}`,
        variant: "destructive",
      });
    });
  });
};

export const IsDev = () => {
  return process.env.NODE_ENV === "development";
};

export const sliceString = (str: string, start: number, end: number) => {
  if (str.length > start + end) {
    return str.slice(start, end) + "...";
  }
  return str;
};
export const getLocate = () => {
  const locale = Cookies.get("locale");
  if (locale) {
    return locale;
  }
};
