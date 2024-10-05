import Overview from "@/sections/overview";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard: Overview",
  description: "A summary of key data insights.",
};

export default function Dashboard() {
  return <Overview />;
}
