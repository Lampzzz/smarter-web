import { Breadcrumbs } from "@/components/Breadcrumb";
import PageContainer from "@/components/layout/page-container";
import ManagerUpdateForm from "@/views/resident/manager/form/update-form";

export const metadata = {
  title: "Update Manager",
};

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Manager", link: "/dashboard/resident/manager" },
  { title: "Update", link: "/dashboard/resident/manager/update" },
];

export default function UserViewPage({ params }: { params: { id: string } }) {
  return (
    <PageContainer scrollable={true}>
      <div className="flex-1 space-y-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />
        <ManagerUpdateForm id={params.id} />
      </div>
    </PageContainer>
  );
}