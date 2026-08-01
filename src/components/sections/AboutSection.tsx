import { highlights } from "@/content/casedesk";
import { CheckCircle2, Gavel } from "lucide-react";

export function AboutSection() {
  return (
    <section
      id="about"
      className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]"
    >
      <div className="rounded-[28px] border border-slate-200 bg-[#23272F] p-8 text-white sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4A017]">
          Operational clarity
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          A calm, dependable system for high-stakes work.
        </h2>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          CaseDesk brings structure to complex legal matters without sacrificing
          elegance, speed, or trust.
        </p>
        <div className="mt-8 flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/5 p-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D4A017]/10 text-[#D4A017]">
            <Gavel className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold">Secure case management</p>
            <p className="text-sm text-slate-400">
              Built for law firms, assistants, and client-facing collaboration.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_20px_45px_-32px_rgba(15,23,42,0.2)] sm:p-10">
        <h3 className="text-2xl font-semibold text-slate-900">
          Everything your team needs, in one place
        </h3>
        <div className="mt-6 space-y-4">
          {highlights.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4"
            >
              <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#D4A017]/10 text-[#D4A017]">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <p className="text-sm leading-7 text-slate-600">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
