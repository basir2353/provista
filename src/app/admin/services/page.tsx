"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Modal from "@/components/admin/Modal";
import { api, Service } from "@/lib/api";

export default function AdminServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({ slug: "", title: "", subtitle: "", description: "", price: "", delivery: "", anchorId: "", sortOrder: "0", active: true });

  const load = () => api.services.listAdmin().then(setItems).catch(console.error).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    const payload = { ...form, sortOrder: parseInt(form.sortOrder, 10) || 0 };
    if (editing) await api.services.update(editing.id, payload);
    else await api.services.create(payload);
    setModalOpen(false); load();
  };

  return (
    <>
      <AdminHeader title="Services" description="Manage the six service offerings displayed on the services page — resume writing, cover letters, LinkedIn, coaching, and more."
        action={<button className="admin-btn admin-btn-primary" onClick={() => { setEditing(null); setForm({ slug: "", title: "", subtitle: "", description: "", price: "", delivery: "", anchorId: "", sortOrder: "0", active: true }); setModalOpen(true); }}>+ Add Service</button>} />
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <table className="admin-table">
            <thead><tr><th>Service</th><th>Price</th><th>Delivery</th><th>Anchor</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.title}</strong><br /><span style={{ fontSize: 12, color: "#94a3b8" }}>{s.subtitle}</span></td>
                  <td>{s.price || "—"}</td>
                  <td>{s.delivery || "—"}</td>
                  <td>#{s.anchorId}</td>
                  <td><span className={`admin-badge ${s.active ? "green" : "gray"}`}>{s.active ? "Active" : "Inactive"}</span></td>
                  <td>
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => { setEditing(s); setForm({ slug: s.slug, title: s.title, subtitle: s.subtitle || "", description: s.description, price: s.price || "", delivery: s.delivery || "", anchorId: s.anchorId || "", sortOrder: String(s.sortOrder), active: s.active }); setModalOpen(true); }}>Edit</button>
                    {" "}
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={async () => { if (confirm("Delete?")) { await api.services.delete(s.id); load(); } }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal title={editing ? "Edit Service" : "Add Service"} open={modalOpen} onClose={() => setModalOpen(false)}
        footer={<><button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button><button className="admin-btn admin-btn-primary" onClick={handleSave}>Save</button></>}>
        <div className="admin-form-grid">
          <div className="admin-form-group"><label className="admin-label">Slug</label><input className="admin-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
          <div className="admin-form-group"><label className="admin-label">Title</label><input className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div className="admin-form-group"><label className="admin-label">Subtitle</label><input className="admin-input" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} /></div>
          <div className="admin-form-group"><label className="admin-label">Price</label><input className="admin-input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="From $99" /></div>
          <div className="admin-form-group full"><label className="admin-label">Description</label><textarea className="admin-textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="admin-form-group"><label className="admin-label">Delivery</label><input className="admin-input" value={form.delivery} onChange={(e) => setForm({ ...form, delivery: e.target.value })} /></div>
          <div className="admin-form-group"><label className="admin-label">Anchor ID</label><input className="admin-input" value={form.anchorId} onChange={(e) => setForm({ ...form, anchorId: e.target.value })} placeholder="resume-writing" /></div>
        </div>
      </Modal>
    </>
  );
}
