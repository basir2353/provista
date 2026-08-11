"use client";

import { FormEvent, useState } from "react";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { api } from "@/lib/api";

type IntakeForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  industry: string;
  experience: string;
  targetRole: string;
  goals: string;
};

const emptyForm: IntakeForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  industry: "",
  experience: "",
  targetRole: "",
  goals: "",
};

export default function FreeConsultationContent() {
  const settings = useSiteSettings();
  const calendlyUrl = settings.calendly_url?.trim() || "";
  const [form, setForm] = useState<IntakeForm>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof IntakeForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setError("Please fill in your first name, last name, and email.");
      return;
    }

    const name = `${form.firstName.trim()} ${form.lastName.trim()}`;
    const notes = [
      form.industry ? `Industry: ${form.industry}` : "",
      form.experience ? `Career level: ${form.experience}` : "",
      form.targetRole ? `Target role: ${form.targetRole}` : "",
      form.goals ? `Goals:\n${form.goals}` : "",
      "Source: Free Consultation intake",
    ]
      .filter(Boolean)
      .join("\n");

    setSubmitting(true);
    try {
      await api.bookCalls.submit({
        name,
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        eventName: "Free Consultation Intake",
        notes,
        status: "new",
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="container">
          <span className="section-label">Free Consultation</span>
          <h1>
            Book a <span>Free Career Call</span>
          </h1>
          <p>
            Tell us a bit about your goals first, then pick a time that works for you.
            No pressure, no obligation.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container" style={{ maxWidth: 820 }}>
          {!submitted ? (
            <form className="contact-form-card reveal" onSubmit={handleSubmit}>
              <div className="form-title">Step 1 — Your Information</div>
              <div className="form-subtitle">
                We use this so your consultant can prepare before the call.
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    placeholder="e.g. Sarah"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    placeholder="e.g. Johnson"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@email.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Industry / Field</label>
                  <select
                    value={form.industry}
                    onChange={(e) => update("industry", e.target.value)}
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
                  <label>Career Level</label>
                  <select
                    value={form.experience}
                    onChange={(e) => update("experience", e.target.value)}
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

              <div className="form-group">
                <label>Target Job Title</label>
                <input
                  type="text"
                  value={form.targetRole}
                  onChange={(e) => update("targetRole", e.target.value)}
                  placeholder="e.g. Senior Product Manager"
                />
              </div>

              <div className="form-group">
                <label>What would you like to discuss?</label>
                <textarea
                  value={form.goals}
                  onChange={(e) => update("goals", e.target.value)}
                  placeholder="Career change, resume feedback, LinkedIn strategy, interview prep..."
                  style={{ minHeight: 100 }}
                />
              </div>

              {error && (
                <p style={{ color: "#c0392b", marginBottom: 12, fontSize: 14 }}>{error}</p>
              )}

              <button type="submit" className="btn-submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Continue to Schedule →"}
              </button>
            </form>
          ) : (
            <div className="contact-form-card reveal">
              <div className="form-title">Step 2 — Pick a Time</div>
              <div className="form-subtitle">
                Thanks {form.firstName}! Choose a consultation slot below.
              </div>

              {calendlyUrl ? (
                <div style={{ marginTop: 16 }}>
                  <CalendlyEmbed
                    url={calendlyUrl}
                    height={720}
                    prefill={{
                      name: `${form.firstName} ${form.lastName}`.trim(),
                      email: form.email,
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    padding: "28px 20px",
                    background: "var(--mint, #e8f8f5)",
                    borderRadius: 12,
                    color: "var(--navy)",
                    lineHeight: 1.6,
                  }}
                >
                  <strong>We received your details.</strong>
                  <p style={{ marginTop: 8, marginBottom: 0 }}>
                    Our team will email you shortly to schedule your free consultation.
                    You can also reach us anytime via the{" "}
                    <a href="/contact" style={{ color: "var(--teal)" }}>Contact</a> page.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
