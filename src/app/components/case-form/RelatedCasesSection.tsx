import { Trash2 } from "lucide-react";
import { AppInput } from "../shared/AppInput";
import { AppSelect } from "../shared/AppSelect";
import { AppTextarea } from "../shared/AppTextarea";
import { FormSection } from "./FormSection";
import { SectionHeader } from "./SectionHeader";

export function RelatedCasesSection({
  relatedCases,
  register,
  errors,
  showRelatedCases,
  setShowRelatedCases,
  addRelatedCase,
  removeRelatedCase,
}: {
  relatedCases: Array<{
    id: string;
    relationType: string;
    relatedCaseNumber: string;
    courtName: string;
    notes: string;
  }>;
  register: any;
  errors: any;
  showRelatedCases: boolean;
  setShowRelatedCases: (value: boolean) => void;
  addRelatedCase: () => void;
  removeRelatedCase: (id: string) => void;
}) {
  return (
    <FormSection
      title="Related Cases"
      description="Link related appeals or references only when relevant."
    >
      {!showRelatedCases ? (
        <div className="rounded-2xl border border-dashed border-[#E5E7EB] bg-[#F8F9FB] p-6 text-center">
          <p className="text-sm text-slate-600">
            No related cases have been added yet.
          </p>
          <button
            type="button"
            onClick={() => setShowRelatedCases(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#D4A017] hover:text-[#D4A017]"
          >
            Add Related Case
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <SectionHeader
            title="Related Matters"
            description="Keep this section optional and expandable."
            actionLabel="Add Related Case"
            onAction={addRelatedCase}
          />
          {relatedCases.map((relation, index) => (
            <div
              key={relation.id}
              className="rounded-2xl border border-[#E5E7EB] bg-[#F8F9FB] p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-800">
                  Related Case {index + 1}
                </div>
                <button
                  type="button"
                  onClick={() => removeRelatedCase(relation.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-300 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <AppSelect
                  label="Relation Type"
                  name={`relatedCases.${index}.relationType`}
                  register={register}
                  error={errors?.relatedCases?.[index]?.relationType}
                  placeholder="Select relation"
                  options={[
                    { label: "Appeal", value: "appeal" },
                    { label: "Revision", value: "revision" },
                    { label: "Execution", value: "execution" },
                    { label: "Review", value: "review" },
                    { label: "Reference", value: "reference" },
                    { label: "Other", value: "other" },
                  ]}
                />
                <AppInput
                  label="Related Case Number"
                  name={`relatedCases.${index}.relatedCaseNumber`}
                  register={register}
                  error={errors?.relatedCases?.[index]?.relatedCaseNumber}
                  placeholder="Case number"
                />
                <AppInput
                  label="Court Name"
                  name={`relatedCases.${index}.courtName`}
                  register={register}
                  error={errors?.relatedCases?.[index]?.courtName}
                  placeholder="Court name"
                />
                <AppTextarea
                  className="md:col-span-2"
                  label="Notes"
                  name={`relatedCases.${index}.notes`}
                  register={register}
                  error={errors?.relatedCases?.[index]?.notes}
                  placeholder="Brief notes"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </FormSection>
  );
}
