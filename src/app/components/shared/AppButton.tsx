import { Button } from "@heroui/react";

type AppButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
};

export function AppButton({
  children,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
}: AppButtonProps) {
  const base =
    "min-w-[140px] rounded-xl px-5 py-3 text-sm font-semibold transition";

  const variants = {
    primary: "bg-[#23272F] text-white hover:bg-[#1c2128]",
    secondary:
      "border border-[#D4A017] bg-[#D4A017] text-[#23272F] hover:bg-[#bf8c11]",
    ghost: "border border-[#E5E7EB] bg-white text-slate-700 hover:bg-slate-50",
  };

  return (
    <Button
      type={type}
      size="md"
      className={`${base} ${variants[variant]} ${className}`}
      onPress={onClick}
    >
      {children}
    </Button>
  );
}
