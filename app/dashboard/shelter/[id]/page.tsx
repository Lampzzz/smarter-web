import ShelterUpdateForm from "@/views/shelter/updateForm";
import { Breadcrumbs } from "@/components/Breadcrumb";
import PageContainer from "@/components/layout/page-container";

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
    <PageContainer scrollable={true}>
      <div className="flex-1 space-y-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />
        <ShelterUpdateForm id={params.id} />
      </div>
    </PageContainer>
  );
}
