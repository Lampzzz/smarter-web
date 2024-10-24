import type { Metadata } from "next";
import MessagePage from "./_components/messagePage";

export const metadata: Metadata = {
  title: "Dashboard: Message",
};

export default function Page() {
  return <MessagePage />;
}
