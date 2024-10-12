import UserForm from "@/sections/tenant/form";
import { Breadcrumbs } from "@/components/breadcrumb";
import PageContainer from "@/components/layout/page-container";

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
    <PageContainer scrollable={true}>
      <div className="flex-1 space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <UserForm />
      </div>
    </PageContainer>
  );
}
