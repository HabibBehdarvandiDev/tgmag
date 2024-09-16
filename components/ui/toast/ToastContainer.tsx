import { useToast } from "@/context/ToastContext";
import { AnimatePresence } from "framer-motion";
import Toast from "./Toast";

const ToastContainer = () => {
  const { toasts } = useToast();
  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
