import { useState } from "react";
import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

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

export function AppPasswordInput<T extends FieldValues>({
  label,
  name,
  register,
  error,
  type = "password",
  placeholder,
  autoComplete,
  description,
}: AppInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register(name)}
          className={`h-10 w-full rounded-xl border bg-white px-4 ${
            isPasswordField ? "pr-11" : ""
          } text-sm text-slate-700 outline-none transition focus:ring-2 focus:ring-[#D4A017]/20 ${
            error ? "border-red-400" : "border-[#E5E7EB] focus:border-[#D4A017]"
          }`}
        />
        {isPasswordField ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide Password" : "Show Password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        ) : null}
      </div>
      {description ? (
        <p className="text-xs text-slate-500">{description}</p>
      ) : null}
      {error ? <p className="text-sm text-red-600">{error.message}</p> : null}
    </div>
  );
}
