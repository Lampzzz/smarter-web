import { Breadcrumbs } from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserForm from "@/sections/users/form";

export const metadata = {
  title: "New User",
};

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "User", link: "/dashboard/users" },
  { title: "Create", link: "/dashboard/user/create" },
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
