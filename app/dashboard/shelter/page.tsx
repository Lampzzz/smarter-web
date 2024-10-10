import { SearchParams } from "nuqs/parsers";
import { searchParamsCache } from "@/lib/searchparams";
import ShelterPage from "@/sections/shelter";

type PageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Shelter",
  descriptin: "Manage shelter information",
};

export default function Shelter({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  return <ShelterPage />;
}
