"use client"
import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { Input } from "./input";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
}

const SearchInput = ({ placeholder = "Search...", onSearch, className }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) onSearch(searchTerm);
    }, 300); // Debounce to optimize performance

    return () => clearTimeout(handler);
  }, [searchTerm, onSearch]);

  return (
    <div className={clsx("relative flex items-center", className)}>
      <MagnifyingGlassIcon className="absolute left-3 w-5 h-5 text-gray-500" />
      <Input
        className={clsx(
          "pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        )}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />
    </div>
  );
};

export default SearchInput;
