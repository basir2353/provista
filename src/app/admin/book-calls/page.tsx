"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Modal from "@/components/admin/Modal";
import { api, BookCall } from "@/lib/api";

export default function AdminBookCallsPage() {
  const [items, setItems] = useState<BookCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BookCall | null>(null);
  const [filter, setFilter] = useState("");

  const load = () => {
    setLoading(true);
    api.bookCalls.listAdmin(filter || undefined).then(setItems).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filter]);

  const markAs = async (id: string, status: string) => {
    await api.bookCalls.update(id, { status });
    load();
    setSelected(null);
  };

  return (
    <>
      <AdminHeader title="Book a Call" description="Calendly bookings and consultation requests from the contact page." />
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        {["", "new", "confirmed", "completed", "cancelled"].map((s) => (
          <button key={s} className={`admin-btn admin-btn-sm ${filter === s ? "admin-btn-primary" : "admin-btn-secondary"}`} onClick={() => setFilter(s)}>
            {s === "" ? "All" : s}
          </button>
        ))}
      </div>
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : items.length === 0 ? (
          <div className="admin-empty"><div className="admin-empty-icon">📅</div><div className="admin-empty-text">No call bookings yet</div></div>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Event</th><th>Scheduled</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((b) => (
                <tr key={b.id}>
                  <td><strong>{b.name}</strong><br /><span style={{ fontSize: 12, color: "#94a3b8" }}>{b.email}</span></td>
                  <td>{b.eventName || "Consultation"}</td>
                  <td>{b.scheduledAt ? new Date(b.scheduledAt).toLocaleString() : "—"}</td>
                  <td><span className={`admin-badge ${b.status === "new" ? "yellow" : b.status === "confirmed" ? "green" : "gray"}`}>{b.status}</span></td>
                  <td>{new Date(b.createdAt).toLocaleString()}</td>
                  <td><button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setSelected(b)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal title="Booking Details" open={!!selected} onClose={() => setSelected(null)}
        footer={selected && <>
          <button className="admin-btn admin-btn-secondary" onClick={() => markAs(selected.id, "confirmed")}>Mark Confirmed</button>
          <button className="admin-btn admin-btn-primary" onClick={() => markAs(selected.id, "completed")}>Mark Completed</button>
        </>}>
        {selected && (
          <div>
            <p><strong>Name:</strong> {selected.name}</p>
            <p><strong>Email:</strong> {selected.email}</p>
            {selected.phone && <p><strong>Phone:</strong> {selected.phone}</p>}
            {selected.eventName && <p><strong>Event:</strong> {selected.eventName}</p>}
            {selected.scheduledAt && <p><strong>Scheduled:</strong> {new Date(selected.scheduledAt).toLocaleString()} {selected.timezone ? `(${selected.timezone})` : ""}</p>}
            {selected.calendlyUri && <p><strong>Calendly:</strong> <a href={selected.calendlyUri} target="_blank" rel="noopener noreferrer">View in Calendly</a></p>}
          </div>
        )}
      </Modal>
    </>
  );
}
