import type { Metadata } from "next";

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/siderbar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "SmarTer - Admin Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full flex-1 overflow-hidden py-1">
        <Header />
        {children}
      </main>
    </div>
  );
}
