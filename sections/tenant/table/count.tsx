"use client";

import { Heading } from "@/components/Heading";
import useUserStore from "@/store/userStore";

export default function ManagerCount() {
  const { totalData } = useUserStore();

  return (
    <Heading
      title={`Shelter Manager (${totalData})`}
      description="Manage shelter manager"
    />
  );
}
