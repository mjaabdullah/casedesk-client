import { Card } from "@heroui/react";
import { CalendarClock, IdCard, UserCog } from "lucide-react";

import { formatDate } from "./format-date";
import { InfoRow } from "./info-row";
import type { UserProfile } from "./profile";

interface ProfessionalInformationSectionProps {
  profile: Pick<
    UserProfile,
    | "userType"
    | "barCouncilIdNo"
    | "enrollmentDate"
    | "advocateClerkIdNo"
    | "advocateId"
    | "startedDate"
  >;
}

export function ProfessionalInformationSection({
  profile,
}: ProfessionalInformationSectionProps) {
  if (profile.userType === "lawyer") {
    const barCouncilId = profile.barCouncilIdNo?.trim();
    const enrollmentDate = formatDate(profile.enrollmentDate);

    if (!barCouncilId && !enrollmentDate) {
      return null;
    }

    return (
      <Card aria-labelledby="professional-info-heading">
        <Card.Header>
          <Card.Title id="professional-info-heading">
            Professional Information
          </Card.Title>
          <Card.Description>Lawyer credentials and enrollment details</Card.Description>
        </Card.Header>
        <Card.Content className="grid gap-5 sm:grid-cols-2">
          {barCouncilId ? (
            <InfoRow
              icon={<IdCard className="size-4" aria-hidden="true" />}
              label="Bar Council ID No"
              value={barCouncilId}
            />
          ) : null}
          {enrollmentDate ? (
            <InfoRow
              icon={<CalendarClock className="size-4" aria-hidden="true" />}
              label="Enrollment Date"
              value={enrollmentDate}
            />
          ) : null}
        </Card.Content>
      </Card>
    );
  }

  if (profile.userType === "assistant") {
    const advocateClerkId = profile.advocateClerkIdNo?.trim();
    const supervisingAdvocateId = profile.advocateId?.trim();
    const startedDate = formatDate(profile.startedDate);

    if (!advocateClerkId && !supervisingAdvocateId && !startedDate) {
      return null;
    }

    return (
      <Card aria-labelledby="professional-info-heading">
        <Card.Header>
          <Card.Title id="professional-info-heading">
            Professional Information
          </Card.Title>
          <Card.Description>
            Lawyer assistant credentials and work history
          </Card.Description>
        </Card.Header>
        <Card.Content className="grid gap-5 sm:grid-cols-2">
          {advocateClerkId ? (
            <InfoRow
              icon={<IdCard className="size-4" aria-hidden="true" />}
              label="Advocate Clerk ID No"
              value={advocateClerkId}
            />
          ) : null}
          {supervisingAdvocateId ? (
            <InfoRow
              icon={<UserCog className="size-4" aria-hidden="true" />}
              label="Supervising Advocate ID"
              value={supervisingAdvocateId}
            />
          ) : null}
          {startedDate ? (
            <InfoRow
              icon={<CalendarClock className="size-4" aria-hidden="true" />}
              label="Started Date"
              value={startedDate}
            />
          ) : null}
        </Card.Content>
      </Card>
    );
  }

  return null;
}
