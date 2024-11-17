import "./globals.css";
import type { Metadata } from "next";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { fileRouter } from "./api/uploadthing/core";
export const metadata: Metadata = {
  title: "belch",
};
import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
        <body className={`${inter.className} p-4 max-w-sm`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
