"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

import { cn } from "@/lib/utils";
import SuccessCheck from "../icons/success-check";
import Info from "../icons/info";
import WarningInfo from "../icons/warning-info";
import XError from "../icons/x-error";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast
            key={id}
            {...props}
          >
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="flex items-center gap-x-2">
                  {variant == "success" && <SuccessCheck />}
                  {variant == "info" && <Info />}
                  {variant == "warning" && <WarningInfo />}
                  {variant == "destructive" && <XError />}
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription
                  className={cn("", {
                    "ps-12": variant != undefined,
                  })}
                >
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
