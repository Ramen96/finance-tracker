import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.scss";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Finance Tracker",
  description: "A web application to help you track your spending daily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={quicksand.className}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className="antialiased">{children}</body>
    </html>
  );
}
