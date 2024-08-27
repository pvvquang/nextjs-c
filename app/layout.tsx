import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ProgressBar from "@/components/common/progress-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth",
  description: "NextJs authentication of PVQ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
