import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Infini Working Blueprint",
  description: "Interactive pre-build system blueprint for an Infini AI Discovery Sprint.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
