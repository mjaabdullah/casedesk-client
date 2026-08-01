import { buttonVariants } from "@heroui/react";
import NextLink from "next/link";

import { AuthenticatedNavigation } from "./AuthenticatedNavigation";
import { authLinks } from "./navigation.config";
import { PublicNavigation } from "./PublicNavigation";
import type { CaseDeskUser } from "./types";
import { UserDropdown } from "./UserDropdown";

interface DesktopNavbarProps {
  isAuthenticated: boolean;
  user?: CaseDeskUser;
}

export function DesktopNavbar({ isAuthenticated, user }: DesktopNavbarProps) {
  return (
    <div className="hidden flex-1 items-center justify-between md:flex">
      <div className="flex flex-1 justify-center">
        {isAuthenticated ? <AuthenticatedNavigation /> : <PublicNavigation />}
      </div>

      <div className="flex items-center gap-2 pl-4">
        {isAuthenticated ? (
          <UserDropdown user={user} />
        ) : (
          <>
            <NextLink
              href={authLinks.login}
              className={buttonVariants({ variant: "ghost", size: "md" })}
            >
              Login
            </NextLink>
            <NextLink
              href={authLinks.register}
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              Get Started
            </NextLink>
          </>
        )}
      </div>
    </div>
  );
}
