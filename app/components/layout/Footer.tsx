import { footerColumns } from "@/app/content/casedesk";
import { BookOpen, FileText, Scale, Sparkles } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#23272F] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-[#D4A017]">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">CaseDesk</p>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  Manage every case with confidence
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              A premium case management platform designed for modern law firms,
              assistants, and clients.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="transition hover:text-[#D4A017]">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>Email: hello@casedesk.com</li>
              <li>Phone: +1 (800) 555-0199</li>
              <li>Address: 88 Court Street, New York, NY</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CaseDesk. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {[
              { label: "LinkedIn", icon: BookOpen },
              { label: "X", icon: Sparkles },
              { label: "Docs", icon: FileText },
            ].map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="rounded-full border border-white/10 p-2.5 transition hover:border-[#D4A017] hover:text-[#D4A017]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
