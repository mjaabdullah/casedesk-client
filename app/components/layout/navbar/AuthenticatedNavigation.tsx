import { CasesDropdown } from "./CasesDropdown";
import { NavigationSection } from "./NavigationSection";
import { NavItem } from "./NavItem";
import { authenticatedNavLinks } from "./navigation.config";

export function AuthenticatedNavigation() {
  return (
    <NavigationSection>
      {authenticatedNavLinks.map((link) => (
        <NavItem key={link.href} href={link.href} label={link.label} />
      ))}
      <CasesDropdown />
    </NavigationSection>
  );
}
