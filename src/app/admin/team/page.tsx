"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Modal from "@/components/admin/Modal";
import { api, TeamMember, uploadUrl } from "@/lib/api";

const emptyForm = {
  type: "member", name: "", role: "", initials: "", badge: "", bio: "",
  certs: "", industries: "", speciality: "", experience: "", written: "",
  writtenLabel: "Written", linkedinUrl: "", twitterUrl: "", email: "",
  sortOrder: "0", active: true,
};

export default function AdminTeamPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [photo, setPhoto] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => api.team.listAdmin().then(setItems).catch(console.error).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setPhoto(null); setModalOpen(true); };
  const openEdit = (item: TeamMember) => {
    setEditing(item);
    setForm({
      type: item.type, name: item.name, role: item.role, initials: item.initials,
      badge: item.badge || "", bio: item.bio || "", certs: item.certs || "",
      industries: item.industries || "", speciality: item.speciality || "",
      experience: item.experience || "", written: item.written || "",
      writtenLabel: item.writtenLabel || "Written",
      linkedinUrl: item.linkedinUrl || "", twitterUrl: item.twitterUrl || "", email: item.email || "",
      sortOrder: String(item.sortOrder), active: item.active,
    });
    setPhoto(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      if (photo) fd.append("photo", photo);
      if (editing) await api.team.update(editing.id, fd);
      else await api.team.create(fd);
      setModalOpen(false); load();
    } catch (err) { alert(err instanceof Error ? err.message : "Save failed"); }
    finally { setSaving(false); }
  };

  return (
    <>
      <AdminHeader title="Team Members" description="Manage leadership team and certified resume writers — bios, photos, LinkedIn, and credentials."
        action={<button className="admin-btn admin-btn-primary" onClick={openCreate}>+ Add Member</button>} />
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Role</th><th>Type</th><th>LinkedIn</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((m) => (
                <tr key={m.id}>
                  <td>
                    {m.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={uploadUrl(m.photoUrl)} alt={m.name} style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", marginRight: 8, verticalAlign: "middle" }} />
                    ) : (
                      <strong style={{ marginRight: 8 }}>{m.initials}</strong>
                    )}
                    {m.name}
                  </td>
                  <td>{m.role}</td>
                  <td><span className={`admin-badge ${m.type === "leader" ? "purple" : "blue"}`}>{m.type}</span></td>
                  <td style={{ fontSize: 13 }}>{m.linkedinUrl ? "✓" : "—"}</td>
                  <td><span className={`admin-badge ${m.active ? "green" : "gray"}`}>{m.active ? "Active" : "Inactive"}</span></td>
                  <td>
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => openEdit(m)}>Edit</button>
                    {" "}
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={async () => { if (confirm("Delete?")) { await api.team.delete(m.id); load(); } }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Modal title={editing ? "Edit Team Member" : "Add Team Member"} open={modalOpen} onClose={() => setModalOpen(false)}
        footer={<><button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</button></>}>
        <div className="admin-form">
          <div className="admin-form-grid">
            <div className="admin-form-group full">
              <label className="admin-label">Profile Photo</label>
              {editing?.photoUrl && !photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={uploadUrl(editing.photoUrl)} alt={editing.name} style={{ maxHeight: 80, borderRadius: 8, marginBottom: 8, display: "block" }} />
              )}
              <input type="file" className="admin-input" accept="image/*" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
            </div>
            <div className="admin-form-group"><label className="admin-label">Type</label>
              <select className="admin-select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="leader">Leader</option><option value="member">Writer/Coach</option>
              </select></div>
            <div className="admin-form-group"><label className="admin-label">Initials</label>
              <input className="admin-input" value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value })} maxLength={3} /></div>
            <div className="admin-form-group"><label className="admin-label">Full Name *</label>
              <input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="admin-form-group"><label className="admin-label">Role *</label>
              <input className="admin-input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
            <div className="admin-form-group full"><label className="admin-label">Bio</label>
              <textarea className="admin-textarea" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
            <div className="admin-form-group"><label className="admin-label">LinkedIn URL</label>
              <input className="admin-input" value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })} placeholder="https://linkedin.com/in/..." /></div>
            <div className="admin-form-group"><label className="admin-label">Twitter / X URL</label>
              <input className="admin-input" value={form.twitterUrl} onChange={(e) => setForm({ ...form, twitterUrl: e.target.value })} /></div>
            <div className="admin-form-group"><label className="admin-label">Email</label>
              <input className="admin-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="admin-form-group"><label className="admin-label">Badge</label>
              <input className="admin-input" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="CPRW · Founder" /></div>
            <div className="admin-form-group"><label className="admin-label">Certifications</label>
              <input className="admin-input" value={form.certs} onChange={(e) => setForm({ ...form, certs: e.target.value })} placeholder="CPRW,CPCC,MBA" /></div>
            <div className="admin-form-group"><label className="admin-label">Speciality</label>
              <input className="admin-input" value={form.speciality} onChange={(e) => setForm({ ...form, speciality: e.target.value })} /></div>
            <div className="admin-form-group"><label className="admin-label">Industries</label>
              <input className="admin-input" value={form.industries} onChange={(e) => setForm({ ...form, industries: e.target.value })} placeholder="Tech,Finance" /></div>
            <div className="admin-form-group"><label className="admin-label">Experience</label>
              <input className="admin-input" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="6 yrs" /></div>
            <div className="admin-form-group"><label className="admin-label">Written/Coached</label>
              <input className="admin-input" value={form.written} onChange={(e) => setForm({ ...form, written: e.target.value })} placeholder="800+" /></div>
          </div>
        </div>
      </Modal>
    </>
  );
}
