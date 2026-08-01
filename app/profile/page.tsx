import type { Metadata } from "next";

import { ProfilePage } from "./profile-page";

export const metadata: Metadata = {
  title: "Profile | CaseDesk",
  description: "View and manage your CaseDesk account profile.",
};

export default function Page() {
  return <ProfilePage />;
}
