"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { api, SiteSetting, uploadUrl } from "@/lib/api";

type SettingField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "file";
  accept?: string;
  hint?: string;
};

const SETTING_GROUPS: { group: string; label: string; fields: SettingField[] }[] = [
  {
    group: "branding",
    label: "Branding & Logo",
    fields: [
      { key: "site_logo", label: "Site Logo", type: "file", accept: "image/*", hint: "Shown in header and footer. PNG, JPG, or WebP." },
      { key: "favicon", label: "Favicon", type: "file", accept: "image/*", hint: "Browser tab icon. Square image recommended." },
      { key: "site_name", label: "Site Name" },
      { key: "site_tagline", label: "Site Tagline", type: "textarea" },
    ],
  },
  {
    group: "contact",
    label: "Contact Information",
    fields: [
      { key: "contact_email", label: "Contact Email" },
      { key: "contact_phone", label: "Contact Phone" },
      { key: "contact_address", label: "Contact Address" },
      { key: "business_hours", label: "Business Hours" },
    ],
  },
  {
    group: "social",
    label: "Social Media",
    fields: [
      { key: "social_linkedin", label: "LinkedIn URL" },
      { key: "social_twitter", label: "Twitter / X URL" },
      { key: "social_instagram", label: "Instagram URL" },
      { key: "social_facebook", label: "Facebook URL" },
      { key: "social_youtube", label: "YouTube URL" },
    ],
  },
  {
    group: "seo",
    label: "SEO",
    fields: [
      { key: "meta_description", label: "Meta Description", type: "textarea" },
    ],
  },
];

const ALL_KEYS = SETTING_GROUPS.flatMap((g) => g.fields.map((f) => f.key));

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [alert, setAlert] = useState("");

  const load = () => {
    api.settings.listAdmin().then((data) => {
      setSettings(data);
      const map: Record<string, string> = {};
      ALL_KEYS.forEach((key) => { map[key] = ""; });
      data.forEach((s) => { map[s.key] = s.value; });
      setValues(map);
    }).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    setSaving(true);
    setAlert("");
    try {
      const updates = Object.entries(values).map(([key, value]) => {
          const setting = settings.find((s) => s.key === key);
          const group = SETTING_GROUPS.find((g) => g.fields.some((f) => f.key === key))?.group || setting?.group || "general";
          return { key, value, group };
        });
      await api.settings.updateBulk(updates);
      setAlert("Settings saved successfully!");
      load();
    } catch (err) {
      setAlert(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (key: "site_logo" | "favicon", file: File) => {
    setUploading(key);
    setAlert("");
    try {
      const setting = await api.settings.uploadFile(key, file);
      setValues((prev) => ({ ...prev, [key]: setting.value }));
      setAlert(`${key === "site_logo" ? "Logo" : "Favicon"} uploaded successfully!`);
      load();
    } catch (err) {
      setAlert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  };

  if (loading) return <div className="admin-loading"><div className="admin-spinner" /> Loading settings...</div>;

  return (
    <>
      <AdminHeader
        title="Site Settings"
        description="Update logo, favicon, site name, contact info, social links, and SEO settings."
        action={<button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save All Settings"}</button>}
      />

      {alert && <div className={`admin-alert ${alert.includes("success") || alert.includes("uploaded") ? "success" : "error"}`}>{alert}</div>}

      {SETTING_GROUPS.map(({ group, label, fields }) => (
        <div className="admin-card" key={group} style={{ marginBottom: 20 }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title">{label}</h2>
          </div>
          <div style={{ padding: 20 }}>
            <div className="admin-form-grid">
              {fields.map((field) => (
                <div className="admin-form-group" key={field.key}>
                  <label className="admin-label">{field.label}</label>
                  {field.type === "file" ? (
                    <div>
                      {values[field.key] && (
                        <div style={{ marginBottom: 10 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={uploadUrl(values[field.key])}
                            alt={field.label}
                            style={{ maxHeight: 64, maxWidth: 180, borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff", padding: 4 }}
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        className="admin-input"
                        accept={field.accept}
                        disabled={uploading === field.key}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file && (field.key === "site_logo" || field.key === "favicon")) {
                            void handleFileUpload(field.key, file);
                          }
                        }}
                      />
                      {field.hint && <p className="admin-file-hint">{field.hint}</p>}
                      {uploading === field.key && <p className="admin-file-hint">Uploading...</p>}
                    </div>
                  ) : field.type === "textarea" ? (
                    <textarea
                      className="admin-textarea"
                      value={values[field.key] || ""}
                      onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                    />
                  ) : (
                    <input
                      className="admin-input"
                      value={values[field.key] || ""}
                      onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                    />
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
