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

export function passwordGenerator() {
  const minLength = 8;
  const maxLength = 20;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let retVal = "";

  // Generate a random length between minLength and maxLength
  const randomLength =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  // Generate the password with the random length
  for (let i = 0; i < randomLength; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return retVal;
}
