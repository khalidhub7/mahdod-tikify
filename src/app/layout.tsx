import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}