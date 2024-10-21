import Settings from "@/sections/settings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings and set e-mail preferences.",
};

export default function Page() {
  return <Settings />;
}
