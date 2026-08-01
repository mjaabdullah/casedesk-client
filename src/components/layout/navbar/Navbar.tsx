import type { CSSProperties } from "react";

import { Logo } from "../../common/Logo";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";
import type { CaseDeskUser } from "./types";

export interface NavbarProps {
  isAuthenticated?: boolean;

  user?: CaseDeskUser;
}

const brandThemeVars = {
  "--accent": "#D4A017",
  "--accent-foreground": "#23272F",
} as CSSProperties;

export function Navbar({ isAuthenticated = false, user }: NavbarProps) {
  return (
    <header
      style={brandThemeVars}
      className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* <NavbarLogo /> */}
        <Logo />
        <DesktopNavbar isAuthenticated={isAuthenticated} user={user} />
        <MobileNavbar isAuthenticated={isAuthenticated} user={user} />
      </div>
    </header>
  );
}
