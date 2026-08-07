import type { ComponentType } from "react";

export type IconComponent = ComponentType<{ className?: string }>;

export interface CaseDeskUser {
  name: string;
  email?: string;
  image?: string;
  userType?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavLinkWithIcon extends NavLink {
  icon: IconComponent;
}
