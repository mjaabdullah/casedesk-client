import type { ReactNode } from "react";

interface InfoRowProps {
  icon: ReactNode;
  label: string;
  value: string;
}

/**
 * A single labeled data point (icon + label + value) reused by every
 * information section on the profile page.
 */
export function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent"
      >
        {icon}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-xs font-medium uppercase tracking-wide text-foreground/50">
          {label}
        </span>
        <span className="wrap-break-word text-sm font-medium text-foreground">
          {value}
        </span>
      </div>
    </div>
  );
}
