import Link from "next/link";
import { Plus } from "lucide-react";

import { Breadcrumbs } from "@/components/BreadCrumb";
import { Heading } from "@/components/Heading";
import PageContainer from "@/components/layout/PageContainer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { searchParamsCache } from "@/lib/searchparams";
import ShelterTable from "../shelter-table";
import { fakeShelters } from "@/constants/mock-api";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Shelter", link: "/dashboard/shelter" },
];

const ShelterListingPage = () => {
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
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title={`Shelter (20)`} description="Manage shelter" />

          <Link
            href={"/dashboard/employee/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <ShelterTable data={fakeShelters} totalData={fakeShelters.length} />
      </div>
    </PageContainer>
  );
};

export default ShelterListingPage;
