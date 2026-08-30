import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const currencySymbols: Record<string, string> = {
  MYR: "RM",
  USD: "$",
  SGD: "S$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  AUD: "A$",
  CNY: "CN¥",
  THB: "฿",
  IDR: "Rp",
};

export function currencySymbol(code: string) {
  return currencySymbols[code?.toUpperCase()] ?? `${code?.toUpperCase() ?? ""} `;
}

export function formatMoney(amount: number, currency = "MYR", options: { signed?: boolean } = {}) {
  const value = Number.isFinite(amount) ? amount : 0;
  const symbol = currencySymbol(currency);
  const formatted = Math.abs(value).toLocaleString("en-MY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const sign = value < 0 ? "-" : options.signed ? "+" : "";

  return `${sign}${symbol}${formatted}`;
}

export function formatDate(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);

  return date.toLocaleDateString("en-MY", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatDateTime(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);

  return `${formatDate(date)} · ${date.toLocaleTimeString("en-MY", { hour: "2-digit", minute: "2-digit" })}`;
}

/** Converts a date to the `yyyy-MM-ddTHH:mm` string an <input type="datetime-local"> expects. */
export function toDateTimeLocalValue(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);
  const offset = date.getTimezoneOffset() * 60000;

  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

/** Converts a date to the `yyyy-MM-dd` string an <input type="date"> expects. */
export function toDateInputValue(value: string | Date) {
  return toDateTimeLocalValue(value).slice(0, 10);
}

export function monthLabel(year: number, month: number) {
  return new Date(year, month - 1, 1).toLocaleDateString("en-MY", { month: "long", year: "numeric" });
}

export function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
