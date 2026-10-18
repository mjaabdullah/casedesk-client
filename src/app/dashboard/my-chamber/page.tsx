import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ChamberPage } from "@/components/dashboard/ChamberPage";
import { normalizeUserType } from "@/components/profile/profile";
import { getSessionUserFromServer } from "@/lib/getSessionFromServer";
import type { Chamber } from "@/types/chamber";

export const metadata: Metadata = {
  title: "My Chamber | CaseDesk",
  description: "View chamber information and associated cases.",
};

export default async function MyChamberPage() {
  const session = await getSessionUserFromServer();
  const userType = normalizeUserType(session?.user?.userType);

  if (userType === "general") {
    redirect("/dashboard");
  }

  // Connect this prop to the chamber profile/member API; undefined means no data request has been wired.
  const chamber: Chamber | null | undefined = undefined;

  return <ChamberPage userType={userType} chamber={chamber} />;
}
