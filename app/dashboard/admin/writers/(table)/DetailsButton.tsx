"use client";

import EyeIcon from "@/components/icons/EyeIcon";
import { Button, Tooltip } from "@nextui-org/react";

const DetailsButton = ({ id }: { id: number }) => {
  return (
    <Tooltip color="default" content="مشخصات نویسنده">
      <Button
        color="default"
        variant="light"
        isIconOnly
        className="text-zinc-400"
      >
        <EyeIcon />
      </Button>
    </Tooltip>
  );
};

export default DetailsButton;
