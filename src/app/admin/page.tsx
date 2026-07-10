"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminAlert from "@/components/admin/AdminAlert";
import { dashboard, DashboardData } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    dashboard.get()
      .then(setData)
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="admin-loading"><div className="admin-spinner" /> Loading dashboard...</div>;
  }

  if (error) {
    return (
      <>
        <AdminHeader title="Dashboard" description="Overview of your site activity." />
        <AdminAlert message={error} onClose={() => setError("")} />
      </>
    );
  }

  const stats = data?.stats;

  const statCards = [
    { label: "Total Orders", value: stats?.orders.total ?? 0, badge: stats?.orders.new ? `${stats.orders.new} new` : null, badgeClass: "new", href: "/admin/orders" },
    { label: "Contact Messages", value: stats?.contacts.total ?? 0, badge: stats?.contacts.new ? `${stats.contacts.new} unread` : null, href: "/admin/contacts" },
    { label: "Book a Call", value: stats?.bookCalls?.total ?? 0, badge: stats?.bookCalls?.new ? `${stats.bookCalls.new} new` : null, badgeClass: "new", href: "/admin/book-calls" },
    { label: "Job Applications", value: stats?.applications.total ?? 0, badge: stats?.applications.new ? `${stats.applications.new} new` : null, href: "/admin/applications" },
    { label: "Resume Templates", value: stats?.templates ?? 0, href: "/admin/templates" },
    { label: "Blog Posts", value: stats?.blogPosts ?? 0, href: "/admin/blog" },
    { label: "Team Members", value: stats?.teamMembers ?? 0, href: "/admin/team" },
    { label: "Newsletter Subscribers", value: stats?.newsletterSubscribers ?? 0, href: "/admin/newsletter" },
  ];

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      new: "yellow", assigned: "blue", in_progress: "blue",
      delivered: "green", completed: "green", cancelled: "red",
      read: "gray", replied: "green",
    };
    return map[status] || "gray";
  };

  return (
    <>
      <AdminHeader
        title="Dashboard"
        description="Overview of your ProCareerVista website — orders, content, and leads at a glance."
      />

      <div className="admin-stats-grid">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} className="admin-stat-card" style={{ textDecoration: "none" }}>
            <div className="admin-stat-label">{card.label}</div>
            <div className="admin-stat-value">{card.value}</div>
            {card.badge && <span className={`admin-stat-badge ${card.badgeClass || ""}`}>{card.badge}</span>}
          </Link>
        ))}
      </div>

      <div className="admin-grid-2">
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Orders (Get Started)</h2>
            <Link href="/admin/orders" className="admin-btn admin-btn-secondary admin-btn-sm">View All</Link>
          </div>
          <div className="admin-card-body">
            {!data?.recent.orders.length ? (
              <div className="admin-empty"><div className="admin-empty-icon">📦</div><div className="admin-empty-text">No orders yet</div></div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr><th>Order</th><th>Customer</th><th>Plan</th><th>Status</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {data.recent.orders.map((order) => (
                    <tr key={order.id}>
                      <td><strong>{order.orderNumber}</strong></td>
                      <td>{order.firstName} {order.lastName}</td>
                      <td>{order.planName} · ${order.totalAmount}</td>
                      <td><span className={`admin-badge ${statusBadge(order.status)}`}>{order.status}</span></td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Messages</h2>
            <Link href="/admin/contacts" className="admin-btn admin-btn-secondary admin-btn-sm">View All</Link>
          </div>
          <div className="admin-card-body">
            {!data?.recent.contacts.length ? (
              <div className="admin-empty"><div className="admin-empty-icon">✉️</div><div className="admin-empty-text">No messages yet</div></div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr><th>From</th><th>Subject</th><th>Status</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {data.recent.contacts.map((msg) => (
                    <tr key={msg.id}>
                      <td><strong>{msg.name}</strong><br /><span style={{ fontSize: 12, color: "#94a3b8" }}>{msg.email}</span></td>
                      <td>{msg.subject}</td>
                      <td><span className={`admin-badge ${statusBadge(msg.status)}`}>{msg.status}</span></td>
                      <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: 20 }}>
        <div className="admin-card-header">
          <h2 className="admin-card-title">Recent Book a Call (Calendly)</h2>
          <Link href="/admin/book-calls" className="admin-btn admin-btn-secondary admin-btn-sm">View All</Link>
        </div>
        <div className="admin-card-body">
          {!data?.recent.bookCalls?.length ? (
            <div className="admin-empty"><div className="admin-empty-icon">📅</div><div className="admin-empty-text">No call bookings yet</div></div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr><th>Name</th><th>Event</th><th>Scheduled</th><th>Status</th><th>Date</th></tr>
              </thead>
              <tbody>
                {data.recent.bookCalls.map((booking) => (
                  <tr key={booking.id}>
                    <td><strong>{booking.name}</strong><br /><span style={{ fontSize: 12, color: "#94a3b8" }}>{booking.email}</span></td>
                    <td>{booking.eventName || "Consultation"}</td>
                    <td>{booking.scheduledAt ? new Date(booking.scheduledAt).toLocaleString() : "—"}</td>
                    <td><span className={`admin-badge ${statusBadge(booking.status)}`}>{booking.status}</span></td>
                    <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: 20 }}>
        <div className="admin-card-header">
          <h2 className="admin-card-title">Quick Actions</h2>
        </div>
        <div style={{ padding: "20px", display: "flex", flexWrap: "wrap", gap: 10 }}>
          {[
            ["/admin/templates", "📄 Add Template"],
            ["/admin/blog", "✍️ Write Blog Post"],
            ["/admin/team", "👥 Add Team Member"],
            ["/admin/pricing", "💰 Update Pricing"],
            ["/admin/settings", "⚙️ Site Settings"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="admin-btn admin-btn-secondary">{label}</Link>
          ))}
        </div>
      </div>
    </>
  );
}
