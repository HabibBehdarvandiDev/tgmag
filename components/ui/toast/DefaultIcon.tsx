import Alert02Icon from "@/components/icons/Alert02Icon";
import AlertCircleIcon from "@/components/icons/AlertCircleIcon";
import CheckmarkCircle02Icon from "@/components/icons/CheckmarkCircle02Icon";
import InformationCircleIcon from "@/components/icons/InformationCircleIcon";
import React from "react";

const DefaultIcon = ({
  variant,
}: {
  variant: "success" | "error" | "warning" | "info" | "default";
}) => {
  switch (variant) {
    case "success":
      return <CheckmarkCircle02Icon />;
    case "error":
      return <AlertCircleIcon />;
    case "warning":
      return <Alert02Icon />;
    case "info":
      return <InformationCircleIcon />;
    case "default":
      return <InformationCircleIcon />;
    default:
      return <InformationCircleIcon />;
  }
};

export default DefaultIcon;
