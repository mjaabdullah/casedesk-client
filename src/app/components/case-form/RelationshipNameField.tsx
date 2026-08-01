import type { FieldError, UseFormRegister } from "react-hook-form";

type RelationshipNameFieldProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  relationshipTypeName: string;
  relationshipTypeValue?: string;
  onRelationshipTypeChange: (value: "Father" | "Husband") => void;
  className?: string;
};

const relationshipConfig = {
  Father: {
    label: "Father's Name",
    placeholder: "Enter father's name",
  },
  Husband: {
    label: "Husband's Name",
    placeholder: "Enter husband's name",
  },
} as const;

export function RelationshipNameField({
  name,
  register,
  error,
  relationshipTypeName,
  relationshipTypeValue,
  onRelationshipTypeChange,
  className = "",
}: RelationshipNameFieldProps) {
  const selectedType =
    relationshipTypeValue === "Husband" ? "Husband" : "Father";
  const config = relationshipConfig[selectedType];

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex flex-col gap-3 rounded-2xl border border-[#E5E7EB] bg-[#F8F9FB] p-3 md:flex-row md:items-end">
        <div className="min-w-[170px]">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Relation Type
          </label>
          <select
            value={selectedType}
            onChange={(event) => {
              const nextValue =
                event.target.value === "Husband" ? "Husband" : "Father";
              onRelationshipTypeChange(nextValue);
            }}
            className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017]/20"
            aria-label="Relationship type"
          >
            <option value="Father">Father</option>
            <option value="Husband">Husband</option>
          </select>
        </div>

        <div className="flex-1">
          <label
            htmlFor={name}
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            {config.label}
          </label>
          <input
            aria-label={config.label}
            placeholder={config.placeholder}
            className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017]/20"
            {...register(name)}
          />
          <input
            type="hidden"
            {...register(relationshipTypeName)}
            value={selectedType}
          />
        </div>
      </div>
      {error ? <p className="text-sm text-red-600">{error.message}</p> : null}
    </div>
  );
}
