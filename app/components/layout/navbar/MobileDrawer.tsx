import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from "@heroui/react";
import { LogOut, UserCircle } from "lucide-react";
import { MobileMenuItem } from "./MobileMenuItem";

type User = {
  name: string;
  email: string;
  image?: string | null;
};

export function MobileDrawer({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}) {
  return (
    <Drawer isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="border-b border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-4">
          <DrawerHeader className="px-0 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </div>
          </DrawerHeader>
          <DrawerBody className="px-0">
            <div className="flex flex-col gap-1">
              <MobileMenuItem href="/" onClick={onClose}>
                Home
              </MobileMenuItem>
              <MobileMenuItem href="/cases" onClick={onClose}>
                Cases
              </MobileMenuItem>
              <MobileMenuItem href="/dashboard" onClick={onClose}>
                Dashboard
              </MobileMenuItem>
              <MobileMenuItem href="/ai-assistant" onClick={onClose}>
                AI Assistant
              </MobileMenuItem>
              <MobileMenuItem href="/profile" onClick={onClose}>
                <span className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  My Profile
                </span>
              </MobileMenuItem>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  console.log("logout");
                }}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017]/40 focus-visible:ring-offset-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </DrawerBody>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
