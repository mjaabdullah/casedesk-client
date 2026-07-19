import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";
import { LogOut, UserCircle } from "lucide-react";
import { UserAvatar } from "./UserAvatar";

type User = {
  name: string;
  email: string;
  image?: string | null;
};

export function UserDropdown({ user }: { user: User }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <button
          type="button"
          className="rounded-full p-1 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017]/40 focus-visible:ring-offset-2"
        >
          <UserAvatar user={user} />
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="User menu">
        <DropdownSection>
          <DropdownItem key="profile" href="/profile" textValue="My Profile">
            My Profile
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          key="logout"
          className="text-rose-600"
          onAction={() => console.log("logout")}
          textValue="Logout"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
