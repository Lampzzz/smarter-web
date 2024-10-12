import type { Metadata } from "next";

import Overview from "@/sections/overview";

export const metadata: Metadata = {
  title: "Overview",
  description: "A summary of key data insights.",
};

export default function Dashboard() {
  return <Overview />;
}
