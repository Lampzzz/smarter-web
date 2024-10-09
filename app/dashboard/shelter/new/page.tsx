import { Breadcrumbs } from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShelterForm from "@/sections/shelter/form";

export const metadata = {
  title: "New Shelter",
};

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Shelter", link: "/dashboard/shelter" },
  { title: "Create", link: "/dashboard/shelter/create" },
];

export default function EmployeeViewPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <ShelterForm />
      </div>
    </ScrollArea>
  );
}
