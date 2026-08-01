import type { FieldError, UseFormRegister } from "react-hook-form";

type AppTextareaProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
  description?: string;
  required?: boolean;
  className?: string;
};

export function AppTextarea({
  label,
  name,
  register,
  error,
  placeholder,
  description,
  required = false,
  className = "",
}: AppTextareaProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        required={required}
        rows={4}
        {...register(name, {
          required: required ? "This field is required." : false,
        })}
        className={`rounded-xl border bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:ring-2 focus:ring-[#D4A017]/20 ${error ? "border-red-400" : "border-[#E5E7EB] focus:border-[#D4A017]"}`}
      />
      {description ? (
        <p className="text-xs text-slate-500">{description}</p>
      ) : null}
      {error ? <p className="text-sm text-red-600">{error.message}</p> : null}
    </div>
  );
}
