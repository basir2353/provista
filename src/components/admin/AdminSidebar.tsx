"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clearToken } from "@/lib/api";
import { settingImageUrl, useSiteSettings } from "@/context/SiteSettingsContext";

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

interface AdminSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ open = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const settings = useSiteSettings();
  const siteName = settings.site_name || "ProCareerVista";
  const logoSrc = settingImageUrl(settings.site_logo, "");

  const handleLogout = () => {
    clearToken();
    window.location.href = "/admin/login";
  };

  return (
    <aside className={`admin-sidebar ${open ? "open" : ""}`}>
      <div className="admin-sidebar-header">
        <Link href="/admin" className="admin-logo">
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} alt={siteName} style={{ height: 36, width: "auto", borderRadius: 6 }} />
          ) : (
            <span className="admin-logo-icon">✦</span>
          )}
          <div>
            <div className="admin-logo-text">{siteName}</div>
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
            onClick={onClose}
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
