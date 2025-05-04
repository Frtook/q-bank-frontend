import { toast } from "sonner";

export const getSubjectName = (id: number, academies: IAcademy[]) => {
  const academy = academies.find((academy) => academy.id === id);
  return academy?.name ?? "Unknown";
};

export const ToastError = (errors: Error) => {
  console.log("error is:", errors);
  Object.entries(errors).forEach(([field, messages]) => {
    console.log("field", field);
    console.log("messages", messages);
    if (typeof messages === "string") {
      toast.error(`${field}: ${messages}`);
    }
    messages.forEach((message) => {
      console.log("gg", field, message);
      toast.error(`${field}: ${message}`);
    });
  });
};
