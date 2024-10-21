import UsersListingPage from "@/views/tenant";
import { SearchParams } from "nuqs/parsers";
import { searchParamsCache } from "@/lib/searchparams";

type PageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Manager",
};

export default function Shelter({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  return <UsersListingPage />;
}
