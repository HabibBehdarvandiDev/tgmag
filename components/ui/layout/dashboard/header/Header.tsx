"use client";
import { Card } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import {
  AdminNavbarLinks,
  ManagerNavbarLinks,
  WriterNavbarLinks,
} from "../DashboardNav/NavbarLinks";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

// Utility function to get the current page title based on the route
const getCurrentPageTitle = (path: string) => {
  const allLinks = [
    ...AdminNavbarLinks,
    ...ManagerNavbarLinks,
    ...WriterNavbarLinks,
  ];
  const link = allLinks.find((link) => link.href === path);

  return link ? link.title : "Unknown Page";
};

const DashboardHeader = () => {
  const pathname = usePathname();
  const currentPageTitle = getCurrentPageTitle(pathname);
  return (
    <Card className="w-full rounded-none p-4 flex flex-row gap-3 justify-between items-center align-middle shadow-none">
      <h1 className="text-xl">{currentPageTitle}</h1>

      <ThemeSwitcher />
    </Card>
  );
};

export default DashboardHeader;
