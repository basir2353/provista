"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCmsData } from "@/hooks/useCmsData";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import CmsLoadState from "@/components/CmsLoadState";
import PageLoader from "@/components/PageLoader";
import { api, Addon, PricingPlan } from "@/lib/api";
import { isIncluded } from "@/lib/cms";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  industry: string;
  experience: string;
  targetRole: string;
  targetCompanies: string;
  achievements: string;
  writerNotes: string;
};

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  industry: "",
  experience: "",
  targetRole: "",
  targetCompanies: "",
  achievements: "",
  writerNotes: "",
};

function GetStartedForm({
  initialPlans,
  initialAddons,
}: {
  initialPlans?: PricingPlan[];
  initialAddons?: Addon[];
}) {
  const settings = useSiteSettings();
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const templateId = searchParams.get("template") || "";

  const { data: plans, loading: plansLoading, error: plansError, retry: retryPlans } =
    useCmsData(() => api.pricing.plans.list(), [], [], initialPlans);
  const { data: addons, loading: addonsLoading, error: addonsError, retry: retryAddons } =
    useCmsData(() => api.pricing.addons.list(), [], [], initialAddons);

  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [selectedAddonIds, setSelectedAddonIds] = useState<Set<string>>(new Set());
  const [form, setForm] = useState<FormState>(emptyForm);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initializedFromUrl = useRef(false);

  useEffect(() => {
    if (!plans.length || initializedFromUrl.current) return;
    const fromUrl = planParam && plans.some((p) => p.slug === planParam) ? planParam : null;
    const fallback =
      plans.find((p) => p.popular)?.slug || plans[0]?.slug || "professional";
    setSelectedSlug(fromUrl || fallback);
    initializedFromUrl.current = true;
  }, [plans, planParam]);

  useEffect(() => {
    if (!planParam || !plans.length) return;
    if (plans.some((p) => p.slug === planParam)) {
      setSelectedSlug(planParam);
    }
  }, [planParam, plans]);

  const selectedPlan: PricingPlan | undefined = useMemo(
    () => plans.find((p) => p.slug === selectedSlug) || plans.find((p) => p.popular) || plans[0],
    [plans, selectedSlug]
  );

  const selectedAddons: Addon[] = useMemo(
    () => addons.filter((a) => selectedAddonIds.has(a.id)),
    [addons, selectedAddonIds]
  );

  const addonTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const planPrice = selectedPlan?.price ?? 0;
  const total = planPrice + addonTotal;

  const updateField = (name: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = async () => {
    if (!selectedPlan) {
      alert("Please select a plan.");
      return;
    }
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      alert("Please fill in your first name, last name, and email.");
      return;
    }

    const noteParts = [
      form.targetCompanies ? `Target companies: ${form.targetCompanies}` : "",
      form.achievements ? `Achievements:\n${form.achievements}` : "",
      form.writerNotes ? `Writer notes:\n${form.writerNotes}` : "",
    ].filter(Boolean);

    const fd = new FormData();
    fd.append("planSlug", selectedPlan.slug);
    fd.append("planName", selectedPlan.name);
    fd.append("planPrice", String(selectedPlan.price));
    fd.append(
      "addons",
      JSON.stringify(selectedAddons.map((a) => ({ name: a.name, price: a.price })))
    );
    fd.append("firstName", form.firstName.trim());
    fd.append("lastName", form.lastName.trim());
    fd.append("email", form.email.trim());
    fd.append("phone", form.phone.trim());
    fd.append("industry", form.industry);
    fd.append("experience", form.experience);
    fd.append("targetRole", form.targetRole.trim());
    fd.append("notes", noteParts.join("\n\n"));
    if (templateId) {
      fd.append("templateId", templateId);
      fd.append("templateName", templateId);
    }
    if (resumeFile) fd.append("resume", resumeFile);

    setSubmitting(true);
    try {
      await api.orders.submit(fd);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      alert("Failed to submit order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="page-wrapper">
        <div className="container">
          <div className="success-screen" style={{ display: "block" }}>
            <div className="success-icon">🎉</div>
            <div className="success-title">Order Received!</div>
            <div className="success-desc">
              Thank you for choosing ProCareerVista. Your dedicated writer will reach out within 2 business hours to confirm your order and ask any clarifying questions.
            </div>
            <div className="next-steps">
              <div className="next-step-item">
                <div className="next-step-num">1</div>
                <div className="next-step-text">
                  <strong>Check your email</strong>
                  <span>Confirmation sent to your inbox with order details.</span>
                </div>
              </div>
              <div className="next-step-item">
                <div className="next-step-num">2</div>
                <div className="next-step-text">
                  <strong>Meet your writer</strong>
                  <span>We&apos;ll introduce you to your assigned specialist within 2 hours.</span>
                </div>
              </div>
              <div className="next-step-item">
                <div className="next-step-num">3</div>
                <div className="next-step-text">
                  <strong>Receive your resume</strong>
                  <span>Delivered to your email in Word & PDF within your chosen timeframe.</span>
                </div>
              </div>
            </div>
            <a href="/" className="btn btn-primary" style={{ marginTop: "32px" }}>
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="get-started-grid" id="mainContent">
          <div>
            <div className="steps-header">
              <span className="section-label">{settings.get_started_label}</span>
              <h1>
                {settings.get_started_title}{" "}
                <span>{settings.get_started_highlight}</span>
              </h1>
              <p>{settings.get_started_description}</p>
            </div>

            <div className="form-section reveal">
              <div className="form-section-title">
                <div className="form-section-icon">📋</div>Choose Your Plan
              </div>
              <div className="plan-selector">
                <CmsLoadState
                  loading={plansLoading}
                  error={plansError}
                  empty={!plansLoading && !plansError && plans.length === 0}
                  loadingLabel="Loading plans…"
                  emptyLabel="No plans available yet."
                  onRetry={retryPlans}
                  variant="list"
                  count={3}
                />
                {!plansLoading && !plansError && plans.map((plan) => (
                  <button
                    type="button"
                    className={`plan-option ${plan.slug === selectedPlan?.slug ? "selected" : ""}`}
                    data-plan={plan.slug}
                    key={plan.id}
                    onClick={() => setSelectedSlug(plan.slug)}
                  >
                    <div className="plan-radio"></div>
                    <div className="plan-info">
                      <div className="plan-info-name">{plan.name}</div>
                      <div className="plan-info-desc">
                        {plan.description || `${plan.delivery} delivery · ${plan.revisions} revisions`}
                      </div>
                    </div>
                    <div className="plan-info-price">${plan.price}</div>
                    {plan.popular && <span className="plan-popular-tag">Popular</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-section reveal">
              <div className="form-section-title">
                <div className="form-section-icon">👤</div>Your Information
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="e.g. Sarah"
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="e.g. Johnson"
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Industry / Field *</label>
                  <select
                    name="industry"
                    value={form.industry}
                    onChange={(e) => updateField("industry", e.target.value)}
                  >
                    <option value="">Select your industry...</option>
                    <option>Technology & IT</option>
                    <option>Finance & Banking</option>
                    <option>Healthcare & Medical</option>
                    <option>Engineering</option>
                    <option>Marketing & Sales</option>
                    <option>Legal</option>
                    <option>Education</option>
                    <option>Creative & Design</option>
                    <option>Executive / C-Suite</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Career Level *</label>
                  <select
                    name="experience"
                    value={form.experience}
                    onChange={(e) => updateField("experience", e.target.value)}
                  >
                    <option value="">Select level...</option>
                    <option>Entry Level / Graduate</option>
                    <option>Mid-Level (2-5 years)</option>
                    <option>Senior (5-10 years)</option>
                    <option>Executive / Director</option>
                    <option>C-Suite</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section reveal">
              <div className="form-section-title">
                <div className="form-section-icon">🎯</div>Your Career Goals
              </div>
              <div className="form-group">
                <label>Target Job Title *</label>
                <input
                  type="text"
                  name="targetRole"
                  placeholder="e.g. Senior Product Manager, Software Engineer"
                  value={form.targetRole}
                  onChange={(e) => updateField("targetRole", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Target Companies (optional)</label>
                <input
                  type="text"
                  name="targetCompanies"
                  placeholder="e.g. Google, Amazon, McKinsey"
                  value={form.targetCompanies}
                  onChange={(e) => updateField("targetCompanies", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Key Achievements & Highlights</label>
                <textarea
                  name="achievements"
                  placeholder="Share 3-5 key accomplishments from your career that you'd like highlighted..."
                  value={form.achievements}
                  onChange={(e) => updateField("achievements", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Anything specific you&apos;d like your writer to focus on?</label>
                <textarea
                  name="writerNotes"
                  placeholder="e.g. Career change, employment gap, promotion to leadership, relocation..."
                  style={{ minHeight: "80px" }}
                  value={form.writerNotes}
                  onChange={(e) => updateField("writerNotes", e.target.value)}
                />
              </div>
            </div>

            <div className="form-section reveal">
              <div className="form-section-title">
                <div className="form-section-icon">📎</div>Upload Existing Resume (Optional)
              </div>
              <div
                className="upload-area"
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                }}
              >
                <div className="upload-icon">📄</div>
                <div className="upload-text">
                  <strong>Click to upload</strong> or drag & drop your current resume
                </div>
                <div style={{ fontSize: "12px", color: "var(--gray-500)", marginTop: "6px" }}>
                  Supports PDF, Word (.doc, .docx) · Max 10MB
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                />
              </div>
              {resumeFile && (
                <div id="fileName" style={{ marginTop: "8px", fontSize: "13px", color: "var(--teal)" }}>
                  ✓ Uploaded: {resumeFile.name}
                </div>
              )}
            </div>

            <div className="form-section reveal">
              <div className="form-section-title">
                <div className="form-section-icon">⚡</div>Add-On Services
              </div>
              <div className="addons-list">
                <CmsLoadState
                  loading={addonsLoading}
                  error={addonsError}
                  empty={!addonsLoading && !addonsError && addons.length === 0}
                  loadingLabel="Loading add-ons…"
                  emptyLabel="No add-ons available yet."
                  onRetry={retryAddons}
                  variant="list"
                  count={3}
                />
                {!addonsLoading && !addonsError && addons.map((addon) => (
                  <label className="addon-check" key={addon.id}>
                    <input
                      type="checkbox"
                      checked={selectedAddonIds.has(addon.id)}
                      onChange={() => toggleAddon(addon.id)}
                    />
                    <div className="addon-check-info">
                      <div className="addon-check-name">{addon.name}</div>
                    </div>
                    <div className="addon-check-price">+${addon.price}</div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="order-summary reveal">
            <div className="summary-title">📝 Order Summary</div>
            <div className="summary-plan">
              <div className="summary-plan-name">Selected Plan</div>
              <div className="summary-plan-title" id="summaryPlanName">
                {selectedPlan?.name || "—"}
              </div>
              <div className="summary-plan-price" id="summaryPlanPrice">
                {selectedPlan ? `$${selectedPlan.price}` : "—"}
              </div>
            </div>
            <div className="summary-items">
              <div className="summary-item">
                <span className="summary-item-label">Resume Rewrite</span>
                <span className="summary-item-val">✓ Included</span>
              </div>
              <div className="summary-item">
                <span className="summary-item-label">ATS Optimization</span>
                <span className="summary-item-val">✓ Included</span>
              </div>
              <div className="summary-item">
                <span className="summary-item-label">Cover Letter</span>
                <span className="summary-item-val" id="coverLetterStatus">
                  {isIncluded(selectedPlan?.coverLetter)
                    ? "✓ Included"
                    : selectedPlan?.coverLetter || "Add-on"}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-item-label">LinkedIn Profile</span>
                <span className="summary-item-val" id="linkedinStatus">
                  {isIncluded(selectedPlan?.linkedin)
                    ? "✓ Included"
                    : selectedPlan?.linkedin || "Add-on"}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-item-label">Delivery Time</span>
                <span className="summary-item-val" id="deliveryTime">
                  {selectedPlan?.delivery || "—"}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-item-label">Revisions</span>
                <span className="summary-item-val">
                  {selectedPlan?.revisions || "—"}
                </span>
              </div>
              {selectedAddons.map((addon) => (
                <div className="summary-item" key={addon.id}>
                  <span className="summary-item-label">{addon.name}</span>
                  <span className="summary-item-val">+${addon.price}</span>
                </div>
              ))}
              <div className="summary-item total">
                <span className="summary-item-label" style={{ fontWeight: "700", color: "var(--navy)" }}>
                  Total
                </span>
                <span className="summary-item-val" id="totalPrice">
                  ${total}
                </span>
              </div>
            </div>
            <div className="trust-badges">
              <div className="trust-badge">
                <span className="trust-badge-icon">🛡️</span>30-Day Money-Back Guarantee
              </div>
              <div className="trust-badge">
                <span className="trust-badge-icon">🔒</span>Secure SSL Payment
              </div>
              <div className="trust-badge">
                <span className="trust-badge-icon">👤</span>Human-Written, Never AI
              </div>
              <div className="trust-badge">
                <span className="trust-badge-icon">⭐</span>4.9/5 from 12,000+ clients
              </div>
            </div>
            <button
              type="button"
              className="btn-submit"
              onClick={handleSubmit}
              disabled={submitting || !selectedPlan}
            >
              {submitting ? "Submitting..." : "✦ Place My Order →"}
            </button>
            <div className="secure-note">🔒 Secured by SSL · No subscription</div>
            <div style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "var(--gray-500)" }}>
              Questions? <a href="/contact" style={{ color: "var(--teal)" }}>Chat with us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GetStartedContent({
  initialPlans,
  initialAddons,
}: {
  initialPlans?: PricingPlan[];
  initialAddons?: Addon[];
} = {}) {
  return (
    <Suspense fallback={<div className="page-wrapper"><div className="container" style={{ padding: "40px 0" }}><PageLoader label="Loading…" variant="spinner" /></div></div>}>
      <GetStartedForm initialPlans={initialPlans} initialAddons={initialAddons} />
    </Suspense>
  );
}
