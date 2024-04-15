"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className={"bg-slate-900 Toast"}>
            <div className="grid gap-1 bg-transparent">
              {title && (
                <ToastTitle className={"bg-transparent text-slate-100 "}>
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className={"bg-transparent text-slate-200"}>
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
