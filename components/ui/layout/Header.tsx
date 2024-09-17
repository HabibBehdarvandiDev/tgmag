import { Button } from "@nextui-org/react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-background shadow-sm p-5 flex justify-between align-middle items-center">
      <h1 className="text-xl text-primary font-semibold">tgMAG</h1>
      <nav className="flex gap-3">
        <Link href={"/"}>لینک</Link>
        <Link href={"/"}>لینک</Link>
        <Link href={"/"}>لینک</Link>
        <Link href={"/"}>لینک</Link>
      </nav>

      <div>
        <Button color="primary">
            ورود
        </Button>
      </div>
    </header>
  );
};

export default Header;
