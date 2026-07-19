"use client";

import { ButtonLink } from "@/app/components/common/ButtonLink";
import { Logo } from "@/app/components/common/Logo";
import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileDrawer } from "./MobileDrawer";

const mockUser = {
  name: "HM Juwel",
  email: "juwel@example.com",
  image: "/avatar.png",
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const user = useMemo(() => mockUser, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <DesktopNavigation user={user} />

        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex rounded-full border border-[#E5E7EB] p-2 text-slate-700 transition hover:border-[#D4A017] hover:text-[#D4A017] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017]/40 focus-visible:ring-offset-2"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <MobileDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} user={user} />
    </header>
  );
}
