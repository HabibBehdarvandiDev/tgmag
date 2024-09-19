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

export type { AsideLinks, AsideLinksSection,AsideDropDown };
