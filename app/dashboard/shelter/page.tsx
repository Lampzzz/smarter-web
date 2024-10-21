import { SearchParams } from "nuqs/parsers";

import { searchParamsCache } from "@/lib/searchparams";
import ShelterPage from "@/views/shelter";

type PageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Shelter",
};

export default function Shelter({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  return <ShelterPage />;
}
