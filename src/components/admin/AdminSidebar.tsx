"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clearToken } from "@/lib/api";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/orders", label: "Orders", icon: "📦" },
  { href: "/admin/templates", label: "Templates", icon: "📄" },
  { href: "/admin/blog", label: "Blog Posts", icon: "✍️" },
  { href: "/admin/team", label: "Team", icon: "👥" },
  { href: "/admin/pricing", label: "Pricing", icon: "💰" },
  { href: "/admin/services", label: "Services", icon: "🛠️" },
  { href: "/admin/faqs", label: "FAQs", icon: "❓" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "⭐" },
  { href: "/admin/industries", label: "Industries", icon: "🏢" },
  { href: "/admin/contacts", label: "Messages", icon: "✉️" },
  { href: "/admin/applications", label: "Applications", icon: "📋" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "📧" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    clearToken();
    window.location.href = "/admin/login";
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <Link href="/admin" className="admin-logo">
          <span className="admin-logo-icon">✦</span>
          <div>
            <div className="admin-logo-text">ProCareerVista</div>
            <div className="admin-logo-sub">Admin Panel</div>
          </div>
        </Link>
      </div>

      <nav className="admin-nav">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`admin-nav-item ${pathname === item.href ? "active" : ""}`}
          >
            <span className="admin-nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <Link href="/" className="admin-nav-item" target="_blank">
          <span className="admin-nav-icon">🌐</span>
          View Website
        </Link>
        <button onClick={handleLogout} className="admin-nav-item admin-logout-btn">
          <span className="admin-nav-icon">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
