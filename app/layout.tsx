import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/context/useTheme";
import { Palette, PaletteProvider } from "@/context/usePalette";
import { ClerkProvider } from "@clerk/nextjs";
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
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies();
  const paletteTheme = cookiesStore.get('palette')?.value as Palette || 'everforest';

  return (
    <ClerkProvider>
      <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
        <body data-palette={paletteTheme} className="antialiased">
          <ThemeProvider>
            <PaletteProvider initialPalette={paletteTheme}>
              {children}
            </PaletteProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
