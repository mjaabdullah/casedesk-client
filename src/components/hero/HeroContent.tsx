import { ButtonLink } from "@/components/common/ButtonLink";
import { trustPoints } from "@/content/casedesk";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { HeroDashboardPreview } from "./HeroDashboardPreview";

export function HeroContent() {
  return (
    <section className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-[#8a6110]">
          <Sparkles className="h-4 w-4" />
          Trusted by modern legal teams
        </div>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Manage Every Case
          <br />
          with Confidence.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
          CaseDesk gives law firms, assistants, and clients a refined workspace
          to organize matters, monitor deadlines, and collaborate seamlessly.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#cases" variant="primary">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="#about" variant="secondary">
            Explore Cases
          </ButtonLink>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {trustPoints.map((point) => (
            <span
              key={point}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600"
            >
              <CheckCircle2 className="h-4 w-4 text-[#D4A017]" />
              {point}
            </span>
          ))}
        </div>
      </div>

      <HeroDashboardPreview />
    </section>
  );
}
