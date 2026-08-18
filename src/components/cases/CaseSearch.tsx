"use client";

import { Label, SearchField } from "@heroui/react";

interface CaseSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function CaseSearch({ value, onChange }: CaseSearchProps) {
  return (
    <SearchField value={value} onChange={onChange} className="w-full sm:max-w-sm">
      <Label className="text-xs font-medium text-muted">খুঁজুন</Label>
      <SearchField.Group className="bg-background">
        <SearchField.SearchIcon />
        <SearchField.Input placeholder="মামলা নম্বর, বাদী বা বিবাদীর নাম দিয়ে খুঁজুন" />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  );
}
