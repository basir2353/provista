"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isLoggedIn } from "@/lib/api";
import AdminSidebar from "@/components/admin/AdminSidebar";
import "./admin.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage && !isLoggedIn()) {
      router.replace("/admin/login");
    }
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">{children}</main>
    </div>
  );
}
