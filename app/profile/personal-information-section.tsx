import { Card } from "@heroui/react";
import { Calendar, Mail, Phone, User } from "lucide-react";

import { formatDate } from "./format-date";
import { InfoRow } from "./info-row";
import type { UserProfile } from "./profile";

interface PersonalInformationSectionProps {
  profile: Pick<UserProfile, "name" | "email" | "phone" | "dateOfBirth">;
}

export function PersonalInformationSection({
  profile,
}: PersonalInformationSectionProps) {
  const phoneValue = profile.phone?.trim();
  const dateOfBirthValue = formatDate(profile.dateOfBirth);

  return (
    <Card aria-labelledby="personal-info-heading">
      <Card.Header>
        <Card.Title id="personal-info-heading">Personal Information</Card.Title>
        <Card.Description>Basic contact and identity details</Card.Description>
      </Card.Header>
      <Card.Content className="grid gap-5 sm:grid-cols-2">
        <InfoRow
          icon={<User className="size-4" aria-hidden="true" />}
          label="Full Name"
          value={profile.name}
        />
        <InfoRow
          icon={<Mail className="size-4" aria-hidden="true" />}
          label="Email Address"
          value={profile.email}
        />
        {phoneValue ? (
          <InfoRow
            icon={<Phone className="size-4" aria-hidden="true" />}
            label="Phone Number"
            value={phoneValue}
          />
        ) : null}
        {dateOfBirthValue ? (
          <InfoRow
            icon={<Calendar className="size-4" aria-hidden="true" />}
            label="Date of Birth"
            value={dateOfBirthValue}
          />
        ) : null}
      </Card.Content>
    </Card>
  );
}
