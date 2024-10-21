import UserUpdateForm from "@/sections/tenant/updateForm";
import { Breadcrumbs } from "@/components/Breadcrumb";
import PageContainer from "@/components/layout/page-container";

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
    <PageContainer scrollable={true}>
      <div className="flex-1 space-y-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />
        <UserUpdateForm id={params.id} />
      </div>
    </PageContainer>
  );
}
