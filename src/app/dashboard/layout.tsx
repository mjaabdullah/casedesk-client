import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import type { CaseDeskUser } from "@/components/layout/navbar/types";
import { normalizeUserType } from "@/components/profile/profile";
import { getSessionUserFromServer } from "@/lib/getSessionFromServer";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSessionUserFromServer();

  if (!session?.user) {
    redirect("/login");
  }

  const user: CaseDeskUser & {
    userType: ReturnType<typeof normalizeUserType>;
  } = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
    userType: normalizeUserType(session.user.userType),
  };

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
