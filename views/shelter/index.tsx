import Link from "next/link";
import { Plus } from "lucide-react";

import PageContainer from "@/components/layout/page-container";
import ShelterTable from "./table";
import ShelterCount from "./table/count";
import { Breadcrumbs } from "@/components/Breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { searchParamsCache } from "@/lib/searchparams";
import { cn } from "@/lib/utils";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Shelter", link: "/dashboard/shelter" },
];

export default async function Shelter() {
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("q");
  const status = searchParamsCache.get("status");
  const pageLimit = searchParamsCache.get("limit");

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(status && { status: status }),
  };

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <ShelterCount />
          <Link
            href={"/dashboard/shelter/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <ShelterTable filters={filters} />
      </div>
    </PageContainer>
  );
}