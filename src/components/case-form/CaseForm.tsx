"use client";

import { addCase } from "@/lib/api/addCase";
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type Path, type SubmitHandler } from "react-hook-form";
import { BasicInformationSection } from "./BasicInformationSection";
import { CaseSummary } from "./CaseSummary";
import { CourtHistorySection } from "./CourtHistorySection";
import { LegalSectionsSection } from "./LegalSectionsSection";
import { PartiesSection } from "./PartiesSection";
import { RelatedCasesSection } from "./RelatedCasesSection";

type Party = {
  id: string;
  number: string;
  name: string;
  relationshipType: "Father" | "Husband";
  relationshipName: string;
  address: string;
  phone: string;
};

type Court = {
  id: string;
  courtName: string;
  caseNumber: string;
  judgeName: string;
  transferDate: string;
  isCurrent: boolean;
};

type LegalSection = {
  id: string;
  actName: string;
  sectionNumbers: string;
};

type RelatedCase = {
  id: string;
  relationType: string;
  relatedCaseNumber: string;
  courtName: string;
  notes: string;
};

export type FormValues = {
  caseTitle: string;
  subject: string;
  caseType: string;
  ourSide: string;
  status: string;
  filingDate: string;
  plaintiffs: Party[];
  defendants: Party[];
  courtHistory: Court[];
  legalSections: LegalSection[];
  relatedCases: RelatedCase[];
};

type CaseFormProps = {
  mode: "add" | "edit";
  initialValues?: Partial<FormValues>;
};

const steps = [
  { title: "Case details", description: "Core information and status" },
  { title: "Parties", description: "Plaintiffs and defendants" },
  { title: "Court history", description: "Court and case numbers" },
  {
    title: "Other information",
    description: "Legal sections and related cases",
  },
  { title: "Review", description: "Confirm all case information" },
];

const stepOfField: Record<string, number> = {
  caseTitle: 0,
  subject: 0,
  caseType: 0,
  ourSide: 0,
  status: 0,
  filingDate: 0,
  plaintiffs: 1,
  defendants: 1,
  courtHistory: 2,
  legalSections: 3,
  relatedCases: 3,
};

const initialParty = (
  role: "plaintiff" | "defendant",
  number: string,
): Party => ({
  id: `${role}-${Math.random().toString(36).slice(2, 8)}`,
  number,
  name: "",
  relationshipType: "Father",
  relationshipName: "",
  address: "",
  phone: "",
});

const initialCourt = (): Court => ({
  id: `court-${Math.random().toString(36).slice(2, 8)}`,
  courtName: "",
  caseNumber: "",
  judgeName: "",
  transferDate: "",
  isCurrent: false,
});

const initialLegalSection = (): LegalSection => ({
  id: `legal-${Math.random().toString(36).slice(2, 8)}`,
  actName: "",
  sectionNumbers: "",
});

const initialRelatedCase = (): RelatedCase => ({
  id: `related-${Math.random().toString(36).slice(2, 8)}`,
  relationType: "",
  relatedCaseNumber: "",
  courtName: "",
  notes: "",
});

const defaultValues: FormValues = {
  caseTitle: "",
  subject: "",
  caseType: "",
  ourSide: "",
  status: "",
  filingDate: "",
  plaintiffs: [initialParty("plaintiff", "1")],
  defendants: [initialParty("defendant", "1")],
  courtHistory: [initialCourt()],
  legalSections: [],
  relatedCases: [],
};

export function CaseForm({ mode, initialValues }: CaseFormProps) {
  const [showRelatedCases, setShowRelatedCases] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useForm<FormValues>({
    defaultValues: {
      ...defaultValues,
      ...initialValues,
      plaintiffs: initialValues?.plaintiffs?.length
        ? initialValues.plaintiffs
        : defaultValues.plaintiffs,
      defendants: initialValues?.defendants?.length
        ? initialValues.defendants
        : defaultValues.defendants,
      courtHistory: initialValues?.courtHistory?.length
        ? initialValues.courtHistory
        : defaultValues.courtHistory,
      legalSections: initialValues?.legalSections?.length
        ? initialValues.legalSections
        : [],
      relatedCases: initialValues?.relatedCases?.length
        ? initialValues.relatedCases
        : [],
    },
    shouldUnregister: false,
  });

  const watchedValues = watch();
  const plaintiffs = watchedValues.plaintiffs ?? [];
  const defendants = watchedValues.defendants ?? [];
  const courtHistory = watchedValues.courtHistory ?? [];
  const legalSections = watchedValues.legalSections ?? [];
  const relatedCases = watchedValues.relatedCases ?? [];

  useEffect(() => {
    if (initialValues?.relatedCases?.length) {
      setShowRelatedCases(true);
    }
  }, [initialValues]);

  const nextPartyNumber = (role: "plaintiff" | "defendant") => {
    const list = role === "plaintiff" ? plaintiffs : defendants;
    const numbers = list
      .map((item) => Number(item.number))
      .filter((value) => !Number.isNaN(value));
    const max = numbers.length ? Math.max(...numbers) : 0;
    return String(max + 1);
  };

  const addParty = (role: "plaintiff" | "defendant") => {
    const nextNumber = nextPartyNumber(role);
    const item = initialParty(role, nextNumber);
    if (role === "plaintiff") {
      setValue("plaintiffs", [...(plaintiffs ?? []), item]);
    } else {
      setValue("defendants", [...(defendants ?? []), item]);
    }
  };

  const removeParty = (role: "plaintiff" | "defendant", id: string) => {
    if (role === "plaintiff" && plaintiffs.length === 1) return;
    if (role === "defendant" && defendants.length === 1) return;

    const current = role === "plaintiff" ? plaintiffs : defendants;
    const updated = current.filter((item) => item.id !== id);
    if (role === "plaintiff") {
      setValue("plaintiffs", updated);
    } else {
      setValue("defendants", updated);
    }
  };

  const addCourt = () => {
    setValue("courtHistory", [...courtHistory, initialCourt()]);
  };

  const removeCourt = (id: string) => {
    if (courtHistory.length === 1) return;
    setValue(
      "courtHistory",
      courtHistory.filter((court) => court.id !== id),
    );
  };

  const addLegalSection = () => {
    setValue("legalSections", [...legalSections, initialLegalSection()]);
  };

  const removeLegalSection = (id: string) => {
    setValue(
      "legalSections",
      legalSections.filter((item) => item.id !== id),
    );
  };

  const addRelatedCase = () => {
    setValue("relatedCases", [...relatedCases, initialRelatedCase()]);
    setShowRelatedCases(true);
  };

  const removeRelatedCase = (id: string) => {
    setValue(
      "relatedCases",
      relatedCases.filter((item) => item.id !== id),
    );
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSubmitMessage("");
    setSubmitError(false);
    try {
      await addCase(data);
      setIsSubmitted(true);
      setSubmitMessage(
        mode === "add"
          ? "The case was submitted successfully."
          : "The case changes were submitted successfully.",
      );
    } catch (error) {
      setSubmitError(true);
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "The case could not be submitted. Please try again.",
      );
    }
  };

  const goToNextStep = async () => {
    if (isNavigating) return;
    setIsNavigating(true);
    try {
      const fields: Path<FormValues>[] = [];
      if (currentStep === 0) {
        fields.push("caseTitle", "caseType", "ourSide", "status", "filingDate");
      } else if (currentStep === 1) {
        plaintiffs.forEach((_, index) => {
          fields.push(`plaintiffs.${index}.number`, `plaintiffs.${index}.name`);
        });
        defendants.forEach((_, index) => {
          fields.push(`defendants.${index}.number`, `defendants.${index}.name`);
        });
      } else if (currentStep === 2) {
        courtHistory.forEach((_, index) => {
          fields.push(
            `courtHistory.${index}.courtName`,
            `courtHistory.${index}.caseNumber`,
          );
        });
      } else if (currentStep === 3) {
        legalSections.forEach((_, index) => {
          fields.push(`legalSections.${index}.actName`);
        });
      }
      if (!(await trigger(fields, { shouldFocus: true }))) return;
      setSubmitMessage("");
      setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
    } finally {
      setIsNavigating(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentStep !== steps.length - 1) {
      void goToNextStep();
    }
  };

  const handleFinalSubmit = handleSubmit(
    async (data) => {
      await onSubmit(data);
    },
    (errs) => {
      const errorSteps = Object.keys(errs)
        .map((key) => stepOfField[key])
        .filter((n): n is number => n !== undefined);
      if (errorSteps.length) setCurrentStep(Math.min(...errorSteps));
    },
  );

  return (
    <form
      onSubmit={handleFormSubmit}
      noValidate
      className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              {mode === "add" ? "Create New Matter" : "Update Matter"}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">
              {mode === "add" ? "Create Case" : "Edit Case"}
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted">
            <ShieldCheck className="h-4 w-4 text-accent" />
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
        <p className="max-w-2xl text-sm text-muted">
          Complete the case information in manageable steps. Your entries are
          retained as you move through the form.
        </p>
      </div>

      <nav
        aria-label="Case form progress"
        className="rounded-2xl border border-border bg-card p-5"
      >
        <ol className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {steps.map((step, index) => {
            const isCurrent = index === currentStep;
            const isComplete = index < currentStep;
            return (
              <li
                key={step.title}
                aria-current={isCurrent ? "step" : undefined}
                className="flex items-start gap-3"
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                    isCurrent
                      ? "border-accent bg-accent text-accent-foreground"
                      : isComplete
                        ? "border-success bg-success text-success-foreground"
                        : "border-border bg-background text-muted"
                  }`}
                >
                  {isComplete ? (
                    <Check aria-hidden="true" className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block text-sm font-medium ${isCurrent ? "text-foreground" : "text-muted"}`}
                  >
                    {step.title}
                  </span>
                  <span className="hidden text-xs text-muted sm:block">
                    {step.description}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
        <div
          className="mt-5 h-1.5 overflow-hidden rounded-full bg-background"
          role="progressbar"
          aria-label="Form completion"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={currentStep + 1}
        >
          <div
            className="h-full rounded-full bg-accent transition-[width]"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </nav>

      <p className="sr-only" aria-live="polite">
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
      </p>
      <div>
        {currentStep === 0 ? (
          <BasicInformationSection register={register} errors={errors} />
        ) : null}
        {currentStep === 1 ? (
          <PartiesSection
            plaintiffs={plaintiffs}
            defendants={defendants}
            register={register}
            errors={errors}
            addParty={addParty}
            removeParty={removeParty}
            nextPartyNumber={nextPartyNumber}
            setValue={setValue}
          />
        ) : null}
        {currentStep === 2 ? (
          <CourtHistorySection
            courtHistory={courtHistory}
            register={register}
            errors={errors}
            addCourt={addCourt}
            removeCourt={removeCourt}
          />
        ) : null}
        {currentStep === 3 ? (
          <div className="space-y-6">
            <LegalSectionsSection
              legalSections={legalSections}
              register={register}
              errors={errors}
              addLegalSection={addLegalSection}
              removeLegalSection={removeLegalSection}
            />
            <RelatedCasesSection
              relatedCases={relatedCases}
              register={register}
              errors={errors}
              showRelatedCases={showRelatedCases}
              setShowRelatedCases={setShowRelatedCases}
              addRelatedCase={addRelatedCase}
              removeRelatedCase={removeRelatedCase}
            />
          </div>
        ) : null}
        {currentStep === 4 ? (
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Review case information
              </h2>
              <p className="mt-1 text-sm text-muted">
                Check all entered details below. Use “Edit section” to make
                changes before submitting.
              </p>
            </div>
            <CaseSummary
              values={watchedValues}
              onEditSection={setCurrentStep}
            />
          </section>
        ) : null}
      </div>

      {submitMessage ? (
        <p
          role={submitError ? "alert" : "status"}
          className={`rounded-xl border border-border bg-card p-4 text-sm ${
            submitError ? "text-danger" : "text-success"
          }`}
        >
          {submitMessage}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep((step) => Math.max(0, step - 1))}
          disabled={currentStep === 0 || isSubmitting}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Previous
        </button>
        {currentStep < steps.length - 1 ? (
          <button
            key="next-btn"
            type="button"
            onClick={() => void goToNextStep()}
            disabled={isNavigating}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-60"
          >
            Next
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </button>
        ) : (
          <button
            key="submit-btn"
            type="button"
            onClick={() => void handleFinalSubmit()}
            disabled={isSubmitting || (mode === "add" && isSubmitted)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-60"
          >
            {isSubmitting
              ? "Submitting..."
              : mode === "add"
                ? "Create Case"
                : "Save Changes"}
            {!isSubmitting ? (
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            ) : null}
          </button>
        )}
      </div>
    </form>
  );
}