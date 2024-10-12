"use client";

import useShelterStore from "@/store/shelterStore";
import { Heading } from "@/components/heading";

export default function ShelterCount() {
  const { totalData } = useShelterStore();

  return (
    <Heading title={`Shelter (${totalData})`} description="Manage shelter" />
  );
}
