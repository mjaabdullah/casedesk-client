"use client";

import { Button, Dropdown, Label } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { casesDropdownLinks } from "./navigation.config";
import { cx } from "./utils";

export function CasesDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="ghost"
        aria-label="Cases menu"
        className="gap-1.5 px-3 text-sm font-medium text-[#23272F]/70 data-[hovered=true]:text-[#23272F]"
      >
        Cases
        <ChevronDown
          aria-hidden="true"
          className={cx(
            "h-4 w-4 text-[#23272F]/50 transition-transform duration-150",
            isOpen && "rotate-180 text-[#D4A017]",
          )}
        />
      </Button>

      <Dropdown.Popover
        placement="bottom start"
        className="min-w-[220px] rounded-lg border border-[#E5E7EB] bg-white p-1.5 shadow-lg shadow-black/5"
      >
        <Dropdown.Menu aria-label="Cases">
          {casesDropdownLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Dropdown.Item
                key={item.href}
                id={item.href}
                href={item.href}
                textValue={item.label}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm text-[#23272F] outline-none transition-colors duration-150 data-[hovered=true]:bg-[#F8F9FB] data-[focus-visible=true]:bg-[#F8F9FB]"
              >
                <Icon
                  className="h-4 w-4 text-[#23272F]/60"
                  aria-hidden="true"
                />
                <Label>{item.label}</Label>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
