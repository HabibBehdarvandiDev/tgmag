"use client";
import ToastContainer from "@/components/ui/toast/ToastContainer";
import { Toast, ToastContextType } from "@/types/ui";
import { createContext, ReactNode, useContext, useState } from "react";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[] | []>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts([...toasts, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
