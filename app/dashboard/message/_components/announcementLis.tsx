"use client";

import React, { useEffect, useState } from "react";
import { Bell, Search, Clock, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useAnnouncementStore from "@/store/announcementStore";
import { Button } from "@/components/ui/button";

export default function AnnouncementList() {
  const [filter, setFilter] = useState("all");
  const { announcements, fetchAnnouncements } = useAnnouncementStore();

  const categories: string[] = [
    "All",
    ...Array.from(new Set<string>(announcements!.map((ann) => ann.category))),
  ];

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setFilter(category.toLowerCase())}
            variant="outline"
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
