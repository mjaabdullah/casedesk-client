"use client";

import { Chip } from "@heroui/react";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { AppButton } from "../shared/AppButton";
import { BasicInformationSection } from "./BasicInformationSection";
import { CourtHistorySection } from "./CourtHistorySection";
import { FormSection } from "./FormSection";
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
  currentCourt: boolean;
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

type FormValues = {
  caseTitle: string;
  subject: string;
  caseType: string;
  ourSide: string;
  status: string;
  filingDate: string;
  plaintiffs: Party[];
  defendants: Party[];
  courts: Court[];
  legalSections: LegalSection[];
  relatedCases: RelatedCase[];
};

type CaseFormProps = {
  mode: "add" | "edit";
  initialValues?: Partial<FormValues>;
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
  currentCourt: false,
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
  courts: [initialCourt()],
  legalSections: [],
  relatedCases: [],
};

export function CaseForm({ mode, initialValues }: CaseFormProps) {
  const [showRelatedCases, setShowRelatedCases] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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
      courts: initialValues?.courts?.length
        ? initialValues.courts
        : defaultValues.courts,
      legalSections: initialValues?.legalSections?.length
        ? initialValues.legalSections
        : [],
      relatedCases: initialValues?.relatedCases?.length
        ? initialValues.relatedCases
        : [],
    },
  });

  const watchedValues = watch();
  const plaintiffs = watchedValues.plaintiffs ?? [];
  const defendants = watchedValues.defendants ?? [];
  const courts = watchedValues.courts ?? [];
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
    setValue("courts", [...courts, initialCourt()]);
  };

  const removeCourt = (id: string) => {
    if (courts.length === 1) return;
    setValue(
      "courts",
      courts.filter((court) => court.id !== id),
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setSubmitAttempted(true);
    console.log(data);
  };

  const reviewSummary = useMemo(() => {
    const plaintiffCount = plaintiffs.length;
    const defendantCount = defendants.length;
    const courtCount = courts.length;
    const legalCount = legalSections.length;
    const relatedCount = relatedCases.length;

    return [
      `${plaintiffCount} plaintiff${plaintiffCount === 1 ? "" : "s"}`,
      `${defendantCount} defendant${defendantCount === 1 ? "" : "s"}`,
      `${courtCount} court${courtCount === 1 ? "" : "s"}`,
      `${legalCount} legal section${legalCount === 1 ? "" : "s"}`,
      `${relatedCount} related case${relatedCount === 1 ? "" : "s"}`,
    ];
  }, [
    plaintiffs.length,
    defendants.length,
    courts.length,
    legalSections.length,
    relatedCases.length,
  ]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col gap-3 rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#D4A017]">
              {mode === "add" ? "Create New Matter" : "Update Matter"}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              {mode === "add" ? "Create Case" : "Edit Case"}
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F8F9FB] px-4 py-2 text-sm text-slate-600">
            <ShieldCheck className="h-4 w-4 text-[#D4A017]" />
            Secure draft workflow
          </div>
        </div>
        <p className="max-w-2xl text-sm text-slate-600">
          Capture the essentials in a structured flow without overwhelming the
          user.
        </p>
      </div>

      <BasicInformationSection register={register} errors={errors} />

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

      <CourtHistorySection
        courts={courts}
        register={register}
        errors={errors}
        addCourt={addCourt}
        removeCourt={removeCourt}
      />

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

      <FormSection
        title="Review"
        description="Confirm the information before submission."
      >
        <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8F9FB] p-5">
          <div className="flex flex-wrap gap-2">
            {reviewSummary.map((item) => (
              <Chip key={item} size="sm" className="bg-white text-slate-700">
                {item}
              </Chip>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-dashed border-[#E5E7EB] bg-white p-4 text-sm text-slate-600">
            <div className="flex items-center gap-2 font-medium text-slate-800">
              <FileText className="h-4 w-4 text-[#D4A017]" />
              {mode === "edit"
                ? "Draft review for saved matter"
                : "Draft review for new matter"}
            </div>
            <p className="mt-2">
              No backend submission has been implemented. Submitting will only
              log the form data in the browser console.
            </p>
          </div>
        </div>
      </FormSection>

      <div className="flex flex-col gap-3 rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Ready to save?
          </h2>
          <p className="text-sm text-slate-600">
            The form is intentionally client-side and lightweight.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <AppButton type="button" variant="ghost" className="w-auto">
            Cancel
          </AppButton>
          <AppButton type="submit" variant="primary" className="w-auto">
            <span className="flex items-center gap-2">
              {mode === "add" ? "Create Case" : "Save Changes"}
              <ArrowRight className="h-4 w-4" />
            </span>
          </AppButton>
        </div>
      </div>
    </form>
  );
}
