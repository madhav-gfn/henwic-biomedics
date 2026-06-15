import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class lists, resolving conflicting utility classes
 * in favour of the ones that appear last.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}