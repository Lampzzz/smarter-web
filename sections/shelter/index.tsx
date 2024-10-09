import Link from "next/link";
import { Plus } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumb";
import { Heading } from "@/components/heading";
import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { searchParamsCache } from "@/lib/searchparams";
import ShelterTable from "./table";
import { getAllShelters } from "@/firebase/firestore";

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

  const shelters = await getAllShelters();

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Shelter (${shelters?.length})`}
            description="Manage shelter"
          />

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
