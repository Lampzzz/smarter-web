import Link from "next/link";
import { Plus } from "lucide-react";

import PageContainer from "@/components/layout/page-container";
import MemberTable from "./table";
import TotalCount from "./table/count";
import { Breadcrumbs } from "@/components/Breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { searchParamsCache } from "@/lib/searchparams";
import { cn } from "@/lib/utils";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Shelter Member", link: "/dashboard/member" },
];

export default async function UsersListingPage() {
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("q");
  const pageLimit = searchParamsCache.get("limit");
  const gender = searchParamsCache.get("gender");

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(gender && { genders: gender }),
  };

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <TotalCount />
          <Link
            href={"/dashboard/resident/member/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <MemberTable filters={filters} />
      </div>
    </PageContainer>
  );
}