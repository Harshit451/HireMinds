// Utility to merge Tailwind class names with deduplication
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names while respecting Tailwind's conflict rules.
 * @param {...any} inputs - class value arguments accepted by clsx.
 * @returns {string} merged class string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
