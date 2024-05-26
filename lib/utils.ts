import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const url = "https://nika2004.pythonanywhere.com";
export const url = "http://16.16.253.75";