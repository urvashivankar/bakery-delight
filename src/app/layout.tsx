import type { Metadata } from "next";
import { Outfit, Great_Vibes } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { AnimatedLoader } from "@/components/AnimatedLoader";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
});

import { ClientLayoutWrapper } from "@/components/ClientLayoutWrapper";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

export const metadata: Metadata = {
  title: "L'Artisan Patisserie | Vadodara's Premium Bakery",
  description: "Experience Vadodara's finest artisan pastries, elegant cakes, and a luxury dessert boutique. Order online for delivery or reserve a table today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${greatVibes.variable} antialiased`} suppressHydrationWarning>
      <body className="selection:bg-ref-accent/30">
        <AnimatedLoader />
        <CustomCursor />
        <SmoothScroll>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
          <WhatsAppWidget />
        </SmoothScroll>
      </body>
    </html>
  );
}
