import { Card } from "@heroui/react";

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-full max-w-2xl overflow-hidden border border-[#E5E7EB] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
      <div className="p-6 sm:p-8 lg:p-10">{children}</div>
    </Card>
  );
}
