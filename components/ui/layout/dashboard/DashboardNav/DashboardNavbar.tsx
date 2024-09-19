"use client";
import { NavbarLinks } from "@/schema/UI";
import Link from "next/link";
import {
  AdminNavbarLinks,
  ManagerNavbarLinks,
  WriterNavbarLinks,
} from "./NavbarLinks";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const roleLinks: { [key: string]: NavbarLinks[] } = {
  admin: AdminNavbarLinks,
  writer: WriterNavbarLinks,
  manager: ManagerNavbarLinks,
};

const DashboardNavbar = () => {
  const pathname = usePathname();
  const [role, setRole] = useState<string>("writer");

  useEffect(() => {
    const storedRole = localStorage.getItem("user_role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <nav className="flex flex-col justify-start items-start gap-3 bg-background text-foreground rounded-lg">
      {roleLinks[role].map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={classnames(
            "w-full px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center align-middle gap-3", // Base styles
            {
              "bg-primary text-white": pathname === link.href,
              "hover:bg-muted hover:text-primary": pathname !== link.href,
            }
          )}
        >
          {link.startContent} {link.title}
        </Link>
      ))}
    </nav>
  );
};

export default DashboardNavbar;
