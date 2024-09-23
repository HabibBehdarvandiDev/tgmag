"use client";

import Delete02Icon from "@/components/icons/Delete02Icon";
import { Button, Tooltip } from "@nextui-org/react";

const DeleteButton = ({ id }: { id: number }) => {
  return (
    <Tooltip color="danger" content="حذف نویسنده">
      <Button color="danger" variant="light" isIconOnly>
        <Delete02Icon />
      </Button>
    </Tooltip>
  );
};

export default DeleteButton;
