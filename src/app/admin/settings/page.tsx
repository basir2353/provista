"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { api, SiteSetting } from "@/lib/api";

const SETTING_GROUPS = [
  { group: "general", label: "General", keys: ["site_name", "site_tagline"] },
  { group: "contact", label: "Contact Information", keys: ["contact_email", "contact_phone", "contact_address", "business_hours"] },
  { group: "social", label: "Social Media", keys: ["social_linkedin", "social_twitter", "social_instagram"] },
  { group: "seo", label: "SEO", keys: ["meta_description"] },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    api.settings.listAdmin().then((data) => {
      setSettings(data);
      const map: Record<string, string> = {};
      data.forEach((s) => { map[s.key] = s.value; });
      setValues(map);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setAlert("");
    try {
      const updates = Object.entries(values).map(([key, value]) => {
        const setting = settings.find((s) => s.key === key);
        return { key, value, group: setting?.group || "general" };
      });
      await api.settings.updateBulk(updates);
      setAlert("Settings saved successfully!");
    } catch (err) {
      setAlert(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const labelFor = (key: string) => key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  if (loading) return <div className="admin-loading"><div className="admin-spinner" /> Loading settings...</div>;

  return (
    <>
      <AdminHeader
        title="Site Settings"
        description="Configure site-wide settings — contact information, social media links, SEO metadata, and branding."
        action={<button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save All Settings"}</button>}
      />

      {alert && <div className={`admin-alert ${alert.includes("success") ? "success" : "error"}`}>{alert}</div>}

      {SETTING_GROUPS.map(({ group, label, keys }) => (
        <div className="admin-card" key={group} style={{ marginBottom: 20 }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title">{label}</h2>
          </div>
          <div style={{ padding: 20 }}>
            <div className="admin-form-grid">
              {keys.map((key) => (
                <div className="admin-form-group" key={key}>
                  <label className="admin-label">{labelFor(key)}</label>
                  {key === "meta_description" ? (
                    <textarea className="admin-textarea" value={values[key] || ""} onChange={(e) => setValues({ ...values, [key]: e.target.value })} />
                  ) : (
                    <input className="admin-input" value={values[key] || ""} onChange={(e) => setValues({ ...values, [key]: e.target.value })} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
