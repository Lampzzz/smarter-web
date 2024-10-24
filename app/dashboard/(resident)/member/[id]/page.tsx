import PageContainer from "@/components/layout/page-container";
import MemberUpdateForm from "../_components/member/form/updateForm";

export const metadata = {
  title: "Dashboard: Update Member",
};

export default function MemberViewPage({ params }: { params: { id: string } }) {
  return (
    <PageContainer scrollable={true}>
      <div className="flex-1 space-y-4 py-8">
        <MemberUpdateForm id={params.id} />
      </div>
    </PageContainer>
  );
}
