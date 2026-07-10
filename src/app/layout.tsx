import type { Metadata, Viewport } from "next";
import SiteShell from "@/components/layout/SiteShell";
import NavigationProgress from "@/components/NavigationProgress";
import ScrollReveal from "@/components/ScrollReveal";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Playfair+Display:wght@400;600;700;900&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NavigationProgress />
        <SiteShell>{children}</SiteShell>
        <ScrollReveal />
        <SmoothScroll />
      </body>
    </html>
  );
}
