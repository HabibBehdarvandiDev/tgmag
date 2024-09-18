import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAuthorized(userRole: string, requiredRole: string): boolean {
  const roles = ["writer", "manager", "admin"]; // Define your role hierarchy

  // Ensure the user's role is equal to or higher than the required role
  return roles.indexOf(userRole) >= roles.indexOf(requiredRole);
}
