import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateRange(startDate?: string, endDate?: string, isCurrent?: boolean): string {
  if (!startDate && !endDate) return "";
  const start = startDate ? formatMonthYear(startDate) : "";
  if (isCurrent) return start ? `${start} - Present` : "Present";
  const end = endDate ? formatMonthYear(endDate) : "";
  if (start && end) return `${start} - ${end}`;
  return start || end || "";
}

export function formatMonthYear(dateString: string): string {
  if (!dateString) return "";
  // Check if already in Month YYYY format
  if (/^[A-Za-z]+\s+\d{4}$/.test(dateString.trim())) return dateString.trim();
  
  try {
    // If YYYY-MM
    if (/^\d{4}-\d{2}$/.test(dateString.trim())) {
      const [year, month] = dateString.split("-");
      const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1);
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
    // If full date or parseable
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
    return dateString;
  } catch {
    return dateString;
  }
}
