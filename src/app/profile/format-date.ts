/**
 * Formats an ISO 8601 date string into a human-readable, locale-aware date
 * without exposing empty placeholders when the source data is missing.
 */
export function formatDate(isoDate: string | null | undefined): string {
  if (!isoDate || typeof isoDate !== "string") {
    return "";
  }

  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
