import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type AppDateInputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
};

export function AppDateInput<T extends FieldValues>({
  label,
  name,
  register,
  error,
}: AppDateInputProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={name}
        type="date"
        {...register(name)}
        className="h-10 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017]/20"
      />
      {error ? <p className="text-sm text-red-600">{error.message}</p> : null}
    </div>
  );
}
