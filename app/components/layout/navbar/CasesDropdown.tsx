import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const caseItems = [
  { key: "explore", label: "Explore Cases", href: "/cases" },
  { key: "add", label: "Add Case", href: "/cases/add" },
  { key: "manage", label: "Manage Cases", href: "/cases/manage" },
] as const;

export function CasesDropdown() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button
          type="button"
          className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-[#D4A017] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017]/40 focus-visible:ring-offset-2"
        >
          Cases
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Cases menu">
        {caseItems.map((item) => (
          <DropdownItem key={item.key} href={item.href} textValue={item.label}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
