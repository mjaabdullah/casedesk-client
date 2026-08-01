import { Card, Chip, Separator } from "@heroui/react";
import { Mail } from "lucide-react";

import type { UserProfile, UserType } from "./profile";
import { ProfileActions } from "./profile-actions";
import { ProfileAvatar } from "./profile-avatar";

const USER_TYPE_LABEL: Record<UserType, string> = {
  lawyer: "Lawyer",
  assistant: "Lawyer Assistant",
  general: "General User",
};

interface ProfileHeaderProps {
  profile: UserProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <Card
      className="items-center gap-6 py-8 text-center"
      aria-labelledby="profile-header-name"
    >
      <ProfileAvatar
        name={profile.name}
        avatarUrl={profile.image ?? null}
        className="size-24 text-xl"
      />

      <div className="flex flex-col items-center gap-2">
        <h1
          id="profile-header-name"
          className="text-xl font-semibold text-foreground"
        >
          {profile.name}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Chip
            color={profile.userType === "lawyer" ? "danger" : "accent"}
            variant="primary"
            size="sm"
          >
            {USER_TYPE_LABEL[profile.userType]}
          </Chip>
        </div>

        <div className="mt-1 flex items-center gap-1.5 text-sm text-foreground/60">
          <Mail className="size-4" aria-hidden="true" />
          <span className="break-all">{profile.email}</span>
        </div>
      </div>

      <Separator />

      <ProfileActions className="w-full" />
    </Card>
  );
}
