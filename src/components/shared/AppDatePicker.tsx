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
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        type="date"
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        {...register(name, {
          required: required ? "This field is required." : false,
        })}
        className={`h-12 rounded-xl border border-border bg-card px-4 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 ${error ? "border-danger" : ""}`}
      />
      {error ? (
        <p id={`${name}-error`} className="text-sm text-danger">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
