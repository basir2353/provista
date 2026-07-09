"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { api, NewsletterSub } from "@/lib/api";

export default function AdminNewsletterPage() {
  const [items, setItems] = useState<NewsletterSub[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => api.newsletter.listAdmin().then(setItems).catch(console.error).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  return (
    <>
      <AdminHeader title="Newsletter Subscribers" description="Email list from newsletter signups on the homepage and blog page." />
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <table className="admin-table">
            <thead><tr><th>Email</th><th>Source</th><th>Status</th><th>Subscribed</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.email}</strong></td>
                  <td><span className="admin-badge blue">{s.source}</span></td>
                  <td><span className={`admin-badge ${s.active ? "green" : "gray"}`}>{s.active ? "Active" : "Unsubscribed"}</span></td>
                  <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={async () => { if (confirm("Remove subscriber?")) { await api.newsletter.delete(s.id); load(); } }}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
