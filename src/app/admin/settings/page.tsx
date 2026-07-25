"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminAlert from "@/components/admin/AdminAlert";
import { api, SiteSetting, uploadUrl } from "@/lib/api";
import { getErrorMessage } from "@/lib/errors";
import { IMAGE_SETTING_KEYS, PAGE_SETTING_GROUPS } from "@/lib/pageContentFields";
import { SITE_SETTINGS_DEFAULTS } from "@/context/SiteSettingsContext";

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
    group: "contact_page",
    label: "Contact Page & Calendly",
    fields: [
      { key: "contact_hero_title", label: "Hero Title (before highlight)" },
      { key: "contact_hero_highlight", label: "Hero Highlight Text" },
      { key: "contact_hero_description", label: "Hero Description", type: "textarea" },
      { key: "contact_form_title", label: "Form Title" },
      { key: "contact_form_subtitle", label: "Form Subtitle", type: "textarea" },
      { key: "contact_form_button", label: "Form Submit Button Text" },
      { key: "contact_label_first_name", label: "First Name Label" },
      { key: "contact_label_last_name", label: "Last Name Label" },
      { key: "contact_label_email", label: "Email Label" },
      { key: "contact_label_subject", label: "Subject Label" },
      { key: "contact_label_message", label: "Message Label" },
      { key: "calendly_url", label: "Calendly Booking URL", hint: "e.g. https://calendly.com/your-name/30min" },
      { key: "calendly_title", label: "Book a Call Section Title" },
      { key: "calendly_description", label: "Book a Call Description", type: "textarea" },
      { key: "calendly_button_text", label: "Book a Call Button Text" },
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
  ...PAGE_SETTING_GROUPS,
];

const ALL_KEYS = SETTING_GROUPS.flatMap((g) => g.fields.map((f) => f.key));

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("error");
  const [loadError, setLoadError] = useState("");

  const load = () => {
    setLoadError("");
    api.settings.listAdmin().then((data) => {
      setSettings(data);
      const map: Record<string, string> = { ...SITE_SETTINGS_DEFAULTS };
      ALL_KEYS.forEach((key) => {
        if (!(key in map)) map[key] = "";
      });
      // Exact DB values win (including empty) so Save All doesn't rewrite defaults over clears
      data.forEach((s) => {
        map[s.key] = s.value ?? "";
      });
      setValues(map);
    }).catch((err) => setLoadError(getErrorMessage(err))).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    setSaving(true);
    setAlert("");
    setAlertType("error");
    try {
      const updates = Object.entries(values).map(([key, value]) => {
          const setting = settings.find((s) => s.key === key);
          const group = SETTING_GROUPS.find((g) => g.fields.some((f) => f.key === key))?.group || setting?.group || "general";
          return { key, value, group };
        });
      await api.settings.updateBulk(updates);
      setAlertType("success");
      setAlert("Settings saved successfully!");
      load();
      const { revalidatePublicSite } = await import("@/lib/revalidatePublic");
      void revalidatePublicSite();
    } catch (err) {
      setAlertType("error");
      setAlert(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (key: string, file: File) => {
    setUploading(key);
    setAlert("");
    setAlertType("error");
    try {
      const setting = await api.settings.uploadFile(key, file);
      setValues((prev) => ({ ...prev, [key]: setting.value }));
      setAlertType("success");
      setAlert("Image uploaded successfully!");
      load();
    } catch (err) {
      setAlertType("error");
      setAlert(getErrorMessage(err));
    } finally {
      setUploading(null);
    }
  };

  if (loading) return <div className="admin-loading"><div className="admin-spinner" /> Loading settings...</div>;

  return (
    <>
      <AdminHeader
        title="Site Settings"
        description="Update branding, contact info, page content, social links, images, and SEO."
        action={<button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save All Settings"}</button>}
      />

      {loadError && <AdminAlert message={loadError} onClose={() => setLoadError("")} />}
      {alert && <AdminAlert type={alertType} message={alert} onClose={() => setAlert("")} />}

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
                          if (file && IMAGE_SETTING_KEYS.has(field.key)) {
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
                      value={values[field.key] ?? ""}
                      onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    />
                  ) : (
                    <>
                      <input
                        className="admin-input"
                        value={values[field.key] ?? ""}
                        onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      />
                      {field.hint && <p className="admin-file-hint">{field.hint}</p>}
                    </>
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
