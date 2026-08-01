import { SectionTitle } from "@/app/components/common/SectionTitle";
import { featureCards } from "@/app/content/casedesk";
import { FeatureCard } from "../common/FeatureCard";

export function FeatureSection() {
  return (
    <section
      id="cases"
      className="mt-24 rounded-4xl border border-slate-200 bg-white p-8 shadow-[0_20px_45px_-32px_rgba(15,23,42,0.28)] sm:p-10 lg:p-12"
    >
      <SectionTitle
        eyebrow="Why CaseDesk"
        title="Purpose-built for modern legal operations"
        description="From intake to final resolution, every workflow is designed to reduce friction and keep your team aligned."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {featureCards.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
