import {
  FilePlus2,
  FolderSearch,
  LayoutDashboard,
  ListChecks,
  Sparkles,
  UserRound,
} from "lucide-react";

import type { NavLink, NavLinkWithIcon } from "./types";

export const publicNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Cases", href: "/cases" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const authenticatedNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const casesDropdownLinks: NavLinkWithIcon[] = [
  { label: "Explore Cases", href: "/cases", icon: FolderSearch },
  { label: "Add Case", href: "/cases/add", icon: FilePlus2 },
  { label: "Manage Cases", href: "/cases/manage", icon: ListChecks },
];

export const userDropdownLinks: NavLinkWithIcon[] = [
  { label: "My Profile", href: "/profile", icon: UserRound },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI Assistant", href: "/ai-assistant", icon: Sparkles },
];

export const authLinks = {
  login: "/login",
  register: "/register",
} as const;
