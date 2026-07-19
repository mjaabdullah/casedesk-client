import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "AI Assistant", href: "/ai-assistant" },
] as const;

export function NavigationLinks({
  onNavigate,
  className = "",
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          onClick={onNavigate}
          className={`rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-[#D4A017] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017]/40 focus-visible:ring-offset-2 ${className}`.trim()}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
