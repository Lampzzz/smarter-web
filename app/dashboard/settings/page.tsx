import type { Metadata } from "next";
import SettingsPage from "./_components/settingsPage";

export const metadata: Metadata = {
  title: "Settings",
};

export default function Page() {
  return <SettingsPage />;
}
