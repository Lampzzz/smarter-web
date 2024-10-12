"use client";

import { Heading } from "@/components/Heading";
import useUserStore from "@/store/userStore";

export default function UserCount() {
  const { totalData } = useUserStore();

  return (
    <Heading title={`Tenant (${totalData})`} description="Manage tenant" />
  );
}
