import PageContainer from "@/components/layout/page-container";
import TotalData from "./total-data";
import { RecentTenant } from "./recent-tenant";
import { PieGraph } from "./pie-graph";
import { AreaGraph } from "./area-graph";
import { BarGraph } from "./bar-graph";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OverviewPage() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <TotalData />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <BarGraph />
          </div>
          <Card className="col-span-4 md:col-span-3">
            <CardHeader>
              <CardTitle>Recent Tenant</CardTitle>
              <CardDescription>
                You added 265 tenants this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTenant />
            </CardContent>
          </Card>
          <div className="col-span-4">
            <AreaGraph />
          </div>
          <div className="col-span-4 md:col-span-3">
            <PieGraph />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
