import { Card, Chip } from "@heroui/react";
import {
  Building2,
  CalendarDays,
  History,
  MailCheck,
  MailX,
} from "lucide-react";

import { formatDate } from "./format-date";
import { InfoRow } from "./info-row";
import type { UserProfile } from "./profile";

interface AccountInformationSectionProps {
  profile: Pick<
    UserProfile,
    "authProvider" | "emailVerified" | "createdAt" | "updatedAt"
  >;
}

export function AccountInformationSection({
  profile,
}: AccountInformationSectionProps) {
  const authProvider = profile.authProvider?.trim();
  const memberSince = formatDate(profile?.createdAt);
  const lastUpdated = formatDate(profile?.updatedAt);

  return (
    <Card aria-labelledby="account-info-heading">
      <Card.Header>
        <Card.Title id="account-info-heading">Account Information</Card.Title>
        <Card.Description>
          How this account authenticates and when it was last updated
        </Card.Description>
      </Card.Header>
      <Card.Content className="grid gap-5 sm:grid-cols-2">
        {authProvider ? (
          <InfoRow
            icon={<Building2 className="size-4" aria-hidden="true" />}
            label="Authentication Provider"
            value={authProvider}
          />
        ) : null}

        {typeof profile.emailVerified === "boolean" ? (
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent"
            >
              {profile.emailVerified ? (
                <MailCheck className="size-4" />
              ) : (
                <MailX className="size-4" />
              )}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-wide text-foreground/50">
                Email Verification
              </span>
              <Chip
                color={profile.emailVerified ? "success" : "warning"}
                variant="tertiary"
                size="sm"
              >
                {profile.emailVerified ? "Verified" : "Unverified"}
              </Chip>
            </div>
          </div>
        ) : null}

        {memberSince ? (
          <InfoRow
            icon={<CalendarDays className="size-4" aria-hidden="true" />}
            label="Member Since"
            value={memberSince}
          />
        ) : null}

        {lastUpdated ? (
          <InfoRow
            icon={<History className="size-4" aria-hidden="true" />}
            label="Last Updated"
            value={lastUpdated}
          />
        ) : null}
      </Card.Content>
    </Card>
  );
}
