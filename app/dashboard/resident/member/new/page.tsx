import { Breadcrumbs } from "@/components/Breadcrumb";
import PageContainer from "@/components/layout/page-container";
import MemberForm from "@/views/resident/member/form/new-form";

export const metadata = {
  title: "New Resident",
};

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Resident", link: "/dashboard/resident/member" },
  { title: "Create", link: "/dashboard/resident/create" },
];

export default function MemberViewPage() {
  return (
    <PageContainer scrollable={true}>
      <div className="flex-1 space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <MemberForm />
      </div>
    </PageContainer>
  );
}
