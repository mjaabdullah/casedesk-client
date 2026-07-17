import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type AppSelectProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
};

export function AppSelect<T extends FieldValues>({
  label,
  name,
  register,
  error,
  options,
  placeholder,
}: AppSelectProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        id={name}
        {...register(name)}
        className="h-10 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017]/20"
        defaultValue=""
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
