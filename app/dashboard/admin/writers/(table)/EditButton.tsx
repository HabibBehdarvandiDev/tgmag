"use client";

import EditUser02Icon from "@/components/icons/EditUser02Icon";
import { Button, Tooltip } from "@nextui-org/react";

const EditButton = ({ id }: { id: number }) => {
  return (
    <Tooltip color="default" content="اصلاح مشخصات">
      <Button color="default" variant="light" isIconOnly className="text-zinc-400"> 
        <EditUser02Icon  />
      </Button>
    </Tooltip>
  );
};

export default EditButton;
