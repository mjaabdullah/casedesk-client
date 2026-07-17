import Link from "next/link";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const variantClasses = {
    primary:
      "rounded-full bg-[#23272F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d2229]",
    secondary:
      "rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#D4A017] hover:text-[#D4A017]",
    ghost:
      "rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#D4A017] hover:text-[#D4A017]",
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
