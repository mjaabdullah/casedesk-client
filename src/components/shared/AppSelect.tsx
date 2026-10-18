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
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <select
        id={name}
        defaultValue=""
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        {...register(name, {
          required: required ? "This field is required." : false,
        })}
        className={`h-12 rounded-xl border border-border bg-card px-4 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 ${error ? "border-danger" : ""}`}
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
      {error ? (
        <p id={`${name}-error`} className="text-sm text-danger">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
