import { SearchParams } from "nuqs/parsers";
import { searchParamsCache } from "@/lib/searchparams";
import MemberListingPage from "./_components/member/memberListingPage";

type PageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Dashboard: Member",
};

export default function Member({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  return <MemberListingPage />;
}
