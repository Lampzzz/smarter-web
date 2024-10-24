"use client";

import { useEffect } from "react";
import { House, Users } from "lucide-react";

import useShelterStore from "@/store/shelterStore";
import useManagerStore from "@/store/managerStore";
import useMemberStore from "@/store/memberStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TotalData() {
  const { totalData: shelterTotalCount, fetchShelters } = useShelterStore();
  const { totalData: managerTotalCount, fetchManagers } = useManagerStore();
  const { totalData: memberTotalCount, fetchMembers } = useMemberStore();

  useEffect(() => {
    fetchManagers();
    fetchShelters();
    fetchMembers();
  }, [fetchManagers, fetchShelters, fetchMembers]);

  const cardData = [
    {
      title: "Total Shelter",
      total: shelterTotalCount,
      change: "+3 from last month",
      icon: <House className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Manager",
      total: managerTotalCount,
      change: "+32 from last month",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Total Member",
      total: memberTotalCount,
      change: "+32 from last month",
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
