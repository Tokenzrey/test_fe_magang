import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const isProduction = import.meta.env.MODE === "production";

export function cn(...inputs: Array<ClassValue>): string {
	return twMerge(clsx(...inputs));
}
