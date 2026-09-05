"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Modal from "@/components/admin/Modal";
import { api, Order } from "@/lib/api";

const STATUS_OPTIONS = ["new", "assigned", "in_progress", "delivered", "revision", "completed", "cancelled"];
const PAYMENT_OPTIONS = ["pending", "paid", "refunded"];

export default function AdminOrdersPage() {
  const [items, setItems] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<Order | null>(null);
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const load = () => {
    setLoading(true);
    api.orders.listAdmin(filter || undefined).then(setItems).catch(console.error).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [filter]);

  const openDetail = (order: Order) => {
    setSelected(order);
    setStatus(order.status);
    setPaymentStatus(order.paymentStatus);
    setAssignedTo(order.assignedTo || "");
  };

  const handleUpdate = async () => {
    if (!selected) return;
    await api.orders.update(selected.id, { status, paymentStatus, assignedTo });
    setSelected(null);
    load();
  };

  const statusColor = (s: string) => {
    const m: Record<string, string> = { new: "yellow", assigned: "blue", in_progress: "blue", delivered: "green", completed: "green", cancelled: "red", revision: "purple" };
    return m[s] || "gray";
  };

  return (
    <>
      <AdminHeader
        title="Orders"
        description="Manage customer resume orders — track status, payment, assigned writers, and uploaded resumes."
      />

      <div style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["", "new", "in_progress", "delivered", "completed"].map((s) => (
          <button key={s} className={`admin-btn admin-btn-sm ${filter === s ? "admin-btn-primary" : "admin-btn-secondary"}`}
            onClick={() => setFilter(s)}>
            {s === "" ? "All" : s.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : items.length === 0 ? (
          <div className="admin-empty"><div className="admin-empty-icon">📦</div><div className="admin-empty-text">No orders found</div></div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Order #</th><th>Customer</th><th>Plan</th><th>Total</th><th>Template</th><th>Status</th><th>Payment</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {items.map((o) => (
                <tr key={o.id}>
                  <td><strong>{o.orderNumber}</strong></td>
                  <td>{o.firstName} {o.lastName}<br /><span style={{ fontSize: 12, color: "#94a3b8" }}>{o.email}</span></td>
                  <td>{o.planName}</td>
                  <td><strong>${o.totalAmount}</strong></td>
                  <td>{o.templateName || "—"}</td>
                  <td><span className={`admin-badge ${statusColor(o.status)}`}>{o.status}</span></td>
                  <td><span className={`admin-badge ${o.paymentStatus === "paid" ? "green" : "yellow"}`}>{o.paymentStatus}</span></td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td><button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => openDetail(o)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal title={`Order ${selected?.orderNumber}`} open={!!selected} onClose={() => setSelected(null)}
        footer={<><button className="admin-btn admin-btn-secondary" onClick={() => setSelected(null)}>Close</button>
          <button className="admin-btn admin-btn-primary" onClick={handleUpdate}>Update Order</button></>}>
        {selected && (
          <div className="admin-form">
            <div className="admin-form-grid">
              <div className="admin-form-group"><label className="admin-label">Customer</label><p>{selected.firstName} {selected.lastName}</p></div>
              <div className="admin-form-group"><label className="admin-label">Email</label><p>{selected.email}</p></div>
              <div className="admin-form-group"><label className="admin-label">Phone</label><p>{selected.phone || "—"}</p></div>
              <div className="admin-form-group"><label className="admin-label">Plan</label><p>{selected.planName} — ${selected.planPrice}</p></div>
              <div className="admin-form-group"><label className="admin-label">Add-ons</label><p>{selected.addons || "—"}</p></div>
              <div className="admin-form-group"><label className="admin-label">Total</label><p><strong>${selected.totalAmount}</strong></p></div>
              <div className="admin-form-group"><label className="admin-label">Current Role</label><p>{selected.currentRole || "—"}</p></div>
              <div className="admin-form-group"><label className="admin-label">Target Role</label><p>{selected.targetRole || "—"}</p></div>
              <div className="admin-form-group"><label className="admin-label">Industry</label><p>{selected.industry || "—"}</p></div>
              <div className="admin-form-group"><label className="admin-label">Experience</label><p>{selected.experience || "—"}</p></div>
              <div className="admin-form-group full"><label className="admin-label">Notes</label><p>{selected.notes || "—"}</p></div>
              <div className="admin-form-group">
                <label className="admin-label">Status</label>
                <select className="admin-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Payment Status</label>
                <select className="admin-select" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                  {PAYMENT_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Assigned Writer</label>
                <input className="admin-input" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} placeholder="Writer name" />
              </div>
              {selected.resumeFile && (
                <div className="admin-form-group full">
                  <label className="admin-label">Uploaded Resume</label>
                  <a href={`${process.env.NEXT_PUBLIC_API_URL || "https://backend-provista-production-9ba0.up.railway.app"}/uploads/${selected.resumeFile}`} target="_blank" className="admin-btn admin-btn-secondary admin-btn-sm">Download Resume</a>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
