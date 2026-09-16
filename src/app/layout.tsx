import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { Geist, Playpen_Sans_Deva } from "next/font/google";

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
  // console.log(`*** ${geist.variable} ***`)
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn(
        "font-sans",
        /* "dark", */
        geist.variable,
        playpen.variable,
      )}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
