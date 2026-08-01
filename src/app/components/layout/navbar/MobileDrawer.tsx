"use client";

import { buttonVariants, Drawer, Separator, toast } from "@heroui/react";
import { LogOut } from "lucide-react";
import NextLink from "next/link";

import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { Logo } from "../../common/Logo";
import {
  authenticatedNavLinks,
  authLinks,
  casesDropdownLinks,
  publicNavLinks,
  userDropdownLinks,
} from "./navigation.config";
import { NavItem } from "./NavItem";
import type { CaseDeskUser } from "./types";

interface MobileDrawerProps {
  isAuthenticated: boolean;
  user?: CaseDeskUser;

  onNavigate: () => void;
}

export function MobileDrawer({
  isAuthenticated,
  user,
  onNavigate,
}: MobileDrawerProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const { data, error } = await authClient.signOut();
    if (data?.success) {
      router.push("/login");
      router.refresh();
    }
    if (error) {
      toast.warning(error.message);
    }

    onNavigate();
  };

  return (
    <Drawer.Backdrop variant="blur">
      <Drawer.Content placement="right" className="w-[85vw] max-w-sm">
        <Drawer.Dialog
          aria-label="Mobile navigation"
          className="flex h-full flex-col bg-white"
        >
          <Drawer.Header className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-4">
            <Logo />
            <Drawer.CloseTrigger
              aria-label="Close navigation menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[#23272F] outline-none transition-colors duration-150 hover:bg-[#F8F9FB] focus-visible:ring-2 focus-visible:ring-[#D4A017] focus-visible:ring-offset-2"
            />
          </Drawer.Header>

          <Drawer.Body className="flex flex-col gap-1 overflow-y-auto px-3 py-4">
            {isAuthenticated ? (
              <>
                {authenticatedNavLinks.map((link) => (
                  <NavItem
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    variant="mobile"
                    onNavigate={onNavigate}
                  />
                ))}

                <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-wide text-[#23272F]/50">
                  Cases
                </p>
                {casesDropdownLinks.map((item) => (
                  <NavItem
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    variant="mobile"
                    onNavigate={onNavigate}
                  />
                ))}

                <Separator className="my-3 bg-[#E5E7EB]" />

                {userDropdownLinks.map((item) => (
                  <NavItem
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    variant="mobile"
                    onNavigate={onNavigate}
                  />
                ))}

                <Separator className="my-3 bg-[#E5E7EB]" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] font-medium text-red-600 outline-none transition-colors duration-150 hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-[#D4A017] focus-visible:ring-offset-2"
                >
                  <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Logout
                </button>
              </>
            ) : (
              <>
                {publicNavLinks.map((link) => (
                  <NavItem
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    variant="mobile"
                    onNavigate={onNavigate}
                  />
                ))}

                <Separator className="my-3 bg-[#E5E7EB]" />

                <NextLink
                  href={authLinks.login}
                  onClick={onNavigate}
                  className={`${buttonVariants({ variant: "outline", size: "md" })} justify-center`}
                >
                  Login
                </NextLink>
                <NextLink
                  href={authLinks.register}
                  onClick={onNavigate}
                  className={`${buttonVariants({ variant: "primary", size: "md" })} mt-2 justify-center`}
                >
                  Get Started
                </NextLink>
              </>
            )}
          </Drawer.Body>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  );
}
