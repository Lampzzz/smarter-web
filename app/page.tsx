"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

import useAuthStore from "@/store/authStore";
import Login from "./(auth)/login/page";

export default function Page() {
  const { isLoading, isAuthenticated, initializeAuthListener } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    return () => unsubscribe();
  }, [initializeAuthListener]);

  if (!isLoading && isAuthenticated) redirect("/dashboard");

  return <Login />;
}
