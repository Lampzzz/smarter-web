"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useManagerStore from "@/store/managerStore";

export function RecentTenant() {
  const { managers } = useManagerStore();

  return (
    <div className="space-y-8">
      {managers?.slice(0, 5).map((data, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{`${data.fullName
              .split("")[0]
              .toUpperCase()}`}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{data.fullName}</p>
            <p className="text-sm text-muted-foreground">{data.email}</p>
          </div>
          <div className="ml-auto font-medium text-sm">{data.phoneNumber}</div>
        </div>
      ))}
    </div>
  );
}
