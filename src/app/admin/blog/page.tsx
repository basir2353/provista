"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Modal from "@/components/admin/Modal";
import { api, BlogPost, uploadUrl } from "@/lib/api";

const emptyForm = {
  title: "", excerpt: "", content: "", category: "resume",
  categoryLabel: "Resume Tips", author: "", authorInitials: "",
  readTime: "5 min", coverGradient: "linear-gradient(135deg,#0d4f4f,#14b8a6)",
  featured: false, published: true,
};

export default function AdminBlogPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => api.blog.listAdmin().then(setItems).catch(console.error).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setCoverImage(null);
    setModalOpen(true);
  };

  const openEdit = (item: BlogPost) => {
    setEditing(item);
    setForm({
      title: item.title, excerpt: item.excerpt, content: item.content || "",
      category: item.category, categoryLabel: item.categoryLabel,
      author: item.author, authorInitials: item.authorInitials || "",
      readTime: item.readTime, coverGradient: item.coverGradient,
      featured: item.featured, published: item.published,
    });
    setCoverImage(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      if (coverImage) fd.append("coverImage", coverImage);

      if (editing) await api.blog.update(editing.id, fd);
      else await api.blog.create(fd);
      setModalOpen(false);
      load();
    } catch (err) { alert(err instanceof Error ? err.message : "Save failed"); }
    finally { setSaving(false); }
  };

  return (
    <>
      <AdminHeader
        title="Blog Posts"
        description="Create and manage career advice articles with cover photos, tips, and guides."
        action={<button className="admin-btn admin-btn-primary" onClick={openCreate}>+ New Post</button>}
      />
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <table className="admin-table">
            <thead><tr><th>Cover</th><th>Title</th><th>Category</th><th>Author</th><th>Views</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={uploadUrl(p.coverImage)} alt="" style={{ width: 48, height: 36, objectFit: "cover", borderRadius: 6 }} />
                    ) : (
                      <span style={{ fontSize: 20 }}>📄</span>
                    )}
                  </td>
                  <td><strong>{p.title}</strong>{p.featured && <span className="admin-badge purple" style={{ marginLeft: 6 }}>Featured</span>}</td>
                  <td><span className="admin-badge blue">{p.categoryLabel}</span></td>
                  <td>{p.author}</td>
                  <td>{p.views}</td>
                  <td><span className={`admin-badge ${p.published ? "green" : "gray"}`}>{p.published ? "Published" : "Draft"}</span></td>
                  <td>{new Date(p.publishedAt).toLocaleDateString()}</td>
                  <td>
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => openEdit(p)}>Edit</button>
                    {" "}
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={async () => { if (confirm("Delete?")) { await api.blog.delete(p.id); load(); } }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal title={editing ? "Edit Post" : "New Blog Post"} open={modalOpen} onClose={() => setModalOpen(false)}
        footer={<><button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Post"}</button></>}>
        <div className="admin-form">
          <div className="admin-form-grid">
            <div className="admin-form-group full">
              <label className="admin-label">Cover Photo</label>
              {editing?.coverImage && !coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={uploadUrl(editing.coverImage)} alt="Current cover" style={{ maxHeight: 120, borderRadius: 8, marginBottom: 8, display: "block" }} />
              )}
              <input type="file" className="admin-input" accept="image/*" onChange={(e) => setCoverImage(e.target.files?.[0] || null)} />
              <p className="admin-file-hint">Optional. Shown on blog cards instead of the gradient placeholder. PNG, JPG, or WebP.</p>
            </div>
            <div className="admin-form-group full">
              <label className="admin-label">Title *</label>
              <input className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="admin-form-group full">
              <label className="admin-label">Excerpt *</label>
              <textarea className="admin-textarea" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            </div>
            <div className="admin-form-group full">
              <label className="admin-label">Full Content</label>
              <textarea className="admin-textarea" style={{ minHeight: 200 }} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Full article content (HTML or markdown)..." />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Category</label>
              <select className="admin-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {["resume", "linkedin", "interview", "salary", "career", "jobsearch"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Category Label</label>
              <input className="admin-input" value={form.categoryLabel} onChange={(e) => setForm({ ...form, categoryLabel: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Author *</label>
              <input className="admin-input" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Read Time</label>
              <input className="admin-input" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} placeholder="7 min" />
            </div>
            <div className="admin-form-group full">
              <label className="admin-label">Fallback Gradient (if no photo)</label>
              <input className="admin-input" value={form.coverGradient} onChange={(e) => setForm({ ...form, coverGradient: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label className="admin-checkbox-row"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
            </div>
            <div className="admin-form-group">
              <label className="admin-checkbox-row"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
