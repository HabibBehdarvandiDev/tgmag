"use client";
import { AsideLinksSection } from "@/schema/UI";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  AdminDropDownLinks,
  ManagerDropDownLinks,
  WriterDropDownLinks,
} from "./DropDownLinks";

const AsideDropDown = () => {
  const [role, setRole] = useState<string>("writer");

  useEffect(() => {
    const storedRole = localStorage.getItem("user_role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const roleLinks: { [key: string]: AsideLinksSection[] } = {
    admin: AdminDropDownLinks,
    writer: WriterDropDownLinks,
    manager: ManagerDropDownLinks,
  };

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: "#",
          }}
          className="transition-transform"
          description="@habibetoon"
          name="حبیب بهداروندی"
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="Dropdown menu with description">
        {roleLinks[role].map((section) => (
          <DropdownSection title={section.section} key={section.section}>
            {section.links.map((link) => (
              <DropdownItem
                key={link.key}
                shortcut={link.shortcut}
                description={link.description}
                color={link.color}
                startContent={link.startContent || null}
                href={link.href}
              >
                {link.title}
              </DropdownItem>
            ))}
          </DropdownSection>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default AsideDropDown;
