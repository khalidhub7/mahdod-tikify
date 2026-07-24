import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

/* Fonts */

/* Metadata */
export const metadata: Metadata = {
  title: "",
  description: "",
};

/* Providers */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", /* "dark", */ geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
