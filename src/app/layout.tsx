import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { Geist, Playpen_Sans_Deva } from "next/font/google";

/* Fonts */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  // fallback: ["var(--playpen)"]
});

const playpen = Playpen_Sans_Deva({
  subsets: ["latin"],
  variable: "--playpen",

  // Just for learning
  // next/font provides a default fallback font
  // Usually, you don't need to add a custom fallback
  // fallback: ["var(--font-sans, sans-serif)"],
});

/* Metadata */
export const metadata: Metadata = { title: "", description: "" };

/* Providers */

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  /* console.log("***");
  console.log("geist: ", geist);
  console.log("***"); */
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn(
        // "dark",
        geist.variable,
        playpen.variable,
      )}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
