import { SearchParams } from "nuqs/parsers";
import { searchParamsCache } from "@/lib/searchparams";
import MessagePage from "./_components/messagePage";

type PageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Dashboard: Announcement",
};

export default function Shelter({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  return <MessagePage />;
}
