"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Modal from "@/components/admin/Modal";
import { api, PricingPlan, Addon } from "@/lib/api";
import { isIncluded, parseJsonArray } from "@/lib/cms";

type PlanFormState = {
  slug: string;
  name: string;
  price: string;
  bundlePrice: string;
  description: string;
  delivery: string;
  revisions: string;
  coverLetter: string;
  linkedin: string;
  features: string[];
  popular: boolean;
  active: boolean;
};

const emptyPlanForm = (): PlanFormState => ({
  slug: "",
  name: "",
  price: "",
  bundlePrice: "",
  description: "",
  delivery: "48 Hours",
  revisions: "Unlimited",
  coverLetter: "✓ Included",
  linkedin: "✓ Included",
  features: [
    "Professional Resume Rewrite",
    "ATS Optimization",
    "48 Hours Delivery",
    "Unlimited Revisions",
    "Cover Letter",
    "LinkedIn Optimization",
  ],
  popular: false,
  active: true,
});

function planFeaturesForForm(plan: PricingPlan): string[] {
  const saved = parseJsonArray<string>(plan.features);
  if (saved.length) return saved;

  const items = [
    "Professional Resume Rewrite",
    "ATS Optimization",
    `${plan.delivery} Delivery`,
    `${plan.revisions} Revisions`,
  ];
  if (isIncluded(plan.coverLetter)) items.push("Cover Letter");
  else items.push("✗ Cover Letter");
  if (isIncluded(plan.linkedin)) items.push("LinkedIn Optimization");
  else items.push("✗ LinkedIn Optimization");
  return items;
}

function planFormFromPlan(plan: PricingPlan): PlanFormState {
  return {
    slug: plan.slug,
    name: plan.name,
    price: String(plan.price),
    bundlePrice: plan.bundlePrice ? String(plan.bundlePrice) : "",
    description: plan.description || "",
    delivery: plan.delivery,
    revisions: plan.revisions,
    coverLetter: plan.coverLetter,
    linkedin: plan.linkedin,
    features: planFeaturesForForm(plan),
    popular: plan.popular,
    active: plan.active,
  };
}

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"plans" | "addons">("plans");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [editingAddon, setEditingAddon] = useState<Addon | null>(null);
  const [planForm, setPlanForm] = useState<PlanFormState>(emptyPlanForm());
  const [addonForm, setAddonForm] = useState({ slug: "", name: "", price: "", description: "", active: true });

  const load = async () => {
    const [p, a] = await Promise.all([api.pricing.plans.listAdmin(), api.pricing.addons.listAdmin()]);
    setPlans(p);
    setAddons(a);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateFeature = (index: number, value: string) => {
    setPlanForm((prev) => ({
      ...prev,
      features: prev.features.map((item, i) => (i === index ? value : item)),
    }));
  };

  const addFeature = () => {
    setPlanForm((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index: number) => {
    setPlanForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const toggleFeatureIncluded = (index: number) => {
    setPlanForm((prev) => {
      const features = [...prev.features];
      const current = features[index] || "";
      const label = current.replace(/^[✗✓]\s*/, "").trim();
      const excluded = current.startsWith("✗");
      features[index] = excluded ? label : `✗ ${label}`;
      return { ...prev, features };
    });
  };

  const savePlan = async () => {
    try {
      const cleanedFeatures = planForm.features.map((f) => f.trim()).filter(Boolean);
      const data = {
        slug: planForm.slug,
        name: planForm.name,
        price: parseFloat(planForm.price),
        bundlePrice: planForm.bundlePrice ? parseFloat(planForm.bundlePrice) : undefined,
        description: planForm.description || undefined,
        delivery: planForm.delivery,
        revisions: planForm.revisions,
        coverLetter: planForm.coverLetter,
        linkedin: planForm.linkedin,
        features: JSON.stringify(cleanedFeatures),
        popular: planForm.popular,
        active: planForm.active,
      };
      if (editingPlan) await api.pricing.plans.update(editingPlan.id, data);
      else await api.pricing.plans.create(data);
      setModalOpen(false);
      await load();
      const { revalidatePublicSite } = await import("@/lib/revalidatePublic");
      void revalidatePublicSite(["/", "/pricing", "/get-started"]);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save plan");
    }
  };

  const deletePlan = async (id: string, name: string) => {
    if (!confirm(`Delete plan "${name}"? This cannot be undone.`)) return;
    await api.pricing.plans.delete(id);
    load();
  };

  const saveAddon = async () => {
    const data = { ...addonForm, price: parseFloat(addonForm.price) };
    if (editingAddon) await api.pricing.addons.update(editingAddon.id, data);
    else await api.pricing.addons.create(data);
    setModalOpen(false);
    load();
  };

  const deleteAddon = async (id: string, name: string) => {
    if (!confirm(`Delete add-on "${name}"? This cannot be undone.`)) return;
    await api.pricing.addons.delete(id);
    load();
  };

  const openNewPlan = () => {
    setEditingPlan(null);
    setPlanForm(emptyPlanForm());
    setModalOpen(true);
  };

  const openEditPlan = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setPlanForm(planFormFromPlan(plan));
    setModalOpen(true);
  };

  return (
    <>
      <AdminHeader title="Pricing" description="Manage pricing plans, package features, and add-on services." />
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <button className={`admin-btn admin-btn-sm ${tab === "plans" ? "admin-btn-primary" : "admin-btn-secondary"}`} onClick={() => setTab("plans")}>
          Plans ({plans.length})
        </button>
        <button className={`admin-btn admin-btn-sm ${tab === "addons" ? "admin-btn-primary" : "admin-btn-secondary"}`} onClick={() => setTab("addons")}>
          Add-ons ({addons.length})
        </button>
        <button
          className="admin-btn admin-btn-primary admin-btn-sm"
          style={{ marginLeft: "auto" }}
          onClick={() => {
            if (tab === "plans") openNewPlan();
            else {
              setEditingAddon(null);
              setAddonForm({ slug: "", name: "", price: "", description: "", active: true });
              setModalOpen(true);
            }
          }}
        >
          + Add {tab === "plans" ? "Plan" : "Add-on"}
        </button>
      </div>

      <div className="admin-card">
        {loading ? (
          <div className="admin-loading"><div className="admin-spinner" /></div>
        ) : tab === "plans" ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Price</th>
                <th>Features</th>
                <th>Delivery</th>
                <th>Popular</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => {
                const featureCount = parseJsonArray<string>(p.features).length || 6;
                return (
                  <tr key={p.id}>
                    <td>
                      <strong>{p.name}</strong>
                      <span style={{ color: "#94a3b8", fontSize: 12, display: "block" }}>({p.slug})</span>
                    </td>
                    <td>${p.price}{p.bundlePrice ? ` / $${p.bundlePrice} bundle` : ""}</td>
                    <td style={{ fontSize: 13, color: "#64748b" }}>{featureCount} items</td>
                    <td>{p.delivery}</td>
                    <td>{p.popular ? <span className="admin-badge purple">Popular</span> : "—"}</td>
                    <td style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => openEditPlan(p)}>Edit</button>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => deletePlan(p.id, p.name)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
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
                  <td style={{ display: "flex", gap: 8 }}>
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => {
                      setEditingAddon(a);
                      setAddonForm({ slug: a.slug, name: a.name, price: String(a.price), description: a.description || "", active: a.active });
                      setModalOpen(true);
                    }}>Edit</button>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => deleteAddon(a.id, a.name)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        title={tab === "plans" ? (editingPlan ? "Edit Plan" : "Add Plan") : (editingAddon ? "Edit Add-on" : "Add Add-on")}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <button className="admin-btn admin-btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="admin-btn admin-btn-primary" onClick={tab === "plans" ? savePlan : saveAddon}>Save</button>
          </>
        }
      >
        {tab === "plans" ? (
          <div className="admin-form-grid">
            <div className="admin-form-group"><label className="admin-label">Slug</label><input className="admin-input" value={planForm.slug} onChange={(e) => setPlanForm({ ...planForm, slug: e.target.value })} placeholder="professional" /></div>
            <div className="admin-form-group"><label className="admin-label">Package Name</label><input className="admin-input" value={planForm.name} onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })} placeholder="Executive" /></div>
            <div className="admin-form-group"><label className="admin-label">Price ($)</label><input className="admin-input" type="number" value={planForm.price} onChange={(e) => setPlanForm({ ...planForm, price: e.target.value })} /></div>
            <div className="admin-form-group"><label className="admin-label">Bundle Price ($)</label><input className="admin-input" type="number" value={planForm.bundlePrice} onChange={(e) => setPlanForm({ ...planForm, bundlePrice: e.target.value })} placeholder="Optional" /></div>
            <div className="admin-form-group full"><label className="admin-label">Package Description</label><textarea className="admin-textarea" value={planForm.description} onChange={(e) => setPlanForm({ ...planForm, description: e.target.value })} placeholder="Short description shown on the pricing card..." rows={3} /></div>
            <div className="admin-form-group"><label className="admin-label">Delivery</label><input className="admin-input" value={planForm.delivery} onChange={(e) => setPlanForm({ ...planForm, delivery: e.target.value })} /></div>
            <div className="admin-form-group"><label className="admin-label">Revisions</label><input className="admin-input" value={planForm.revisions} onChange={(e) => setPlanForm({ ...planForm, revisions: e.target.value })} /></div>
            <div className="admin-form-group"><label className="admin-checkbox-row"><input type="checkbox" checked={planForm.popular} onChange={(e) => setPlanForm({ ...planForm, popular: e.target.checked })} /> Most Popular</label></div>
            <div className="admin-form-group"><label className="admin-checkbox-row"><input type="checkbox" checked={planForm.active} onChange={(e) => setPlanForm({ ...planForm, active: e.target.checked })} /> Active</label></div>

            <div className="admin-form-group full">
              <label className="admin-label">Package Features</label>
              <p className="admin-file-hint" style={{ marginBottom: 12 }}>
                Add what is included in this package. These show on the pricing page with checkmarks. Use &quot;Not included&quot; for items excluded from this plan.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {planForm.features.map((feature, index) => {
                  const excluded = feature.startsWith("✗");
                  const label = feature.replace(/^[✗✓]\s*/, "");
                  return (
                    <div key={index} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input
                        className="admin-input"
                        style={{ flex: 1 }}
                        value={label}
                        onChange={(e) => {
                          const next = e.target.value.trim();
                          updateFeature(index, excluded ? `✗ ${next}` : next);
                        }}
                        placeholder="e.g. Professional Resume Rewrite"
                      />
                      <label className="admin-checkbox-row" style={{ whiteSpace: "nowrap", fontSize: 12 }}>
                        <input type="checkbox" checked={!excluded} onChange={() => toggleFeatureIncluded(index)} />
                        Included
                      </label>
                      <button type="button" className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => removeFeature(index)}>Remove</button>
                    </div>
                  );
                })}
              </div>
              <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" style={{ marginTop: 10 }} onClick={addFeature}>
                + Add Feature
              </button>
            </div>
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
