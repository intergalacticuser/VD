import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function toSafeExt(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
}

export function maskEmail(email: string): string {
  const [name, domain] = email.split("@");
  if (!domain) return "hidden";
  return `${name.slice(0, 2)}***@${domain}`;
}
