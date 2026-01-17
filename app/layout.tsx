import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/context/useTheme";
import { PaletteProvider } from "@/context/usePalette";
import Script from "next/script";
import "./globals.scss";

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-main",
  subsets: ["latin"]
});

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
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script
          src="/theme-check.js"
          strategy="beforeInteractive"
        />
      </head>
      <body data-palette="everforest" className="antialiased transition">
        <ThemeProvider>
          <PaletteProvider>
            {children}
          </PaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
