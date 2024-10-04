import PageContainer from "@/components/layout/PageContainer";
import React from "react";

export default function overview() {
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
