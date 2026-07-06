/**
 * Persian (Farsi) number and text formatting utilities.
 * All number formatting is centralized here so it can be toggled
 * between Persian and Western numerals easily.
 */

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const USE_PERSIAN_NUMERALS = true;

/**
 * Convert a number/string to Persian numerals.
 */
export function toPersianDigits(value: string | number): string {
  const str = String(value);
  if (!USE_PERSIAN_NUMERALS) return str;
  return str.replace(/[0-9]/g, (d) => PERSIAN_DIGITS[parseInt(d, 10)]);
}

/**
 * Format a price in IRR (Toman) with Persian numerals and grouping.
 * @param amount - Price in Toman
 * @param withCurrency - Append "تومان" suffix
 */
export function formatPrice(amount: number, withCurrency = true): string {
  const formatted = new Intl.NumberFormat("en-US").format(amount);
  const persian = toPersianDigits(formatted);
  return withCurrency ? `${persian} تومان` : persian;
}

/**
 * Format weight in grams with Persian numerals.
 * @param grams - Weight in grams
 */
export function formatWeight(grams: number): string {
  if (grams >= 1000) {
    const kg = grams / 1000;
    const formatted = Number.isInteger(kg)
      ? toPersianDigits(kg)
      : toPersianDigits(kg.toFixed(1));
    return `${formatted} کیلوگرم`;
  }
  return `${toPersianDigits(grams)} گرم`;
}

/**
 * Format a date to Persian (Jalali) calendar string.
 * Uses Intl.DateTimeFormat with fa-IR locale.
 */
export function formatPersianDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/**
 * Format a date with time in Persian.
 */
export function formatPersianDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

/**
 * Truncate text to a max length with ellipsis.
 */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}
