import { Button } from "@heroui/react";

export function AppButton({
  children,
  type = "submit",
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Button
      type={type}
      size="lg"
      className={`w-full py-2 cursor-pointer font-semibold ${variant === "primary" ? "bg-[#23272F] text-white hover:bg-[#1c2128]" : "border border-[#D4A017] bg-[#D4A017] text-[#23272F] hover:bg-[#bf8c11]"} ${className}`}
    >
      {children}
    </Button>
  );
}
