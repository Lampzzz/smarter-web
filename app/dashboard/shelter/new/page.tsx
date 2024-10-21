import ShelterForm from "@/views/shelter/form";
import { Breadcrumbs } from "@/components/Breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata = {
  title: "New Shelter",
};

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Shelter", link: "/dashboard/shelter" },
  { title: "Create", link: "/dashboard/shelter/create" },
];

export default function ShelterViewPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <ShelterForm />
      </div>
    </ScrollArea>
  );
}
