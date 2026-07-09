"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Modal from "@/components/admin/Modal";
import { api, Testimonial } from "@/lib/api";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ name: "", role: "", company: "", quote: "", rating: "5", result: "", initials: "", sortOrder: "0", active: true });

  const load = () => api.testimonials.listAdmin().then(setItems).catch(console.error).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    const data = { ...form, rating: parseInt(form.rating, 10) || 0, sortOrder: parseInt(form.sortOrder, 10) || 0 };
    if (editing) await api.testimonials.update(editing.id, data);
    else await api.testimonials.create(data);
    setModalOpen(false); load();
  };

  return (
    <>
      <AdminHeader title="Testimonials" description="Manage client reviews and success stories displayed on the homepage."
        action={<button className="admin-btn admin-btn-primary" onClick={() => { setEditing(null); setForm({ name: "", role: "", company: "", quote: "", rating: "5", result: "", initials: "", sortOrder: "0", active: true }); setModalOpen(true); }}>+ Add Testimonial</button>} />
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <table className="admin-table">
            <thead><tr><th>Client</th><th>Quote</th><th>Result</th><th>Rating</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id}>
                  <td><strong>{t.name}</strong><br /><span style={{ fontSize: 12, color: "#94a3b8" }}>{t.role}{t.company ? ` · ${t.company}` : ""}</span></td>
                  <td style={{ maxWidth: 300, fontSize: 13 }}>&quot;{t.quote.slice(0, 80)}...&quot;</td>
                  <td>{t.result ? <span className="admin-badge green">{t.result}</span> : "—"}</td>
                  <td>{"★".repeat(t.rating)}</td>
                  <td>
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => { setEditing(t); setForm({ name: t.name, role: t.role, company: t.company || "", quote: t.quote, rating: String(t.rating), result: t.result || "", initials: t.initials || "", sortOrder: String(t.sortOrder), active: t.active }); setModalOpen(true); }}>Edit</button>
                    {" "}
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={async () => { if (confirm("Delete?")) { await api.testimonials.delete(t.id); load(); } }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal title={editing ? "Edit Testimonial" : "Add Testimonial"} open={modalOpen} onClose={() => setModalOpen(false)}
        footer={<><button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button><button className="admin-btn admin-btn-primary" onClick={handleSave}>Save</button></>}>
        <div className="admin-form-grid">
          <div className="admin-form-group"><label className="admin-label">Client Name</label><input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="admin-form-group"><label className="admin-label">Role</label><input className="admin-input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
          <div className="admin-form-group"><label className="admin-label">Company</label><input className="admin-input" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
          <div className="admin-form-group"><label className="admin-label">Result</label><input className="admin-input" value={form.result} onChange={(e) => setForm({ ...form, result: e.target.value })} placeholder="Hired in 2 weeks" /></div>
          <div className="admin-form-group full"><label className="admin-label">Quote</label><textarea className="admin-textarea" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} /></div>
          <div className="admin-form-group"><label className="admin-label">Rating (1-5)</label><input className="admin-input" type="number" min="1" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} /></div>
        </div>
      </Modal>
    </>
  );
}
