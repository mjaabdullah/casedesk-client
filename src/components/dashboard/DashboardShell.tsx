"use client";

import { Button } from "@heroui/react";
import {
  BriefcaseBusiness,
  Building2,
  FilePlus2,
  FolderKanban,
  FolderSearch,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { UserDropdown } from "@/components/layout/navbar/UserDropdown";
import type { CaseDeskUser } from "@/components/layout/navbar/types";
import type { UserType } from "@/components/profile/profile";

interface DashboardShellProps {
  children: React.ReactNode;
  user: CaseDeskUser & { userType: UserType };
}

const roleLabels: Record<UserType, string> = {
  lawyer: "Lawyer",
  assistant: "Lawyer Assistant",
  general: "General User",
};

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/my-chamber": "My Chamber",
  "/dashboard/chamber-cases": "Chamber Cases",
};

interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

function getNavigation(userType: UserType): NavigationItem[] {
  const common = [{ label: "Overview", href: "/dashboard", icon: LayoutDashboard }];

  if (userType === "lawyer") {
    return [
      ...common,
      { label: "Manage Cases", href: "/cases/manage", icon: FolderKanban },
      { label: "Add Case", href: "/cases/add", icon: FilePlus2 },
      { label: "My Chamber", href: "/dashboard/my-chamber", icon: Building2 },
      {
        label: "Chamber Cases",
        href: "/dashboard/chamber-cases",
        icon: BriefcaseBusiness,
      },
    ];
  }

  if (userType === "assistant") {
    return [
      ...common,
      {
        label: "Chamber Cases",
        href: "/dashboard/chamber-cases",
        icon: BriefcaseBusiness,
      },
      { label: "My Chamber", href: "/dashboard/my-chamber", icon: Building2 },
    ];
  }

  return [
    ...common,
    { label: "Explore Cases", href: "/cases", icon: FolderSearch },
  ];
}

function DashboardNavigation({
  items,
  pathname,
  onNavigate,
}: {
  items: NavigationItem[];
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <nav aria-label="Dashboard" className="space-y-1">
      {items.map(({ label, href, icon: Icon }) => {
        const isActive =
          href === "/dashboard"
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-foreground/5 text-foreground"
                : "text-muted hover:bg-foreground/5 hover:text-foreground"
            }`}
            onClick={onNavigate}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigation = getNavigation(user.userType);
  const pageTitle = pageTitles[pathname] ?? "Dashboard";

  useEffect(() => {
    if (!isMobileNavOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMobileNavOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMobileNavOpen]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background text-foreground lg:min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-card lg:block">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link
            href="/dashboard"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            CaseDesk
          </Link>
        </div>
        <div className="px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-muted">
            Workspace
          </p>
          <DashboardNavigation
            items={navigation}
            pathname={pathname}
            onNavigate={() => setIsMobileNavOpen(false)}
          />
        </div>
      </aside>

      {isMobileNavOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/40"
            aria-label="Close dashboard navigation"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <aside className="relative z-10 h-full w-72 max-w-[85vw] border-r border-border bg-card shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-border px-5">
              <Link
                href="/dashboard"
                className="text-lg font-semibold tracking-tight text-foreground"
                onClick={() => setIsMobileNavOpen(false)}
              >
                CaseDesk
              </Link>
              <Button
                isIconOnly
                variant="ghost"
                aria-label="Close dashboard navigation"
                onPress={() => setIsMobileNavOpen(false)}
              >
                <X className="size-5" aria-hidden="true" />
              </Button>
            </div>
            <div className="px-4 py-6">
              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-muted">
                Workspace
              </p>
              <DashboardNavigation
                items={navigation}
                pathname={pathname}
                onNavigate={() => setIsMobileNavOpen(false)}
              />
            </div>
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              isIconOnly
              variant="ghost"
              className="lg:hidden"
              aria-label="Open dashboard navigation"
              aria-expanded={isMobileNavOpen}
              onPress={() => setIsMobileNavOpen(true)}
            >
              <Menu className="size-5" aria-hidden="true" />
            </Button>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold text-foreground">
                {pageTitle}
              </h1>
              <p className="hidden text-xs text-muted sm:block">
                {roleLabels[user.userType]} workspace
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted sm:inline">
              {user.name}
            </span>
            <UserDropdown user={user} />
          </div>
        </header>
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
