import { Card, Chip } from "@heroui/react";
import { KeyRound, ShieldAlert, ShieldCheck } from "lucide-react";

import { formatDate } from "./format-date";
import type { UserProfile } from "./profile";

interface SecuritySectionProps {
  profile: Pick<UserProfile, "passwordLastChangedAt" | "isTwoFactorEnabled">;
}

export function SecuritySection({ profile }: SecuritySectionProps) {
  return (
    <Card aria-labelledby="security-heading">
      <Card.Header>
        <Card.Title id="security-heading">Security</Card.Title>
        <Card.Description>
          Password and authentication safeguards
        </Card.Description>
      </Card.Header>
      <Card.Content className="grid gap-5 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent"
          >
            <KeyRound className="size-4" />
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium uppercase tracking-wide text-foreground/50">
              Password Last Changed
            </span>
            <span className="text-sm font-medium text-foreground">
              {profile.passwordLastChangedAt
                ? formatDate(profile.passwordLastChangedAt)
                : "Never changed"}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent"
          >
            {profile.isTwoFactorEnabled ? (
              <ShieldCheck className="size-4" />
            ) : (
              <ShieldAlert className="size-4" />
            )}
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wide text-foreground/50">
              Two-Factor Authentication
            </span>
            <Chip
              color={profile.isTwoFactorEnabled ? "success" : "warning"}
              variant="soft"
              size="sm"
            >
              {profile.isTwoFactorEnabled ? "Enabled" : "Disabled"}
            </Chip>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
