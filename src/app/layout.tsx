import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Space_Mono } from "next/font/google";
import SiteShell from "@/components/layout/SiteShell";
import NavigationProgress from "@/components/NavigationProgress";
import ScrollReveal from "@/components/ScrollReveal";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ProCareerVista — Professional Resume Writing Services",
  description:
    "Professional resume writers crafting career stories that get noticed. ATS-optimized, industry-tailored, and designed to get you interviews.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} ${spaceMono.variable}`}>
        <NavigationProgress />
        <SiteShell>{children}</SiteShell>
        <ScrollReveal />
        <SmoothScroll />
      </body>
    </html>
  );
}
