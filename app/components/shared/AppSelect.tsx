import type { FieldError, UseFormRegister } from "react-hook-form";

type AppSelectProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export function AppSelect({
  label,
  name,
  register,
  error,
  options,
  placeholder,
  required = false,
  className = "",
}: AppSelectProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        id={name}
        defaultValue=""
        required={required}
        {...register(name, {
          required: required ? "This field is required." : false,
        })}
        className={`h-12 rounded-xl border bg-white px-4 text-sm text-slate-700 outline-none transition focus:ring-2 focus:ring-[#D4A017]/20 ${error ? "border-red-400" : "border-[#E5E7EB] focus:border-[#D4A017]"}`}
      >
        <option value="" disabled>
          {placeholder ?? "Select an option"}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="text-sm text-red-600">{error.message}</p> : null}
    </div>
  );
}
