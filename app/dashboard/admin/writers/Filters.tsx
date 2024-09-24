"use client";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import AddWriterButton from "./AddWriterButton";
import { Input } from "@nextui-org/react";

const Filters = ({
  setSearchTerm,
}: {
  setSearchTerm: Dispatch<SetStateAction<string>>;
}) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex items-center justify-start gap-3 bg-background-100 rounded-lg p-2">
      <AddWriterButton />
      <Input
        placeholder="جستوجو"
        value={searchInput}
        onChange={(e) => handleSearch(e)}
        variant="flat"
        className="max-w-[350px]"
      />
    </div>
  );
};

export default Filters;
