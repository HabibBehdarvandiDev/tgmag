"use client";

import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import DarkModeIcon from "./icons/DarkModeIcon";
import Moon02Icon from "./icons/Moon02Icon";
import Sun03Icon from "./icons/Sun03Icon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Button
        color="primary"
        isIconOnly
        variant="flat"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? <Moon02Icon /> : <Sun03Icon />}
      </Button>
    </div>
  );
}
