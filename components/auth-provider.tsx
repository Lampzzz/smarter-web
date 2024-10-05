"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/authStore";

export default function AuthListenerProvider() {
  const initializeAuthListener = useAuthStore(
    (state) => state.initializeAuthListener
  );

  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    return () => unsubscribe();
  }, [initializeAuthListener]);

  return null;
}
