import { AppDatePicker } from "../shared/AppDatePicker";
import { AppInput } from "../shared/AppInput";
import { AppSelect } from "../shared/AppSelect";
import { FormSection } from "./FormSection";

export function BasicInformationSection({
  register,
  errors,
}: {
  register: any;
  errors: any;
}) {
  return (
    <FormSection
      title="Basic Information"
      description="Capture the core matter details first."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <AppInput
          label="Case Title"
          name="caseTitle"
          register={register}
          error={errors.caseTitle}
          placeholder="e.g. Civil Suit for Recovery"
          required
        />
        <AppInput
          label="Subject"
          name="subject"
          register={register}
          error={errors.subject}
          placeholder="e.g. Property dispute"
        />
        <AppSelect
          label="Case Type"
          name="caseType"
          register={register}
          error={errors.caseType}
          placeholder="Select a case type"
          required
          options={[
            { label: "দেওয়ানি", value: "দেওয়ানি" },
            { label: "ফৌজদারি", value: "ফৌজদারি" },
            { label: "পারিবারিক", value: "পারিবারিক" },
            { label: "প্রশাসনিক", value: "প্রশাসনিক" },
            { label: "শ্রম", value: "শ্রম" },
          ]}
        />
        <AppSelect
          label="Our Side"
          name="ourSide"
          register={register}
          error={errors.ourSide}
          placeholder="Select side"
          required
          options={[
            { label: "Plaintiff", value: "plaintiff" },
            { label: "Defendant", value: "defendant" },
            { label: "Respondent", value: "respondent" },
          ]}
        />
        <AppSelect
          label="Status"
          name="status"
          register={register}
          error={errors.status}
          placeholder="Select status"
          required
          options={[
            { label: "নতুন", value: "নতুন" },
            { label: "চলমান", value: "চলমান" },
            { label: "নিষ্পত্তি", value: "নিষ্পত্তি" },
            { label: "স্থগিত", value: "স্থগিত" },
          ]}
        />
        <AppDatePicker
          label="Filing Date"
          name="filingDate"
          register={register}
          error={errors.filingDate}
          required
        />
      </div>
    </FormSection>
  );
}
