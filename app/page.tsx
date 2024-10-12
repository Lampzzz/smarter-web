"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useAuthStore from "@/store/authStore";
import Login from "./(auth)/login/page";

export default function Page() {
  const { isLoading, isAuthenticated, initializeAuthListener } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    return () => unsubscribe();
  }, [initializeAuthListener]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return <div>Loading...</div>;

  return <Login />;
}
