import Link from "next/link";
import { Plus } from "lucide-react";

import PageContainer from "@/components/layout/page-container";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import AnnouncementCount from "./totalCount";
import AnnouncementTable from "./table";
import AnnouncementList from "./announcementLis";

export default async function ShelterListingPage() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <AnnouncementCount />
          <Link
            href={"/dashboard/message/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <AnnouncementList />
      </div>
    </PageContainer>
  );
}
