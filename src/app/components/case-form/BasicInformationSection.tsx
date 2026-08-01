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
            { label: "Civil", value: "civil" },
            { label: "Criminal", value: "criminal" },
            { label: "Family", value: "family" },
            { label: "Corporate", value: "corporate" },
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
            { label: "New", value: "new" },
            { label: "In Progress", value: "in-progress" },
            { label: "Pending", value: "pending" },
            { label: "Resolved", value: "resolved" },
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
