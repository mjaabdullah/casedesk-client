"use client";

import { Drawer, useOverlayState } from "@heroui/react";
import { Menu, X } from "lucide-react";

import { MobileDrawer } from "./MobileDrawer";
import type { CaseDeskUser } from "./types";

interface MobileNavbarProps {
  isAuthenticated: boolean;
  user?: CaseDeskUser;
}

export function MobileNavbar({ isAuthenticated, user }: MobileNavbarProps) {
  const state = useOverlayState({ defaultOpen: false });

  return (
    <div className="flex items-center md:hidden">
      <button
        type="button"
        onClick={state.toggle}
        aria-expanded={state.isOpen}
        aria-label={
          state.isOpen ? "Close navigation menu" : "Open navigation menu"
        }
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[#23272F] outline-none transition-colors duration-150 hover:bg-[#F8F9FB] focus-visible:ring-2 focus-visible:ring-[#D4A017] focus-visible:ring-offset-2"
      >
        {state.isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      <Drawer state={state}>
        <MobileDrawer
          isAuthenticated={isAuthenticated}
          user={user}
          onNavigate={state.close}
        />
      </Drawer>
    </div>
  );
}
