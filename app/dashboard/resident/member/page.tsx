import { SearchParams } from "nuqs/parsers";
import { searchParamsCache } from "@/lib/searchparams";
import ListingPage from "@/views/resident/member";

type PageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Shelter Member",
};

export default function Member({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  return <ListingPage />;
}
