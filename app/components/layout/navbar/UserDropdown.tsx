"use client";

import {
  Avatar,
  Button,
  Dropdown,
  Label,
  Separator,
  toast,
} from "@heroui/react";
import { LogOut } from "lucide-react";
import { useState } from "react";

import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { userDropdownLinks } from "./navigation.config";
import type { CaseDeskUser } from "./types";
import { getInitials } from "./utils";

interface UserDropdownProps {
  user?: CaseDeskUser;
}

export function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const displayName = user?.name ?? "Account";
const router = useRouter();

const handleLogout = async () => {
  const { data, error } = await authClient.signOut();
  if (data?.success) {
    router.push("/login");
  }
  if (error) {
    toast.warning(error.message);
  }
};

  return (
    <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
      <Dropdown.Trigger>
        <Button
          isIconOnly
          variant="ghost"
          aria-label={`Open ${displayName} menu`}
          className="h-9 w-9 rounded-full p-0.5"
        >
          <Avatar size="sm">
            {user?.avatarUrl ? (
              <Avatar.Image src={user.avatarUrl} alt={displayName} />
            ) : null}
            <Avatar.Fallback className="bg-[#23272F] font-medium text-white">
              {getInitials(displayName)}
            </Avatar.Fallback>
          </Avatar>
        </Button>
      </Dropdown.Trigger>

      <Dropdown.Popover
        placement="bottom end"
        className="min-w-[220px] rounded-lg border border-[#E5E7EB] bg-white p-1.5 shadow-lg shadow-black/5"
      >
        <Dropdown.Menu
          aria-label="Account"
          onAction={(key) => {
            if (key === "logout") {
              handleLogout();
            }
          }}
        >
          {userDropdownLinks.map((item) => {
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

          <Separator className="my-1 bg-[#E5E7EB]" />

          <Dropdown.Item
            id="logout"
            textValue="Logout"
            variant="danger"
            className="flex cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm outline-none transition-colors duration-150"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <Label>Logout</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
