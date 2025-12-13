import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Truncates text at word boundaries to avoid cutting words awkwardly
 * @param text - The text to truncate
 * @param maxLength - Maximum character length (default: 120)
 * @param suffix - Suffix to append when truncated (default: "...")
 * @returns Truncated text ending at a word boundary
 */
export function truncateText(text: string, maxLength: number = 120, suffix: string = "..."): string {
  if (!text || text.length <= maxLength) {
    return text
  }

  // Find the last space within the maxLength limit
  const truncated = text.substring(0, maxLength)
  const lastSpaceIndex = truncated.lastIndexOf(" ")

  // If no space found, just cut at maxLength (rare for normal text)
  if (lastSpaceIndex === -1) {
    return truncated + suffix
  }

  // Truncate at the last word boundary
  return truncated.substring(0, lastSpaceIndex).replace(/[,.:;!?]$/, "") + suffix
}

