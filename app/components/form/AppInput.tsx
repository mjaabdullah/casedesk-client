import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type AppInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  autoComplete?: string;
  description?: string;
};

export function AppInput<T extends FieldValues>({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  autoComplete,
  description,
}: AppInputProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name)}
        className={`h-10 rounded-xl border bg-white px-4 text-sm text-slate-700 outline-none transition focus:ring-2 focus:ring-[#D4A017]/20 ${error ? "border-red-400" : "border-[#E5E7EB] focus:border-[#D4A017]"}`}
      />
      {description ? (
        <p className="text-xs text-slate-500">{description}</p>
      ) : null}
      {error ? <p className="text-sm text-red-600">{error.message}</p> : null}
    </div>
  );
}
