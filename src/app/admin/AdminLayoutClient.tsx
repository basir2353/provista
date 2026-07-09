"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isLoggedIn } from "@/lib/api";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import "./admin.css";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoginPage && !isLoggedIn()) {
      router.replace("/admin/login");
    }
  }, [isLoginPage, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  if (isLoginPage) {
    return <SiteSettingsProvider>{children}</SiteSettingsProvider>;
  }

  return (
    <SiteSettingsProvider>
    <div className="admin-layout">
      <div
        className={`admin-sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <header className="admin-mobile-header">
        <button
          type="button"
          className={`admin-menu-toggle ${sidebarOpen ? "open" : ""}`}
          aria-label="Toggle navigation"
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <span className="admin-mobile-title">Admin Panel</span>
      </header>
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">{children}</main>
    </div>
    </SiteSettingsProvider>
  );
}
