"use client";

import PageContainer from "@/components/layout/page-container";
import useAuthStore from "@/store/authStore";
import { useEffect } from "react";

export default function Overview() {
  const { isAuthenticated, isLoading, currentUser } = useAuthStore();

  console.log(currentUser);

  useEffect(() => {
    if (!isLoading) {
      console.log("isAuthenticated:", isAuthenticated);
    }
  }, [isLoading, isAuthenticated]);

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
      </div>
    </PageContainer>
  );
}
