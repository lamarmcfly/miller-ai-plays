"use client";

import { Input } from "@/components/ui/input";

export function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Input
      type="search"
      placeholder="Search plays..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="max-w-sm"
    />
  );
}
