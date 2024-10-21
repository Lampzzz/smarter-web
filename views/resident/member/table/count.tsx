"use client";

import { Heading } from "@/components/Heading";
import useMemberStore from "@/store/memberStore";

export default function ManagerCount() {
  const { totalData } = useMemberStore();

  return (
    <Heading
      title={`Shelter Member (${totalData})`}
      description="Manage shelter manager"
    />
  );
}
