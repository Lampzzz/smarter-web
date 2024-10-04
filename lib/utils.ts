import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchAPI(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body: any
) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method !== "GET" ? JSON.stringify(body) : null,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "An error occurred while fetching data.");
    }

    return data;
  } catch (error) {
    console.error("Something went wrong:", error);
    throw error;
  }
}
