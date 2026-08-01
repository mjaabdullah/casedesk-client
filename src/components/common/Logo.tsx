import { Scale } from "lucide-react";
import Link from "next/link";

export function Logo({
  showTagline = true,
  compact = false,
}: {
  showTagline?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href="#home"
      className="flex items-center gap-3"
      aria-label="CaseDesk home"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-[#D4A017] shadow-sm">
        <Scale className={compact ? "h-4 w-4" : "h-5 w-5"} />
      </div>
      <div>
        <p className="text-lg font-semibold tracking-tight text-slate-900">
          CaseDesk
        </p>
        {showTagline ? (
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
            Legal workflow
          </p>
        ) : null}
      </div>
    </Link>
  );
}
