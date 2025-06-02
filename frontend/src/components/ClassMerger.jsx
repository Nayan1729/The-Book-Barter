import {  clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...props) {
  return twMerge(clsx(props))
}
