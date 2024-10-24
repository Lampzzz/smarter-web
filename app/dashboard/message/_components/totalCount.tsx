"use client";

import { Heading } from "@/components/Heading";
import useAnnouncementStore from "@/store/announcementStore";

export default function AnnouncementCount() {
  const { totalData } = useAnnouncementStore();

  return (
    <Heading
      title={`Announcement (${totalData})`}
      description="View and manage all aspects of shelter operations efficiently"
    />
  );
}
