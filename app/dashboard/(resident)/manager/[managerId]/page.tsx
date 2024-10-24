import PageContainer from "@/components/layout/page-container";
import ManagerUpdateForm from "../_components/form/updateForm";

export const metadata = {
  title: "Dashboard: Update Manager",
};

export default function UserViewPage({
  params,
}: {
  params: { managerId: string };
}) {
  return (
    <PageContainer scrollable={true}>
      <div className="flex-1 space-y-4 py-8">
        <ManagerUpdateForm id={params.managerId} />
      </div>
    </PageContainer>
  );
}
