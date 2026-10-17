import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import {
  Geist,
  // Playpen_Sans_Deva
} from "next/font/google";
import { siteConfig } from "@/lib/site";

/* Fonts */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  // fallback: ["var(--playpen)"]
});

/* const playpen = Playpen_Sans_Deva({
  subsets: ["latin"],
  variable: "--playpen",

  // Just for learning
  // next/font provides a default fallback font
  // Usually, you don't need to add a custom fallback
  // fallback: ["var(--font-sans, sans-serif)"],
}); */

/* Metadata */
const fullTitle = `${siteConfig.name} | ${siteConfig.title}`;
const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: { default: fullTitle, template: `%s | ${siteConfig.name}` },

  description: siteConfig.description,
  applicationName: siteConfig.name,

  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: fullTitle,
    description: siteConfig.description,
    // images: ["/og-image.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: siteConfig.description,
    // images: ["/og-image.png"],
  },
};


const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

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
        // playpen.variable,
      )}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};
export { metadata, viewport };
export default RootLayout;
