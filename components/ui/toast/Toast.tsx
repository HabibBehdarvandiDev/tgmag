"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ToastProps } from "@/types/ui";
import { useToast } from "@/context/ToastContext";
import DefaultIcon from "./DefaultIcon";
import Cancel01Icon from "@/components/icons/Cancel01Icon";

const variantStyles = {
  success: "bg-white dark:bg-zinc-900 bg-opacity-85 text-white",
  error: "bg-white dark:bg-zinc-900 bg-opacity-85 text-white",
  warning: "bg-white dark:bg-zinc-900 bg-opacity-85 text-black",
  info: "bg-white dark:bg-zinc-900 bg-opacity-85 text-white",
  default: "bg-white dark:bg-zinc-900 bg-opacity-85 text-white",
};

const IconContainerClasses = {
  success: "bg-green-600 bg-opacity-15 text-green-600",
  error: "bg-red-600 bg-opacity-15 text-red-600",
  warning: "bg-yellow-600 bg-opacity-15 text-yellow-600",
  info: "bg-blue-600 bg-opacity-15 text-blue-600",
  default: "bg-gray-300 bg-opacity-15 text-gray-600",
};

const TimerClasess = {
  success: "border-t-green-600",
  error: "border-t-red-600",
  warning: "border-t-yellow-600",
  info: "border-t-blue-600",
  default: "border-t-gray-600",
};

// Helper function for positioning
const getPositionClasses = (position: string) => {
  switch (position) {
    case "top-right":
      return "top-4 right-4";
    case "top-left":
      return "top-4 left-4";
    case "bottom-right":
      return "bottom-4 right-4";
    case "bottom-left":
      return "bottom-4 left-4";
    default:
      return "top-4 right-4";
  }
};

const Toast = ({
  id,
  title,
  message,
  icon,
  variant = "default",
  duration = 5000,
  isPermanent = false,
  position = "top-right",
}: ToastProps) => {
  const { removeToast } = useToast();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPermanent) {
      const interval = setInterval(() => {
        setProgress((prev) => prev + 100 / (duration / 100));
      }, 100);

      const timeout = setTimeout(() => removeToast(id), duration);

      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
  }, [id, duration, isPermanent, removeToast]);

  return (
    <motion.div
      initial={{ opacity: 0, x: position.includes("right") ? 100 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: position.includes("right") ? 100 : -100 }}
      className={`fixed ${
        variantStyles[variant]
      } p-4 rounded-lg shadow-lg ${getPositionClasses(
        position
      )} flex items-start gap-4`}
    >
      <div className="relative">
        {/* Icon container with a circular background and padding */}
        <div
          className={`relative w-10 h-10 ${IconContainerClasses[variant]} rounded-full flex justify-center items-center p-2 `}
        >
          {/* Render the icon if passed, otherwise use the default icon */}
          {icon || <DefaultIcon variant={variant} />}
          {/* Timer ring progress overlay */}
          {!isPermanent && (
            <div
              className={`absolute inset-0 rounded-full border-2 border-transparent ${TimerClasess[variant]}`}
              style={{
                transform: `rotate(${(progress / 100) * 360}deg)`,
                transition: "transform 0.1s linear",
              }}
            />
          )}
        </div>
      </div>

      <div className="flex-1">
        <h4 className="font-bold text-foreground">{title}</h4>
        <p className="text-foreground">{message}</p>
      </div>

      {/* Close button at the top-right corner */}
      <button onClick={() => removeToast(id)}>
        <Cancel01Icon className="w-5 h-5 text-foreground" />
      </button>
    </motion.div>
  );
};

export default Toast;
