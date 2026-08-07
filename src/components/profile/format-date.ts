export function formatDate(
  input: object | string | Date | null | undefined,
): string {
  if (!input) {
    return "";
  }

  const date = input instanceof Date ? input : new Date(input.toString());

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
