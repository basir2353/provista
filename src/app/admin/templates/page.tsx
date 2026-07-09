"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Modal from "@/components/admin/Modal";
import { api, Template, uploadUrl } from "@/lib/api";

const emptyForm = {
  name: "", category: "professional", description: "", tags: "",
  atsScore: "95", formats: "Word,PDF", badgeColor: "#0d1b21",
  featured: false, sortOrder: "0", active: true,
};

export default function AdminTemplatesPage() {
  const [items, setItems] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Template | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [wordFile, setWordFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState("");

  const load = () => {
    api.templates.listAdmin().then(setItems).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setWordFile(null); setPdfFile(null); setPreviewImage(null);
    setModalOpen(true);
  };

  const openEdit = (item: Template) => {
    setEditing(item);
    setForm({
      name: item.name, category: item.category, description: item.description || "",
      tags: item.tags || "", atsScore: String(item.atsScore), formats: item.formats,
      badgeColor: item.badgeColor, featured: item.featured,
      sortOrder: String(item.sortOrder), active: item.active,
    });
    setWordFile(null); setPdfFile(null); setPreviewImage(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setAlert("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      if (wordFile) fd.append("wordFile", wordFile);
      if (pdfFile) fd.append("pdfFile", pdfFile);
      if (previewImage) fd.append("previewImage", previewImage);

      if (editing) {
        await api.templates.update(editing.id, fd);
        setAlert("Template updated successfully");
      } else {
        await api.templates.create(fd);
        setAlert("Template created successfully");
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setAlert(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this template?")) return;
    await api.templates.delete(id);
    load();
  };

  return (
    <>
      <AdminHeader
        title="Resume Templates"
        description="Manage all resume templates — upload Word/PDF files, set categories, ATS scores, and preview images."
        action={<button className="admin-btn admin-btn-primary" onClick={openCreate}>+ Add Template</button>}
      />

      {alert && <div className="admin-alert success">{alert}</div>}

      <div className="admin-card">
        {loading ? (
          <div className="admin-loading"><div className="admin-spinner" /> Loading...</div>
        ) : items.length === 0 ? (
          <div className="admin-empty"><div className="admin-empty-icon">📄</div><div className="admin-empty-text">No templates yet. Add your first template.</div></div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th><th>Category</th><th>ATS Score</th><th>Formats</th>
                <th>Files</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id}>
                  <td>
                    <strong>{t.name}</strong>
                    {t.featured && <span className="admin-badge purple" style={{ marginLeft: 8 }}>Featured</span>}
                  </td>
                  <td><span className="admin-badge blue">{t.category}</span></td>
                  <td>ATS {t.atsScore}/100</td>
                  <td>{t.formats}</td>
                  <td style={{ fontSize: 12 }}>
                    {t.wordFile && <span title="Word file">📝 </span>}
                    {t.pdfFile && <span title="PDF file">📕 </span>}
                    {t.previewImage && <span title="Preview">🖼️ </span>}
                    {!t.wordFile && !t.pdfFile && <span style={{ color: "#94a3b8" }}>No files</span>}
                  </td>
                  <td><span className={`admin-badge ${t.active ? "green" : "gray"}`}>{t.active ? "Active" : "Inactive"}</span></td>
                  <td>
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => openEdit(t)}>Edit</button>
                    {" "}
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(t.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        title={editing ? "Edit Template" : "Add New Template"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editing ? "Update Template" : "Create Template"}
            </button>
          </>
        }
      >
        <div className="admin-form">
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label className="admin-label">Template Name *</label>
              <input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Executive Classic" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Category *</label>
              <select className="admin-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="executive">Executive</option>
                <option value="professional">Professional</option>
                <option value="creative">Creative</option>
              </select>
            </div>
            <div className="admin-form-group full">
              <label className="admin-label">Description</label>
              <textarea className="admin-textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description of this template style..." />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Tags <span>(comma-separated)</span></label>
              <input className="admin-input" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="ATS-Optimized, Two-Column" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">ATS Score</label>
              <input className="admin-input" type="number" min="0" max="100" value={form.atsScore} onChange={(e) => setForm({ ...form, atsScore: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Formats</label>
              <input className="admin-input" value={form.formats} onChange={(e) => setForm({ ...form, formats: e.target.value })} placeholder="Word,PDF" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Badge Color</label>
              <input className="admin-input" type="color" value={form.badgeColor} onChange={(e) => setForm({ ...form, badgeColor: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Sort Order</label>
              <input className="admin-input" type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Word File (.docx)</label>
              <input className="admin-input" type="file" accept=".doc,.docx" onChange={(e) => setWordFile(e.target.files?.[0] || null)} />
              {editing?.wordFile && <span className="admin-file-hint">Current: {editing.wordFile}</span>}
            </div>
            <div className="admin-form-group">
              <label className="admin-label">PDF File</label>
              <input className="admin-input" type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} />
              {editing?.pdfFile && <span className="admin-file-hint">Current: {editing.pdfFile}</span>}
            </div>
            <div className="admin-form-group full">
              <label className="admin-label">Preview Image</label>
              <input className="admin-input" type="file" accept="image/*" onChange={(e) => setPreviewImage(e.target.files?.[0] || null)} />
              {editing?.previewImage && (
                <img src={uploadUrl(editing.previewImage)} alt="Preview" style={{ maxWidth: 120, marginTop: 8, borderRadius: 8 }} />
              )}
            </div>
            <div className="admin-form-group">
              <label className="admin-checkbox-row">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                Featured template
              </label>
            </div>
            <div className="admin-form-group">
              <label className="admin-checkbox-row">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
                Active (visible on website)
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
