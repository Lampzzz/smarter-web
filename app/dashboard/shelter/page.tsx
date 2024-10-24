import { SearchParams } from "nuqs/parsers";
import { searchParamsCache } from "@/lib/searchparams";
import ShelterListingPage from "./_components/shelterListingPage";

type PageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Dashboard: Shelter",
};

export default function Shelter({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  return <ShelterListingPage />;
}
