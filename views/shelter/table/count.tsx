"use client";

import useShelterStore from "@/store/shelterStore";
import { Heading } from "@/components/Heading";

export default function ShelterCount() {
  const { totalData } = useShelterStore();

  return (
    <Heading
      title={`Shelter (${totalData})`}
      description="View and manage all aspects of shelter operations efficiently"
    />
  );
}
