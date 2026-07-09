"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Modal from "@/components/admin/Modal";
import { api, ContactMessage } from "@/lib/api";

export default function AdminContactsPage() {
  const [items, setItems] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState("");

  const load = () => {
    setLoading(true);
    api.contacts.listAdmin(filter || undefined).then(setItems).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [filter]);

  const markAs = async (id: string, status: string) => {
    await api.contacts.update(id, { status });
    load();
    setSelected(null);
  };

  return (
    <>
      <AdminHeader title="Contact Messages" description="Inbox for all contact form submissions from the website contact page." />
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        {["", "new", "read", "replied", "archived"].map((s) => (
          <button key={s} className={`admin-btn admin-btn-sm ${filter === s ? "admin-btn-primary" : "admin-btn-secondary"}`} onClick={() => setFilter(s)}>
            {s === "" ? "All" : s}
          </button>
        ))}
      </div>
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <table className="admin-table">
            <thead><tr><th>From</th><th>Subject</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((m) => (
                <tr key={m.id}>
                  <td><strong>{m.name}</strong><br /><span style={{ fontSize: 12, color: "#94a3b8" }}>{m.email}</span></td>
                  <td>{m.subject}</td>
                  <td><span className={`admin-badge ${m.status === "new" ? "yellow" : m.status === "replied" ? "green" : "gray"}`}>{m.status}</span></td>
                  <td>{new Date(m.createdAt).toLocaleString()}</td>
                  <td><button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setSelected(m)}>Read</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal title="Message Details" open={!!selected} onClose={() => setSelected(null)}
        footer={selected && <>
          <button className="admin-btn admin-btn-secondary" onClick={() => markAs(selected.id, "read")}>Mark Read</button>
          <button className="admin-btn admin-btn-primary" onClick={() => markAs(selected.id, "replied")}>Mark Replied</button>
        </>}>
        {selected && (
          <div>
            <p><strong>From:</strong> {selected.name} ({selected.email})</p>
            {selected.phone && <p><strong>Phone:</strong> {selected.phone}</p>}
            <p><strong>Subject:</strong> {selected.subject}</p>
            <div style={{ marginTop: 16, padding: 16, background: "#f8fafc", borderRadius: 8, whiteSpace: "pre-wrap" }}>{selected.message}</div>
          </div>
        )}
      </Modal>
    </>
  );
}
