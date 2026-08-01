"use client";

import { Button } from "@heroui/react";
import { KeyRound, Pencil } from "lucide-react";

interface ProfileActionsProps {
  className?: string;
}

/**
 * Primary profile actions. UI only, per spec: handlers just log to the
 * console. Wire these up to real edit-profile / change-password flows
 * once that functionality is implemented.
 */
export function ProfileActions({ className }: ProfileActionsProps) {
  return (
    <div className={`flex flex-col gap-2 sm:flex-row ${className ?? ""}`}>
      <Button
        variant="primary"
        fullWidth
        onPress={() => console.log("Edit Profile clicked")}
      >
        <Pencil className="size-4" aria-hidden="true" />
        Edit Profile
      </Button>
      <Button
        variant="outline"
        fullWidth
        onPress={() => console.log("Change Password clicked")}
      >
        <KeyRound className="size-4" aria-hidden="true" />
        Change Password
      </Button>
    </div>
  );
}
