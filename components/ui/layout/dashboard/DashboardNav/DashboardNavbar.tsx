"use client";
import { NavbarLinks } from "@/schema/UI";
import Link from "next/link";
import {
  AdminNavbarLinks,
  ManagerNavbarLinks,
  WriterNavbarLinks,
} from "./NavbarLinks";
import { useEffect, useRef, useState } from "react";
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
  const [activeLinkIndex, setActiveLinkIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("user_role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  useEffect(() => {
    // Update activeLinkIndex based on the current pathname
    const currentIndex = roleLinks[role].findIndex(
      (link) => link.href === pathname
    );
    if (currentIndex !== -1) {
      setActiveLinkIndex(currentIndex);
    }
  }, [pathname, role]);

  return (
    <nav
      className="relative flex flex-col justify-start items-start gap-3 bg-background text-foreground rounded-lg"
      ref={navRef}
    >
      {activeLinkIndex !== null && (
        <span
          className="absolute right-0 w-[6px] bg-primary rounded-l-xl transition-all duration-100 ease-in-out"
          style={{
            top: `calc(${activeLinkIndex} * 48px)`, // Assuming each link has a height of 48px
            height: "48px",
          }}
        />
      )}

      {roleLinks[role].map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={classnames(
            "w-full px-4 py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center align-middle gap-3 relative", // Base styles
            {
              "text-primary": pathname === link.href, // Active link text color
              "hover:bg-muted hover:text-primary": pathname !== link.href, // Hover state
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
