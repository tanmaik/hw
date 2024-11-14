import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "belch",
};

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-4 max-w-sm`}>
        {children}
      </body>
    </html>
  );
}
