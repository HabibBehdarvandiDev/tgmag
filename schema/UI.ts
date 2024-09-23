import { ReactNode } from "react";

type AsideLinks = {
  key: string;
  description?: string;
  title: string; // This can represent the content inside the DropdownItem
  shortcut?: string; // Add this to match the "shortcut" prop
  color?:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | undefined;
  href?: string;
  startContent?: ReactNode; // Optional content for the start
  endContent?: ReactNode; // Optional content for the end
};

type AsideLinksSection = {
  section: string;
  links: AsideLinks[];
};

type AsideDropDown = AsideLinksSection[];

type NavbarSubLink = {
  title: string;
  href: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
};

type NavbarLinks = {
  title: string;
  href: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  links?: NavbarSubLink[];
};

type NavbarLink = NavbarLinks[];

type TableRows = {
  key: string;
  name: string;
  role: string;
  status: string;
};

type TableColumns = {
  key: string;
  label: string;
};

type WritersTableData = {
  id: number;
  first_name: string;
  last_name: string;
  role_id: number;
  email: string;
  phone_number: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
};

export type {
  AsideLinks,
  AsideLinksSection,
  AsideDropDown,
  NavbarLinks,
  NavbarSubLink,
  NavbarLink,
  TableRows,
  TableColumns,
  WritersTableData,
};
