"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/navbar/Navbar";
import type { CaseDeskUser } from "@/components/layout/navbar/types";

interface SiteChromeProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  user?: CaseDeskUser;
}

export function SiteChrome({
  children,
  isAuthenticated,
  user,
}: SiteChromeProps) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard ? (
        <Navbar isAuthenticated={isAuthenticated} user={user} />
      ) : null}
      {children}
      {!isDashboard ? <Footer /> : null}
    </>
  );
}
