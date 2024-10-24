"use client";
import React from "react";
import ThemeProvider from "./theme/theme-provider";
import AuthListenerProvider from "../auth-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <AuthListenerProvider />
      </ThemeProvider>
    </>
  );
}
