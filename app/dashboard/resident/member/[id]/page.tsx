import { Breadcrumbs } from "@/components/Breadcrumb";
import PageContainer from "@/components/layout/page-container";
import MemberUpdateForm from "@/views/resident/member/form/update-form";

export const metadata = {
  title: "Update Shelter",
};

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Member", link: "/dashboard/resident/member" },
  { title: "Update", link: "/dashboard/resident/member/update" },
];

export default function MemberViewPage({ params }: { params: { id: string } }) {
  return (
    <PageContainer scrollable={true}>
      <div className="flex-1 space-y-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />
        <MemberUpdateForm id={params.id} />
      </div>
    </PageContainer>
  );
}
