"use client";

import { ButtonLink } from "@/app/components/common/ButtonLink";
import { Logo } from "@/app/components/common/Logo";
import { navLinks } from "@/app/content/casedesk";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-[#D4A017]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href="#contact" variant="ghost">
            Login
          </ButtonLink>
          <ButtonLink href="#cases" variant="primary">
            Get Started
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex rounded-full border border-slate-200 p-2 text-slate-700 md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-sm md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#D4A017]"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <ButtonLink
                href="/login"
                variant="ghost"
                className="justify-center"
              >
                Login
              </ButtonLink>
              <ButtonLink
                href="/register"
                variant="primary"
                className="justify-center"
              >
                Get Started
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
