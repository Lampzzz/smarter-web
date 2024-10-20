"use client";

import { useEffect } from "react";
import { House, Users } from "lucide-react";

import useShelterStore from "@/store/shelterStore";
import useUserstore from "@/store/userStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TotalData() {
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

  return cardData.map((card, index) => (
    <Card key={index}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
        {card.icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{card.total}</div>
        <p className="text-xs text-muted-foreground">{card.change}</p>
      </CardContent>
    </Card>
  ));
}
