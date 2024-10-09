import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fireBaseError(error: string) {
  const errors: Record<string, { message: string }> = {};

  switch (error) {
    case "auth/invalid-email":
      errors.email = { message: "Invalid email" };
      break;
    case "auth/invalid-credential":
      errors.both = { message: "Wrong email or password" };
      break;
    case "auth/user-disabled":
      errors.email = { message: "User disabled" };
      break;
    case "auth/user-not-found":
      errors.email = { message: "User not found" };
      break;
    case "auth/wrong-password":
      errors.password = { message: "Wrong password" };
      break;
    case "auth/email-already-in-use":
      errors.email = { message: "Email already taken" };
      break;
    default:
      errors.general = { message: error };
  }

  return errors;
}

export const formatBirthDate = (date: string): number => {
  const birthDate = new Date(date);
  const dateNow = new Date();
  let diffInMilliseconds: number = dateNow.getTime() - birthDate.getTime();
  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;

  return Math.floor(diffInMilliseconds / millisecondsInYear);
};
