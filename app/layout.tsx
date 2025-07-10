import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ProviderLayout from "@/layout/ProviderLayouts";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Folder Browser",
  description: "Folder Browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProviderLayout>{children}</ProviderLayout>
      </body>
    </html>
  );
}
