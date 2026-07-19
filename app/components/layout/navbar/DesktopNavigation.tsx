import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { CasesDropdown } from "./CasesDropdown";
import { NavigationLinks } from "./NavigationLinks";
import { UserDropdown } from "./UserDropdown";

type User = {
  name: string;
  email: string;
  image?: string | null;
};

export function DesktopNavigation({ user }: { user: User }) {
  return (
    <div className="hidden items-center gap-6 md:flex">
      <nav aria-label="Primary" className="flex items-center gap-2">
        <NavigationLinks />
        <CasesDropdown />
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-[#D4A017] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017]/40 focus-visible:ring-offset-2"
        >
          Dashboard
        </Link>
        <Link
          href="/ai-assistant"
          className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-[#D4A017] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017]/40 focus-visible:ring-offset-2"
        >
          AI Assistant
        </Link>
        <UserDropdown user={user} />
      </div>
    </div>
  );
}
