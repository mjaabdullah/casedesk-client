import { ButtonLink } from "@/app/components/common/ButtonLink";
import { ArrowRight } from "lucide-react";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="mt-24 rounded-4xl border border-slate-200 bg-slate-50 p-8 sm:p-10 lg:p-12"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4A017]">
            Ready to begin
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Bring order to your legal practice.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Start with a polished workflow that supports your team and gives
            clients confidence.
          </p>
        </div>
        <ButtonLink href="#home" variant="primary">
          Schedule a Demo
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </section>
  );
}
