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
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        required={required}
        rows={4}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        {...register(name, {
          required: required ? "This field is required." : false,
        })}
        className={`rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 ${error ? "border-danger" : ""}`}
      />
      {description ? (
        <p className="text-xs text-muted">{description}</p>
      ) : null}
      {error ? (
        <p id={`${name}-error`} className="text-sm text-danger">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
