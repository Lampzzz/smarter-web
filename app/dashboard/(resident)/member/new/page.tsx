import PageContainer from "@/components/layout/page-container";
import MemberNewForm from "../_components/member/form/newForm";

export const metadata = {
  title: "Dashboard: New Member",
};

export default function MemberViewPage() {
  return (
    <PageContainer scrollable={true}>
      <div className="flex-1 space-y-4">
        <MemberNewForm />
      </div>
    </PageContainer>
  );
}
