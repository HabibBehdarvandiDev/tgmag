"use client";

import { useToast } from "@/context/ToastContext";
import { useUser } from "@/context/userContext";
import { Button } from "@nextui-org/react";

export default function Home() {
  const { addToast } = useToast();
  const { user } = useUser();

  const handleShowToast = () => {
    addToast({
      title: "Success",
      message: "This is a success toast!",
      variant: "info",
      duration: 3000,
      position: "top-right",
      isPermanent: true,
    });
  };

  return (
    <div>
      <Button onClick={handleShowToast}>{user?.first_name}</Button>
    </div>
  );
}
