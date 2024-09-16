import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LinkSquare02Icon from "./icons/LinkSquare02Icon";

const DynamicAuthButton = () => {
  const path = usePathname();
  return (
    <Button
      as={Link}
      href={path.includes("auth/login") ? "/auth/register" : "/auth/login"}
      variant="light"
      color="primary"
      startContent={<LinkSquare02Icon className="w-4 h-4" />}
    >
      {path.includes("auth/login")
        ? "نام کاربری ندارید؟ ثبت نام کنید"
        : "نام کاربری دارید؟وارد شوید"}
    </Button>
  );
};

export default DynamicAuthButton;
