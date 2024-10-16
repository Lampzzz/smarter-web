"use client";

import { useEffect } from "react";
import { House, Users } from "lucide-react";

import PageContainer from "@/components/layout/page-container";
import useShelterStore from "@/store/shelterStore";
import useUserstore from "@/store/userStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentTenant } from "./recent-tenant";
import { PieGraph } from "./pie-graph";
import { AreaGraph } from "./area-graph";
import { BarGraph } from "./bar-graph";

export default function Overview() {
  const { totalData: userTotalCount, fetchUsers } = useUserstore();
  const { totalData: shelterTotalCount, fetchShelters } = useShelterStore();

  useEffect(() => {
    fetchUsers();
    fetchShelters();
  }, [fetchUsers, fetchShelters]);

  const cardData = [
    {
      title: "Total Shelter",
      total: shelterTotalCount,
      change: "+3 from last month",
      icon: <House className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Users",
      total: userTotalCount,
      change: "+32 from last month",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Test Data",
      total: "+12,234",
      change: "+19% from last month",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Test Data",
      total: "+573",
      change: "+201 since last hour",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cardData.map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.total}</div>
                <p className="text-xs text-muted-foreground">{card.change}</p>
              </CardContent>
            </Card>
          ))}
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
