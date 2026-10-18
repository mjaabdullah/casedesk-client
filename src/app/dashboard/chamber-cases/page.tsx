import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ChamberCasesPage } from "@/components/dashboard/ChamberCasesPage";
import { normalizeUserType } from "@/components/profile/profile";
import { getSessionUserFromServer } from "@/lib/getSessionFromServer";
import type { CaseListItem } from "@/types/case";

export const metadata: Metadata = {
  title: "Chamber Cases | CaseDesk",
  description: "Browse cases associated with your chamber.",
};

export default async function ChamberCasesRoute() {
  const session = await getSessionUserFromServer();
  const userType = normalizeUserType(session?.user?.userType);

  if (userType === "general") {
    redirect("/dashboard");
  }

  // Connect this prop to a chamber-scoped cases API; do not substitute personal case ownership.
  const chamberCases: CaseListItem[] | undefined = undefined;

  return <ChamberCasesPage cases={chamberCases} />;
}
