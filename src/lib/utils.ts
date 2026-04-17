import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number): string{
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

//  PRO: This is the standard shadcn cn() utility.
//    clsx = conditional class merging  |  twMerge = dedupes Tailwind classes
// MISTAKE: Using template literals for conditional classes
//    e.g. `bg-red-500 ${isActive ? "bg-blue-500" : ""}` — twMerge is needed
//    because Tailwind classes don't cascade; later class wins in source,
//    NOT in the HTML. Without merge, both bg-red-500 AND bg-blue-500 exist
//    and browser picks by specificity/order in the CSS file, not your logic

