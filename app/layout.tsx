import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Infini Working Blueprint",
  description: "A guided concept for making Infini AI's Discovery Sprint output more tangible before a production build.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
