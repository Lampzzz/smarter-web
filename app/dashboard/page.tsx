"use client";

import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";

export default async function Dashboard() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  if (!isAuthenticated) {
    return router.replace("/");
  } else {
    router.replace("/dashboard/overview");
  }
}
