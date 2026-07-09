"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Modal from "@/components/admin/Modal";
import { api, Industry } from "@/lib/api";

export default function AdminIndustriesPage() {
  const [items, setItems] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Industry | null>(null);
  const [form, setForm] = useState({ name: "", icon: "", resumeCount: "", description: "", sortOrder: "0", active: true });

  const load = () => api.industries.listAdmin().then(setItems).catch(console.error).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    const payload = { ...form, sortOrder: parseInt(form.sortOrder, 10) || 0 };
    if (editing) await api.industries.update(editing.id, payload);
    else await api.industries.create(payload);
    setModalOpen(false); load();
  };

  return (
    <>
      <AdminHeader title="Industries" description="Manage industry cards on the homepage — technology, finance, healthcare, and more."
        action={<button className="admin-btn admin-btn-primary" onClick={() => { setEditing(null); setForm({ name: "", icon: "", resumeCount: "", description: "", sortOrder: "0", active: true }); setModalOpen(true); }}>+ Add Industry</button>} />
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <table className="admin-table">
            <thead><tr><th>Icon</th><th>Industry</th><th>Resumes Written</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id}>
                  <td style={{ fontSize: 24 }}>{i.icon || "🏢"}</td>
                  <td><strong>{i.name}</strong></td>
                  <td>{i.resumeCount || "—"}</td>
                  <td><span className={`admin-badge ${i.active ? "green" : "gray"}`}>{i.active ? "Active" : "Inactive"}</span></td>
                  <td>
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => { setEditing(i); setForm({ name: i.name, icon: i.icon || "", resumeCount: i.resumeCount || "", description: i.description || "", sortOrder: String(i.sortOrder), active: i.active }); setModalOpen(true); }}>Edit</button>
                    {" "}
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={async () => { if (confirm("Delete?")) { await api.industries.delete(i.id); load(); } }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal title={editing ? "Edit Industry" : "Add Industry"} open={modalOpen} onClose={() => setModalOpen(false)}
        footer={<><button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button><button className="admin-btn admin-btn-primary" onClick={handleSave}>Save</button></>}>
        <div className="admin-form-grid">
          <div className="admin-form-group"><label className="admin-label">Industry Name</label><input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="admin-form-group"><label className="admin-label">Icon (emoji)</label><input className="admin-input" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="💻" /></div>
          <div className="admin-form-group"><label className="admin-label">Resumes Count</label><input className="admin-input" value={form.resumeCount} onChange={(e) => setForm({ ...form, resumeCount: e.target.value })} placeholder="2,400+" /></div>
          <div className="admin-form-group full"><label className="admin-label">Description</label><input className="admin-input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        </div>
      </Modal>
    </>
  );
}
