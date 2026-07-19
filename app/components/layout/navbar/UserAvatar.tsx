import { Avatar } from "@heroui/react";

type User = {
  name: string;
  email: string;
  image?: string | null;
};

export function UserAvatar({ user }: { user: User }) {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#E5E7EB] bg-[#D4A017]/10 text-sm font-semibold text-[#23272F]">
      {user.image ? (
        <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
