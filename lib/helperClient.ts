import { toast } from "sonner";

export const getSubjectName = (id: number, academies: IAcademy[]) => {
  const academy = academies.find((academy) => academy.id === id);
  return academy?.name ?? "_";
};

export const ToastError = (errors: Error) => {
  Object?.entries(errors).forEach(([field, messages]) => {
    if (typeof messages === "string") {
      toast.error(`${field}: ${messages}`);
    }
    messages.forEach((message) => {
      toast.error(`${field}: ${message}`);
    });
  });
};

export const IsDev = () => {
  return process.env.NODE_ENV === "development";
};
