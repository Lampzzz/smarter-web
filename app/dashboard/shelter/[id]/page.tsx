import ShelterUpdateForm from "@/sections/shelter/updateForm";
import { Breadcrumbs } from "@/components/Breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata = {
  title: "Update Shelter",
};

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Shelter", link: "/dashboard/shelter" },
  { title: "Update", link: "/dashboard/shelter/update" },
];

export default function ShelterViewPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <ShelterUpdateForm id={params.id} />
      </div>
    </ScrollArea>
  );
}
