import { SearchParams } from "nuqs/parsers";
import { searchParamsCache } from "@/lib/searchparams";
import UsersListingPage from "@/sections/users";

type PageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Users",
  description: "Manage users account",
};

export default function Shelter({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  return <UsersListingPage />;
}
