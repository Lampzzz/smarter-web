import { SearchParams } from "nuqs/parsers";
import { searchParamsCache } from "@/lib/searchparams";
import ShelterPage from "@/sections/shelter";

export const metadata = {
  title: "Dashboard: Shelter",
};

type PageProps = {
  searchParams: SearchParams;
};

export default function Shelter({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  return <ShelterPage />;
}
