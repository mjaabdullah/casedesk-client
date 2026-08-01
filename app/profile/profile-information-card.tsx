import { AccountInformationSection } from "./account-information-section";
import { PersonalInformationSection } from "./personal-information-section";
import { ProfessionalInformationSection } from "./professional-information-section";
import type { UserProfile } from "./profile";
import { SecuritySection } from "./security-section";

interface ProfileInformationCardProps {
  profile: UserProfile;
}

export function ProfileInformationCard({
  profile,
}: ProfileInformationCardProps) {
  const hasProfessionalInfo =
    profile.userType === "lawyer"
      ? Boolean(profile.barCouncilIdNo || profile.enrollmentDate)
      : profile.userType === "assistant"
        ? Boolean(
            profile.advocateClerkIdNo ||
              profile.advocateId ||
              profile.startedDate,
          )
        : false;

  const hasSecurityInfo = Boolean(
    profile.passwordLastChangedAt ||
      profile.isTwoFactorEnabled !== null && profile.isTwoFactorEnabled !== undefined,
  );

  const hasAccountInfo = Boolean(
    profile.authProvider ||
      typeof profile.emailVerified === "boolean" ||
      profile.createdAt ||
      profile.updatedAt,
  );

  return (
    <div className="flex flex-col gap-6">
      <PersonalInformationSection profile={profile} />
      {hasProfessionalInfo ? (
        <ProfessionalInformationSection profile={profile} />
      ) : null}
      {hasSecurityInfo ? <SecuritySection profile={profile} /> : null}
      {hasAccountInfo ? <AccountInformationSection profile={profile} /> : null}
    </div>
  );
}
