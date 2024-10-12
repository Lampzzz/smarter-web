import UserForm from "@/sections/tenant/form";
import { Breadcrumbs } from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata = {
  title: "New Tenant",
};

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Tenant", link: "/dashboard/tenant" },
  { title: "Create", link: "/dashboard/tenant/create" },
];

export default function EmployeeViewPage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <UserForm />
      </div>
    </ScrollArea>
  );
}
