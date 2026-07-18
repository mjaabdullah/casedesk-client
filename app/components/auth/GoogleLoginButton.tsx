import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";

export function GoogleLoginButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      onPress={onClick}
      className="w-full flex items-center justify-center gap-1 cursor-pointer border py-2 border-[#E5E7EB] bg-white text-slate-700 hover:border-[#D4A017] hover:text-[#D4A017]"
    >
      <FcGoogle />
      Continue with Google
    </Button>
  );
}
