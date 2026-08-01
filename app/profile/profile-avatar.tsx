import { Avatar } from "@heroui/react";

interface ProfileAvatarProps {
  name: string;
  avatarUrl: string | null;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name?.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

export function ProfileAvatar({
  name,
  avatarUrl,
  className,
}: ProfileAvatarProps) {
  return (
    <Avatar size="lg" color="accent" className={className}>
      {avatarUrl ? (
        <Avatar.Image src={avatarUrl} alt={`${name}'s profile photo`} />
      ) : null}
      <Avatar.Fallback>{getInitials(name)}</Avatar.Fallback>
    </Avatar>
  );
}
