import type { Metadata } from "next";

import Overview from "@/views/overview";

export const metadata: Metadata = {
  title: "Overview",
};

export default function Dashboard() {
  return <Overview />;
}
