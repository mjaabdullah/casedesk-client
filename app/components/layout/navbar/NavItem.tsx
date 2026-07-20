"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

import type { IconComponent } from "./types";
import { cx } from "./utils";

export interface NavItemProps {
  href: string;
  label: string;

  variant?: "desktop" | "mobile";

  icon?: IconComponent;

  onNavigate?: () => void;
}

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavItem({
  href,
  label,
  variant = "desktop",
  icon: Icon,
  onNavigate,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = isRouteActive(pathname, href);

  if (variant === "mobile") {
    return (
      <NextLink
        href={href}
        onClick={onNavigate}
        aria-current={isActive ? "page" : undefined}
        className={cx(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium outline-none transition-colors duration-150",
          "focus-visible:ring-2 focus-visible:ring-[#D4A017] focus-visible:ring-offset-2",
          isActive
            ? "bg-[#F8F9FB] text-[#23272F]"
            : "text-[#23272F]/70 hover:bg-[#F8F9FB] hover:text-[#23272F]",
        )}
      >
        {Icon ? <Icon className="h-4 w-4 shrink-0" /> : null}
        {label}
      </NextLink>
    );
  }

  return (
    <NextLink
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cx(
        "relative flex items-center rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors duration-150",
        "focus-visible:ring-2 focus-visible:ring-[#D4A017] focus-visible:ring-offset-2",
        isActive ? "text-[#23272F]" : "text-[#23272F]/70 hover:text-[#23272F]",
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className={cx(
          "absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-[#D4A017] transition-opacity duration-150",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />
    </NextLink>
  );
}
