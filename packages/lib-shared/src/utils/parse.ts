/**
 * Shared parsing utilities for query parameters, form values, and data normalization.
 */

/** Parse a nullable string to a Date, returning undefined if invalid. */
export function parseOptionalDate(value: string | null | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

/** Parse a nullable string to an integer, returning undefined if invalid. */
export function parseOptionalNumber(value: string | null | undefined): number | undefined {
  if (!value) return undefined;
  const n = Number.parseInt(value, 10);
  return Number.isNaN(n) ? undefined : n;
}

/** Parse a string to an integer, clamping to [min, max] with a fallback. */
export function parseClampedNumber(
  value: string | undefined,
  min: number,
  max: number,
  fallback: number
): number {
  const parsed = Number.parseInt(value ?? '', 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.min(Math.max(parsed, min), max);
}

/** Format a Date to YYYY-MM-DD string. */
export function formatDateOnly(date: Date): string {
  return date.toISOString().split('T')[0]!;
}

/** Return start of day (00:00:00.000) for the given date. */
export function getStartOfDay(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Convert any value to number, handling Prisma Decimal objects. */
export function toNumber(value: unknown): number | null {
  if (value == null) return null;
  if (typeof value === 'number') return value;
  if (
    typeof value === 'object' &&
    'toNumber' in value &&
    typeof (value as { toNumber: () => number }).toNumber === 'function'
  ) {
    return (value as { toNumber: () => number }).toNumber();
  }
  const num = Number(value);
  return isNaN(num) ? null : num;
}
