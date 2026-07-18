import { Trash2 } from "lucide-react";
import { AppDatePicker } from "../shared/AppDatePicker";
import { AppInput } from "../shared/AppInput";
import { FormSection } from "./FormSection";
import { SectionHeader } from "./SectionHeader";

export function CourtHistorySection({
  courts,
  register,
  errors,
  addCourt,
  removeCourt,
}: {
  courts: Array<{
    id: string;
    courtName: string;
    caseNumber: string;
    judgeName: string;
    transferDate: string;
    currentCourt: boolean;
  }>;
  register: any;
  errors: any;
  addCourt: () => void;
  removeCourt: (id: string) => void;
}) {
  return (
    <FormSection
      title="Court Information"
      description="Record the court history in a lightweight expandable pattern."
    >
      <SectionHeader
        title="Court History"
        description="Add another court entry whenever a matter is transferred."
        actionLabel="Add Another Court"
        onAction={addCourt}
      />
      <div className="space-y-4">
        {courts.map((court, index) => (
          <div
            key={court.id}
            className="rounded-2xl border border-[#E5E7EB] bg-[#F8F9FB] p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-800">
                Court {index + 1}
              </div>
              <button
                type="button"
                onClick={() => removeCourt(court.id)}
                disabled={courts.length === 1}
                className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <AppInput
                label="Court Name"
                name={`courts.${index}.courtName`}
                register={register}
                error={errors?.courts?.[index]?.courtName}
                placeholder="Enter court name"
                required
              />
              <AppInput
                label="Case Number"
                name={`courts.${index}.caseNumber`}
                register={register}
                error={errors?.courts?.[index]?.caseNumber}
                placeholder="Case number"
                required
              />
              <AppInput
                label="Judge Name"
                name={`courts.${index}.judgeName`}
                register={register}
                error={errors?.courts?.[index]?.judgeName}
                placeholder="Judge name"
              />
              <AppDatePicker
                label="Transfer Date"
                name={`courts.${index}.transferDate`}
                register={register}
                error={errors?.courts?.[index]?.transferDate}
              />
            </div>
            <div className="mt-4 rounded-2xl border border-[#E5E7EB] bg-white p-3">
              <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#E5E7EB] text-[#D4A017] focus:ring-[#D4A017]"
                  {...register(`courts.${index}.currentCourt`)}
                />
                Current court
              </label>
            </div>
          </div>
        ))}
      </div>
    </FormSection>
  );
}
