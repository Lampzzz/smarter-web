import { SearchParams } from "nuqs/parsers";
import { searchParamsCache } from "@/lib/searchparams";
import UsersListingPage from "@/sections/users";

type PageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Dashboard: Users",
};

export default function Shelter({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  return <UsersListingPage />;
}
