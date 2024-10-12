import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ThemeProvider from "@/components/layout/theme/theme-provider";
import AuthListenerProvider from "@/components/auth-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmarTer",
  description: "Smart Shelter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
        <AuthListenerProvider />
      </body>
    </html>
  );
}
