import type { Metadata } from "next";
import "./globals.css";
import { Geist, Playpen_Sans_Deva } from "next/font/google";
import { cn } from "@/lib/utils";

/* Fonts */
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const playpen = Playpen_Sans_Deva({
  subsets: ["latin"],
  variable: "--font-playpen",
});

/* Metadata */
export const metadata: Metadata = { title: "", description: "" };

/* Providers */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", "dark", geist.variable, playpen.variable)}
    >
      <body>{children}</body>
    </html>
  );
}
