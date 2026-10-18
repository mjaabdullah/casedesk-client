import type { FormValues } from "./CaseForm";

type CaseSummaryProps = {
  values: FormValues;
  onEditSection?: (step: number) => void;
};

function displayValue(value?: string | boolean) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return value?.trim() || "Not provided";
}

function formatDate(value?: string) {
  if (!value) return "Not provided";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
    date,
  );
}

function SummarySection({
  title,
  step,
  onEditSection,
  children,
}: {
  title: string;
  step: number;
  onEditSection?: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {onEditSection ? (
          <button
            type="button"
            onClick={() => onEditSection(step)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-accent hover:bg-accent/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Edit section
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function SummaryField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm text-foreground">{value}</dd>
    </div>
  );
}

export function CaseSummary({ values, onEditSection }: CaseSummaryProps) {
  return (
    <div className="space-y-4">
      <SummarySection
        title="Basic Case Information"
        step={0}
        onEditSection={onEditSection}
      >
        <dl className="grid gap-4 sm:grid-cols-2">
          <SummaryField label="Case Title" value={displayValue(values.caseTitle)} />
          <SummaryField label="Subject" value={displayValue(values.subject)} />
          <SummaryField label="Case Type" value={displayValue(values.caseType)} />
          <SummaryField label="Our Side" value={displayValue(values.ourSide)} />
          <SummaryField label="Status" value={displayValue(values.status)} />
          <SummaryField
            label="Filing Date"
            value={formatDate(values.filingDate)}
          />
        </dl>
      </SummarySection>

      <SummarySection title="Plaintiffs" step={1} onEditSection={onEditSection}>
        <div className="space-y-4">
          {values.plaintiffs.length ? (
            values.plaintiffs.map((party, index) => (
              <dl
                key={party.id}
                className="grid gap-4 border-t border-border pt-4 first:border-0 first:pt-0 sm:grid-cols-2"
              >
                <SummaryField
                  label={`Plaintiff ${index + 1} Number`}
                  value={displayValue(party.number)}
                />
                <SummaryField label="Name" value={displayValue(party.name)} />
                <SummaryField
                  label="Relation Type"
                  value={displayValue(party.relationshipType)}
                />
                <SummaryField
                  label={
                    party.relationshipType === "Husband"
                      ? "Husband's Name"
                      : "Father's Name"
                  }
                  value={displayValue(party.relationshipName)}
                />
                <SummaryField label="Phone Number" value={displayValue(party.phone)} />
                <SummaryField label="Address" value={displayValue(party.address)} />
              </dl>
            ))
          ) : (
            <p className="text-sm text-muted">No plaintiffs provided.</p>
          )}
        </div>
      </SummarySection>

      <SummarySection title="Defendants" step={1} onEditSection={onEditSection}>
        <div className="space-y-4">
          {values.defendants.length ? (
            values.defendants.map((party, index) => (
              <dl
                key={party.id}
                className="grid gap-4 border-t border-border pt-4 first:border-0 first:pt-0 sm:grid-cols-2"
              >
                <SummaryField
                  label={`Defendant ${index + 1} Number`}
                  value={displayValue(party.number)}
                />
                <SummaryField label="Name" value={displayValue(party.name)} />
                <SummaryField
                  label="Relation Type"
                  value={displayValue(party.relationshipType)}
                />
                <SummaryField
                  label={
                    party.relationshipType === "Husband"
                      ? "Husband's Name"
                      : "Father's Name"
                  }
                  value={displayValue(party.relationshipName)}
                />
                <SummaryField label="Phone Number" value={displayValue(party.phone)} />
                <SummaryField label="Address" value={displayValue(party.address)} />
              </dl>
            ))
          ) : (
            <p className="text-sm text-muted">No defendants provided.</p>
          )}
        </div>
      </SummarySection>

      <SummarySection
        title="Court History"
        step={2}
        onEditSection={onEditSection}
      >
        <div className="space-y-4">
          {values.courtHistory.length ? (
            values.courtHistory.map((court, index) => (
              <dl
                key={court.id}
                className="grid gap-4 border-t border-border pt-4 first:border-0 first:pt-0 sm:grid-cols-2"
              >
                <SummaryField
                  label={`Court ${index + 1}`}
                  value={displayValue(court.courtName)}
                />
                <SummaryField
                  label="Case Number"
                  value={displayValue(court.caseNumber)}
                />
                <SummaryField
                  label="Judge Name"
                  value={displayValue(court.judgeName)}
                />
                <SummaryField
                  label="Transfer Date"
                  value={formatDate(court.transferDate)}
                />
                <SummaryField label="Current Court" value={displayValue(court.isCurrent)} />
              </dl>
            ))
          ) : (
            <p className="text-sm text-muted">No court history provided.</p>
          )}
        </div>
      </SummarySection>

      <SummarySection
        title="Acts and Sections"
        step={3}
        onEditSection={onEditSection}
      >
        <div className="space-y-4">
          {values.legalSections.length ? (
            values.legalSections.map((section, index) => (
              <dl
                key={section.id}
                className="grid gap-4 border-t border-border pt-4 first:border-0 first:pt-0 sm:grid-cols-2"
              >
                <SummaryField
                  label={`Act ${index + 1}`}
                  value={displayValue(section.actName)}
                />
                <SummaryField
                  label="Section Numbers"
                  value={displayValue(section.sectionNumbers)}
                />
              </dl>
            ))
          ) : (
            <p className="text-sm text-muted">No legal sections provided.</p>
          )}
        </div>
      </SummarySection>

      <SummarySection
        title="Related Cases"
        step={3}
        onEditSection={onEditSection}
      >
        <div className="space-y-4">
          {values.relatedCases.length ? (
            values.relatedCases.map((relatedCase, index) => (
              <dl
                key={relatedCase.id}
                className="grid gap-4 border-t border-border pt-4 first:border-0 first:pt-0 sm:grid-cols-2"
              >
                <SummaryField
                  label={`Related Case ${index + 1} Relation`}
                  value={displayValue(relatedCase.relationType)}
                />
                <SummaryField
                  label="Related Case Number"
                  value={displayValue(relatedCase.relatedCaseNumber)}
                />
                <SummaryField
                  label="Court Name"
                  value={displayValue(relatedCase.courtName)}
                />
                <SummaryField label="Notes" value={displayValue(relatedCase.notes)} />
              </dl>
            ))
          ) : (
            <p className="text-sm text-muted">No related cases provided.</p>
          )}
        </div>
      </SummarySection>
    </div>
  );
}
