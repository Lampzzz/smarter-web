"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "@/store/managerStore";

export function RecentTenant() {
  const { users } = useUserStore();

  return (
    <div className="space-y-8">
      {users?.slice(0, 5).map((tenant, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            {/* <AvatarImage src={tenant.avatar} alt={tenant.fullName} /> */}
            <AvatarFallback>{`${tenant.fullName
              .split("")[0]
              .toUpperCase()}`}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {tenant.fullName}
            </p>
            <p className="text-sm text-muted-foreground">{tenant.email}</p>
          </div>
          <div className="ml-auto font-medium text-sm">
            {tenant.phoneNumber}
          </div>
        </div>
      ))}
    </div>
  );
}
