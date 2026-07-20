import { publicNavLinks } from "./navigation.config";
import { NavigationSection } from "./NavigationSection";
import { NavItem } from "./NavItem";

export function PublicNavigation() {
  return (
    <NavigationSection>
      {publicNavLinks.map((link) => (
        <NavItem key={link.href} href={link.href} label={link.label} />
      ))}
    </NavigationSection>
  );
}
