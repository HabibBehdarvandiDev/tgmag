"use client";

import { useToast } from "@/context/ToastContext";
import { Button } from "@nextui-org/react";

export default function Home() {
  const { addToast } = useToast();

  const handleShowToast = () => {
    addToast({
      title: "Success",
      message: "This is a success toast!",
      variant: "success",
      duration: 3000,
      position: "top-right",
      isPermanent: true,
      icon:<div>💵</div>
    });
  };

  return (
    <div>
      <Button onClick={handleShowToast}>click</Button>
    </div>
  );
}
