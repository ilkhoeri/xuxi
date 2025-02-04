export function compareDesc(dateLeft: Date | string | number, dateRight: Date | string | number): number {
  const d1 = new Date(dateLeft).getTime();
  const d2 = new Date(dateRight).getTime();

  if (isNaN(d1) || isNaN(d2)) {
    throw new Error("Invalid date provided to compareDesc");
  }

  return d1 > d2 ? -1 : d1 < d2 ? 1 : 0;
}

export function parseISO(dateString: string | undefined): Date {
  if (!dateString) return new Date();

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid ISO date string");
  }
  return date;
}

export function format(date: Date | string | number, formatStr: string): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date provided to format");
  }

  const options: Intl.DateTimeFormatOptions = {};
  if (formatStr.includes("LLLL")) options.month = "long";
  if (formatStr.includes("d")) options.day = "numeric";
  if (formatStr.includes("yyyy")) options.year = "numeric";

  return new Intl.DateTimeFormat("en-US", options).format(d);
}
