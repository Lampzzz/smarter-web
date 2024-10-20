import { SearchParams } from "nuqs/parsers";
import { searchParamsCache } from "@/lib/searchparams";
import MemberListingPage from "@/sections/resident/member";

type PageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Shelter Member",
  description: "Manage tenant account",
};

export default function Member({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  return <MemberListingPage />;
}
