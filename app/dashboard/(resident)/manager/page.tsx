import { SearchParams } from "nuqs/parsers";
import { searchParamsCache } from "@/lib/searchparams";
import ManagerListingPage from "./_components/managerListingPage";

type PageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Dashboard: Manager",
};

export default function Manager({ searchParams }: PageProps) {
  searchParamsCache.parse(searchParams);

  return <ManagerListingPage />;
}
