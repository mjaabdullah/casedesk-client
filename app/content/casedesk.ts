export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Cases", href: "#cases" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const footerColumns = [
  {
    title: "Product",
    links: ["Home", "Cases", "Features"],
  },
  {
    title: "Company",
    links: ["About", "Contact", "Privacy Policy"],
  },
  {
    title: "Resources",
    links: ["Help Center", "Documentation", "FAQ"],
  },
] as const;

export const featureCards = [
  {
    icon: "shield" as const,
    title: "Secure collaboration",
    description:
      "Centralize case notes, documents, and communications in a secure environment for your whole team.",
  },
  {
    icon: "calendar" as const,
    title: "Never miss a hearing",
    description:
      "Track deadlines, upcoming hearings, and document milestones with timely reminders built in.",
  },
  {
    icon: "book" as const,
    title: "Client-ready visibility",
    description:
      "Keep clients informed with clear updates and transparent case progress at every step.",
  },
] as const;

export const trustPoints = [
  "Matter timelines and deadlines",
  "Encrypted document access",
  "Structured intake and follow-up",
] as const;

export const heroStats = [
  ["Active Cases", "128"],
  ["Hearing Today", "12"],
  ["Closed", "86%"],
] as const;

export const recentCases = [
  ["Miller v. North Holdings", "Corporate advisory"],
  ["Liu v. Meridian Group", "Contract review"],
  ["Baker Estate", "Probate filing"],
] as const;

export const calendarItems = [
  ["Mon 09:00", "Case review"],
  ["Tue 14:30", "Mediation"],
  ["Wed 11:00", "Client briefing"],
] as const;

export const highlights = [
  "Track matters from intake to resolution",
  "Assign work, approvals, and follow-ups with precision",
  "Share status updates securely with clients and counsel",
] as const;
