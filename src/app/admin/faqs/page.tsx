"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Modal from "@/components/admin/Modal";
import { api, FAQ } from "@/lib/api";

export default function AdminFaqsPage() {
  const [items, setItems] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [form, setForm] = useState({ question: "", answer: "", category: "general", page: "home", sortOrder: "0", active: true });

  const load = () => api.faqs.listAdmin().then(setItems).catch(console.error).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (editing) await api.faqs.update(editing.id, form);
    else await api.faqs.create(form);
    setModalOpen(false); load();
  };

  return (
    <>
      <AdminHeader title="FAQs" description="Manage frequently asked questions shown on the homepage and pricing page."
        action={<button className="admin-btn admin-btn-primary" onClick={() => { setEditing(null); setForm({ question: "", answer: "", category: "general", page: "home", sortOrder: "0", active: true }); setModalOpen(true); }}>+ Add FAQ</button>} />
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <table className="admin-table">
            <thead><tr><th>Question</th><th>Page</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((f) => (
                <tr key={f.id}>
                  <td style={{ maxWidth: 400 }}><strong>{f.question}</strong></td>
                  <td><span className="admin-badge blue">{f.page}</span></td>
                  <td>{f.category}</td>
                  <td><span className={`admin-badge ${f.active ? "green" : "gray"}`}>{f.active ? "Active" : "Inactive"}</span></td>
                  <td>
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => { setEditing(f); setForm({ question: f.question, answer: f.answer, category: f.category, page: f.page, sortOrder: String(f.sortOrder), active: f.active }); setModalOpen(true); }}>Edit</button>
                    {" "}
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={async () => { if (confirm("Delete?")) { await api.faqs.delete(f.id); load(); } }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal title={editing ? "Edit FAQ" : "Add FAQ"} open={modalOpen} onClose={() => setModalOpen(false)}
        footer={<><button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button><button className="admin-btn admin-btn-primary" onClick={handleSave}>Save</button></>}>
        <div className="admin-form">
          <div className="admin-form-group"><label className="admin-label">Question</label><input className="admin-input" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} /></div>
          <div className="admin-form-group"><label className="admin-label">Answer</label><textarea className="admin-textarea" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} /></div>
          <div className="admin-form-grid">
            <div className="admin-form-group"><label className="admin-label">Page</label>
              <select className="admin-select" value={form.page} onChange={(e) => setForm({ ...form, page: e.target.value })}>
                <option value="home">Home</option><option value="pricing">Pricing</option><option value="services">Services</option>
              </select></div>
            <div className="admin-form-group"><label className="admin-label">Category</label>
              <select className="admin-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="general">General</option><option value="orders">Orders</option><option value="pricing">Pricing</option><option value="services">Services</option>
              </select></div>
          </div>
        </div>
      </Modal>
    </>
  );
}
