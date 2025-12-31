import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/context/useTheme";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
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
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className="antialiased transition">
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
