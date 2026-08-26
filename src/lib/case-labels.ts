import type { CaseListItem, CaseType } from "@/types/case";

const CRIMINAL_CASE_TYPE: CaseType = "ফৌজদারি";

/** Criminal cases use "আসামী" instead of "বিবাদী" for the opposing party. */
export function getDefendantLabel(caseType: CaseType): string {
  return caseType === CRIMINAL_CASE_TYPE ? "আসামী" : "বিবাদী";
}

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function compareHearingDates(value: string | null | undefined): number {
  const dateA = parseDate(new Date().toISOString());
  const dateB = parseDate(value);

  if (!dateB || !dateA) return 0;

  return dateA.getTime() - dateB.getTime();
}

/** e.g. "25 August 2026". Returns null when there is no valid hearing date. */
export function formatHearingDate(
  value: string | null | undefined,
): string | null {
  const date = parseDate(value);
  if (!date) return null;
  return `${date.getUTCDate()} ${MONTHS_LONG[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/** e.g. "05 Aug 2026". Returns null when there is no valid date. */
export function formatUpdatedDate(
  value: string | null | undefined,
): string | null {
  const date = parseDate(value);
  if (!date) return null;
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${day} ${MONTHS_SHORT[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

const MAX_VISIBLE_SECTION_NUMBERS = 3;

interface SectionsSummary {
  actName: string | null;
  summary: string | null;
  extraActsCount: number;
}

export function summarizeSections(
  sections: CaseListItem["sections"],
): SectionsSummary {
  if (!sections || sections.length === 0) {
    return { actName: null, summary: null, extraActsCount: 0 };
  }

  const [primary, ...rest] = sections;
  const visible = primary.sectionNumbers.slice(0, MAX_VISIBLE_SECTION_NUMBERS);
  const remaining = primary.sectionNumbers.length - visible.length;

  const parts = [`ধারা ${visible.join(", ")}`];
  if (remaining > 0) {
    parts.push(`+ ${remaining} more`);
  }

  return {
    actName: primary.actName,
    summary: parts.join(" "),
    extraActsCount: rest.length,
  };
}
