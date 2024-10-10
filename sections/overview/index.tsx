"use client";

import PageContainer from "@/components/layout/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { House, Users } from "lucide-react";

export default function Overview() {
  const cardData = [
    {
      title: "Total Shelter",
      amount: "45",
      change: "+3 from last month",
      icon: <House className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Users",
      amount: "235",
      change: "+32 from last month",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Test Data",
      amount: "+12,234",
      change: "+19% from last month",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Test Data",
      amount: "+573",
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
                <div className="text-2xl font-bold">{card.amount}</div>
                <p className="text-xs text-muted-foreground">{card.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
