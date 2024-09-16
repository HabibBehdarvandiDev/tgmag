type Toast = {
  id: string;
  title: string;
  message: JSX.Element | string;
  icon?: JSX.Element;
  variant?: "success" | "error" | "warning" | "info" | "default";
  duration?: number; // Timer duration (in ms)
  isPermanent?: boolean;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
};

type ToastContextType = {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
};

type ToastProps = {
  id: string;
  title: string;
  message: JSX.Element | string;
  icon?: JSX.Element;
  variant?: "success" | "error" | "warning" | "info" | "default";
  duration?: number;
  isPermanent?: boolean;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
};

export type { Toast, ToastContextType, ToastProps };
