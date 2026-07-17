import { BookOpen, CalendarDays, ShieldCheck } from "lucide-react";

export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: "shield" | "calendar" | "book";
  title: string;
  description: string;
}) {
  const Icon = {
    shield: ShieldCheck,
    calendar: CalendarDays,
    book: BookOpen,
  }[icon];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.45)]">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D4A017]/10 text-[#D4A017]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
