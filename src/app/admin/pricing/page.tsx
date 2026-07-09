"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Modal from "@/components/admin/Modal";
import { api, PricingPlan, Addon } from "@/lib/api";

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"plans" | "addons">("plans");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [editingAddon, setEditingAddon] = useState<Addon | null>(null);
  const [planForm, setPlanForm] = useState({ slug: "", name: "", price: "", bundlePrice: "", delivery: "", revisions: "", coverLetter: "", linkedin: "", popular: false, active: true });
  const [addonForm, setAddonForm] = useState({ slug: "", name: "", price: "", description: "", active: true });

  const load = async () => {
    const [p, a] = await Promise.all([api.pricing.plans.listAdmin(), api.pricing.addons.listAdmin()]);
    setPlans(p); setAddons(a); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const savePlan = async () => {
    const data = { ...planForm, price: parseFloat(planForm.price), bundlePrice: planForm.bundlePrice ? parseFloat(planForm.bundlePrice) : undefined };
    if (editingPlan) await api.pricing.plans.update(editingPlan.id, data);
    else await api.pricing.plans.create(data);
    setModalOpen(false); load();
  };

  const saveAddon = async () => {
    const data = { ...addonForm, price: parseFloat(addonForm.price) };
    if (editingAddon) await api.pricing.addons.update(editingAddon.id, data);
    else await api.pricing.addons.create(data);
    setModalOpen(false); load();
  };

  return (
    <>
      <AdminHeader title="Pricing" description="Manage pricing plans (Starter, Professional, Executive) and add-on services with bundle pricing." />
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <button className={`admin-btn admin-btn-sm ${tab === "plans" ? "admin-btn-primary" : "admin-btn-secondary"}`} onClick={() => setTab("plans")}>Plans ({plans.length})</button>
        <button className={`admin-btn admin-btn-sm ${tab === "addons" ? "admin-btn-primary" : "admin-btn-secondary"}`} onClick={() => setTab("addons")}>Add-ons ({addons.length})</button>
        <button className="admin-btn admin-btn-primary admin-btn-sm" style={{ marginLeft: "auto" }} onClick={() => {
          if (tab === "plans") { setEditingPlan(null); setPlanForm({ slug: "", name: "", price: "", bundlePrice: "", delivery: "48 Hours", revisions: "Unlimited", coverLetter: "✓ Included", linkedin: "✓ Included", popular: false, active: true }); }
          else { setEditingAddon(null); setAddonForm({ slug: "", name: "", price: "", description: "", active: true }); }
          setModalOpen(true);
        }}>+ Add {tab === "plans" ? "Plan" : "Add-on"}</button>
      </div>

      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : tab === "plans" ? (
          <table className="admin-table">
            <thead><tr><th>Plan</th><th>Price</th><th>Bundle</th><th>Delivery</th><th>Revisions</th><th>Popular</th><th>Actions</th></tr></thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.name}</strong> <span style={{ color: "#94a3b8", fontSize: 12 }}>({p.slug})</span></td>
                  <td>${p.price}</td>
                  <td>{p.bundlePrice ? `$${p.bundlePrice}` : "—"}</td>
                  <td>{p.delivery}</td>
                  <td>{p.revisions}</td>
                  <td>{p.popular ? <span className="admin-badge purple">Popular</span> : "—"}</td>
                  <td>
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => {
                      setEditingPlan(p); setPlanForm({ slug: p.slug, name: p.name, price: String(p.price), bundlePrice: p.bundlePrice ? String(p.bundlePrice) : "", delivery: p.delivery, revisions: p.revisions, coverLetter: p.coverLetter, linkedin: p.linkedin, popular: p.popular, active: p.active });
                      setModalOpen(true);
                    }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Price</th><th>Description</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {addons.map((a) => (
                <tr key={a.id}>
                  <td><strong>{a.name}</strong></td>
                  <td>+${a.price}</td>
                  <td style={{ fontSize: 13 }}>{a.description || "—"}</td>
                  <td><span className={`admin-badge ${a.active ? "green" : "gray"}`}>{a.active ? "Active" : "Inactive"}</span></td>
                  <td>
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => {
                      setEditingAddon(a); setAddonForm({ slug: a.slug, name: a.name, price: String(a.price), description: a.description || "", active: a.active });
                      setModalOpen(true);
                    }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal title={tab === "plans" ? (editingPlan ? "Edit Plan" : "Add Plan") : (editingAddon ? "Edit Add-on" : "Add Add-on")} open={modalOpen} onClose={() => setModalOpen(false)}
        footer={<><button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="admin-btn admin-btn-primary" onClick={tab === "plans" ? savePlan : saveAddon}>Save</button></>}>
        {tab === "plans" ? (
          <div className="admin-form-grid">
            <div className="admin-form-group"><label className="admin-label">Slug</label><input className="admin-input" value={planForm.slug} onChange={(e) => setPlanForm({ ...planForm, slug: e.target.value })} placeholder="professional" /></div>
            <div className="admin-form-group"><label className="admin-label">Name</label><input className="admin-input" value={planForm.name} onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })} /></div>
            <div className="admin-form-group"><label className="admin-label">Price ($)</label><input className="admin-input" type="number" value={planForm.price} onChange={(e) => setPlanForm({ ...planForm, price: e.target.value })} /></div>
            <div className="admin-form-group"><label className="admin-label">Bundle Price ($)</label><input className="admin-input" type="number" value={planForm.bundlePrice} onChange={(e) => setPlanForm({ ...planForm, bundlePrice: e.target.value })} /></div>
            <div className="admin-form-group"><label className="admin-label">Delivery</label><input className="admin-input" value={planForm.delivery} onChange={(e) => setPlanForm({ ...planForm, delivery: e.target.value })} /></div>
            <div className="admin-form-group"><label className="admin-label">Revisions</label><input className="admin-input" value={planForm.revisions} onChange={(e) => setPlanForm({ ...planForm, revisions: e.target.value })} /></div>
            <div className="admin-form-group"><label className="admin-checkbox-row"><input type="checkbox" checked={planForm.popular} onChange={(e) => setPlanForm({ ...planForm, popular: e.target.checked })} /> Most Popular</label></div>
          </div>
        ) : (
          <div className="admin-form-grid">
            <div className="admin-form-group"><label className="admin-label">Slug</label><input className="admin-input" value={addonForm.slug} onChange={(e) => setAddonForm({ ...addonForm, slug: e.target.value })} /></div>
            <div className="admin-form-group"><label className="admin-label">Name</label><input className="admin-input" value={addonForm.name} onChange={(e) => setAddonForm({ ...addonForm, name: e.target.value })} /></div>
            <div className="admin-form-group"><label className="admin-label">Price ($)</label><input className="admin-input" type="number" value={addonForm.price} onChange={(e) => setAddonForm({ ...addonForm, price: e.target.value })} /></div>
            <div className="admin-form-group full"><label className="admin-label">Description</label><input className="admin-input" value={addonForm.description} onChange={(e) => setAddonForm({ ...addonForm, description: e.target.value })} /></div>
          </div>
        )}
      </Modal>
    </>
  );
}
