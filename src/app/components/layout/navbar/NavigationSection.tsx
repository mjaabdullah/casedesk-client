import type { ReactNode } from "react";

import { cx } from "./utils";

interface NavigationSectionProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function NavigationSection({
  children,
  className,
  ariaLabel = "Primary",
}: NavigationSectionProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cx("flex items-center gap-1", className)}
    >
      {children}
    </nav>
  );
}
