import type { FieldError, UseFormRegister } from "react-hook-form";

type AppDatePickerProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  className?: string;
};

export function AppDatePicker({
  label,
  name,
  register,
  error,
  required = false,
  className = "",
}: AppDatePickerProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={name}
        type="date"
        required={required}
        {...register(name, {
          required: required ? "This field is required." : false,
        })}
        className={`h-12 rounded-xl border bg-white px-4 text-sm text-slate-700 outline-none transition focus:ring-2 focus:ring-[#D4A017]/20 ${error ? "border-red-400" : "border-[#E5E7EB] focus:border-[#D4A017]"}`}
      />
      {error ? <p className="text-sm text-red-600">{error.message}</p> : null}
    </div>
  );
}
