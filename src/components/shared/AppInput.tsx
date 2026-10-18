import type { FieldError, UseFormRegister } from "react-hook-form";

type AppInputProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  autoComplete?: string;
  description?: string;
  required?: boolean;
  className?: string;
};

export function AppInput({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  autoComplete,
  description,
  required = false,
  className = "",
}: AppInputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        {...register(name, {
          required: required ? "This field is required." : false,
        })}
        className={`h-12 rounded-xl border border-border bg-card px-4 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 ${error ? "border-danger" : ""}`}
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
