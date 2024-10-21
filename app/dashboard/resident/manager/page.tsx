import ListingPage from "@/views/resident/manager";
import { SearchParams } from "nuqs/parsers";
import { searchParamsCache } from "@/lib/searchparams";

type PageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Shelter Manager",
};

export default function Manager({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  return <ListingPage />;
}
