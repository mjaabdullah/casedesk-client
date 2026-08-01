import { Trash2 } from "lucide-react";
import { AppInput } from "../shared/AppInput";
import { FormSection } from "./FormSection";
import { SectionHeader } from "./SectionHeader";

export function LegalSectionsSection({
  legalSections,
  register,
  errors,
  addLegalSection,
  removeLegalSection,
}: {
  legalSections: Array<{ id: string; actName: string; sectionNumbers: string }>;
  register: any;
  errors: any;
  addLegalSection: () => void;
  removeLegalSection: (id: string) => void;
}) {
  return (
    <FormSection
      title="Legal Sections"
      description="Add any statutory references as needed."
    >
      <SectionHeader
        title="Legal References"
        description="Keep this list optional and lightweight."
        actionLabel="Add Legal Section"
        onAction={addLegalSection}
      />
      {legalSections.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#E5E7EB] bg-[#F8F9FB] p-6 text-sm text-slate-600">
          No legal sections added yet. Use the button above to add one.
        </div>
      ) : (
        <div className="space-y-4">
          {legalSections.map((section, index) => (
            <div
              key={section.id}
              className="rounded-2xl border border-[#E5E7EB] bg-[#F8F9FB] p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-800">
                  Section {index + 1}
                </div>
                <button
                  type="button"
                  onClick={() => removeLegalSection(section.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-300 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <AppInput
                  label="Act Name"
                  name={`legalSections.${index}.actName`}
                  register={register}
                  error={errors?.legalSections?.[index]?.actName}
                  placeholder="e.g. Civil Procedure Code"
                  required
                />
                <AppInput
                  label="Section Numbers"
                  name={`legalSections.${index}.sectionNumbers`}
                  register={register}
                  error={errors?.legalSections?.[index]?.sectionNumbers}
                  placeholder="e.g. 12, 15, 18"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </FormSection>
  );
}
