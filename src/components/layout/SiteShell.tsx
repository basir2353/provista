"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PageTransition from "@/components/PageTransition";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import DynamicFavicon from "@/components/DynamicFavicon";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SiteSettingsProvider>
      <DynamicFavicon />
      <Header />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </SiteSettingsProvider>
  );
}
