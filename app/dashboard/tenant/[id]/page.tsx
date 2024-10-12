import UserUpdateForm from "@/sections/tenant/updateForm";
import { Breadcrumbs } from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata = {
  title: "Update Tenant",
};

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Tenant", link: "/dashboard/tenant" },
  { title: "Update", link: "/dashboard/tenant/update" },
];

export default function UserViewPage({ params }: { params: { id: string } }) {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <UserUpdateForm id={params.id} />
      </div>
    </ScrollArea>
  );
}
