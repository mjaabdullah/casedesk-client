import { CasesDropdown } from "./CasesDropdown";
import { authenticatedNavLinks } from "./navigation.config";
import { NavigationSection } from "./NavigationSection";
import { NavItem } from "./NavItem";
import { PublicNavigation } from "./PublicNavigation";
import { CaseDeskUser } from "./types";

interface DesktopNavbarProps {
  isAuthenticated: boolean;
  user?: CaseDeskUser;
}

export function AuthenticatedNavigation({
  isAuthenticated,
  user,
}: DesktopNavbarProps) {
  const userRole = user?.userType;
  return (
    <NavigationSection>
      {userRole === "general" && <PublicNavigation />}

      {userRole !== "general" &&
        authenticatedNavLinks.map((link) => (
          <NavItem key={link.href} href={link.href} label={link.label} />
        ))}
      {userRole !== "general" && (
        <CasesDropdown isAuthenticated={isAuthenticated} user={user} />
      )}
    </NavigationSection>
  );
}
