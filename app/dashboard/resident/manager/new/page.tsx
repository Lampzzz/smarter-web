import UserForm from "@/views/resident/manager/form";
import { Breadcrumbs } from "@/components/Breadcrumb";
import PageContainer from "@/components/layout/page-container";

export const metadata = {
  title: "New Resident",
};

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Resident", link: "/dashboard/resident" },
  { title: "Create", link: "/dashboard/resident/create" },
];

export default function ManagerViewPage() {
  return (
    <PageContainer scrollable={true}>
      <div className="flex-1 space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <UserForm />
      </div>
    </PageContainer>
  );
}
