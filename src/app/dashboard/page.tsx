import type { Metadata } from "next";

import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { normalizeUserType } from "@/components/profile/profile";
import { getSessionUserFromServer } from "@/lib/getSessionFromServer";
import type { DashboardOverviewData } from "@/types/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | CaseDesk",
  description: "Your role-based CaseDesk workspace.",
};

export default async function DashboardPage() {
  const session = await getSessionUserFromServer();
  const user = session?.user;
  const userType = normalizeUserType(user?.userType);

  // Connect these props to dashboard summary and activity API responses.
  const data: DashboardOverviewData | undefined = undefined;

  return (
    <DashboardOverview
      user={{
        name: user?.name ?? "",
        email: user?.email,
        image: user?.image,
      }}
      userType={userType}
      data={data}
    />
  );
}
