import UsersListingPage from "@/sections/tenant";
import { SearchParams } from "nuqs/parsers";
import { searchParamsCache } from "@/lib/searchparams";

type PageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Tenant",
  description: "Manage tenant account",
};

export default function Shelter({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  return <UsersListingPage />;
}
