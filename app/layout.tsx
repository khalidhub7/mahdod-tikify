import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "My App",
  description: "Built with Next.js",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="
      grid grid-rows-[auto_1fr_auto] min-h-screen 
      bg-taupe-50 text-foreground antialiased
      ">
        <Header />
        <main  >{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
