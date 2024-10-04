import { SearchParams } from "nuqs/parsers";

import { searchParamsCache } from "@/lib/searchparams";
import { ShelterListingPage } from "@/sections/shelter/view";

export const metadata = {
  title: "Dashboard : Shelter",
};

type PageProps = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: PageProps) => {
  searchParamsCache.parse(searchParams);

  return <ShelterListingPage />;
};

export default Page;
