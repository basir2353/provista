"use client";

import { useGetStartedForm } from "@/hooks/usePageInteractivity";
import { useCmsData } from "@/hooks/useCmsData";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { api } from "@/lib/api";

export default function GetStartedContent() {
  const settings = useSiteSettings();
  const { data: plans, loading: plansLoading } = useCmsData(() => api.pricing.plans.list(), [], []);
  const { data: addons, loading: addonsLoading } = useCmsData(() => api.pricing.addons.list(), [], []);
  useGetStartedForm(!plansLoading && plans.length > 0);

  const defaultPlan = plans.find((p) => p.popular)?.slug || plans[1]?.slug || "professional";

  return (
    <>
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
                <div className="form-section-title"><div className="form-section-icon">📋</div>Choose Your Plan</div>
                <div className="plan-selector">
                  {plansLoading && <p style={{ color: "var(--gray-500)" }}>Loading plans...</p>}
                  {plans.map((plan) => (
                    <div
                      className={`plan-option ${plan.slug === defaultPlan ? "selected" : ""}`}
                      data-plan={plan.slug}
                      key={plan.id}
                    >
                      <div className="plan-radio"></div>
                      <div className="plan-info">
                        <div className="plan-info-name">{plan.name}</div>
                        <div className="plan-info-desc">{plan.description || `${plan.delivery} delivery · ${plan.revisions} revisions`}</div>
                      </div>
                      <div className="plan-info-price">${plan.price}</div>
                      {plan.popular && <span className="plan-popular-tag">Popular</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-section reveal">
                <div className="form-section-title"><div className="form-section-icon">👤</div>Your Information</div>
                <div className="form-row">
                  <div className="form-group"><label>First Name *</label><input type="text" name="firstName" placeholder="e.g. Sarah" /></div>
                  <div className="form-group"><label>Last Name *</label><input type="text" name="lastName" placeholder="e.g. Johnson" /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Email Address *</label><input type="email" name="email" placeholder="you@email.com" /></div>
                  <div className="form-group"><label>Phone Number</label><input type="tel" name="phone" placeholder="+1 (555) 000-0000" /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Industry / Field *</label>
                    <select name="industry">
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
                  <div className="form-group"><label>Career Level *</label>
                    <select name="experience">
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
                <div className="form-section-title"><div className="form-section-icon">🎯</div>Your Career Goals</div>
                <div className="form-group"><label>Target Job Title *</label><input type="text" name="targetRole" placeholder="e.g. Senior Product Manager, Software Engineer" /></div>
                <div className="form-group"><label>Target Companies (optional)</label><input type="text" name="targetCompanies" placeholder="e.g. Google, Amazon, McKinsey" /></div>
                <div className="form-group"><label>Key Achievements & Highlights</label><textarea name="achievements" placeholder="Share 3-5 key accomplishments from your career that you'd like highlighted (e.g. grew revenue by 40%, led team of 20, launched product used by 1M+ users)..."></textarea></div>
                <div className="form-group"><label>Anything specific you&apos;d like your writer to focus on?</label><textarea name="writerNotes" placeholder="e.g. Career change, employment gap, promotion to leadership, relocation..." style={{ minHeight: "80px" }}></textarea></div>
              </div>

              <div className="form-section reveal">
                <div className="form-section-title"><div className="form-section-icon">📎</div>Upload Existing Resume (Optional)</div>
                <div className="upload-area">
                  <div className="upload-icon">📄</div>
                  <div className="upload-text"><strong>Click to upload</strong> or drag & drop your current resume</div>
                  <div style={{ fontSize: "12px", color: "var(--gray-500)", marginTop: "6px" }}>Supports PDF, Word (.doc, .docx) · Max 10MB</div>
                  <input type="file" id="fileInput" style={{ display: "none" }} accept=".pdf,.doc,.docx" />
                </div>
                <div id="fileName" style={{ marginTop: "8px", fontSize: "13px", color: "var(--teal)", display: "none" }}></div>
              </div>

              <div className="form-section reveal">
                <div className="form-section-title"><div className="form-section-icon">⚡</div>Add-On Services</div>
                <div className="addons-list">
                  {addonsLoading && <p style={{ color: "var(--gray-500)" }}>Loading add-ons...</p>}
                  {addons.map((addon) => (
                    <label className="addon-check" key={addon.id}>
                      <input type="checkbox" data-addon={addon.price} />
                      <div className="addon-check-info"><div className="addon-check-name">{addon.name}</div></div>
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
                <div className="summary-plan-title" id="summaryPlanName">Professional</div>
                <div className="summary-plan-price" id="summaryPlanPrice">$199</div>
              </div>
              <div className="summary-items">
                <div className="summary-item"><span className="summary-item-label">Resume Rewrite</span><span className="summary-item-val">✓ Included</span></div>
                <div className="summary-item"><span className="summary-item-label">ATS Optimization</span><span className="summary-item-val">✓ Included</span></div>
                <div className="summary-item"><span className="summary-item-label">Cover Letter</span><span className="summary-item-val" id="coverLetterStatus">✓ Included</span></div>
                <div className="summary-item"><span className="summary-item-label">LinkedIn Profile</span><span className="summary-item-val" id="linkedinStatus">✓ Included</span></div>
                <div className="summary-item"><span className="summary-item-label">Delivery Time</span><span className="summary-item-val" id="deliveryTime">48 Hours</span></div>
                <div className="summary-item"><span className="summary-item-label">Revisions</span><span className="summary-item-val">Unlimited</span></div>
                <div className="summary-item total"><span className="summary-item-label" style={{ fontWeight: "700", color: "var(--navy)" }}>Total</span><span className="summary-item-val" id="totalPrice">$199</span></div>
              </div>
              <div className="trust-badges">
                <div className="trust-badge"><span className="trust-badge-icon">🛡️</span>30-Day Money-Back Guarantee</div>
                <div className="trust-badge"><span className="trust-badge-icon">🔒</span>Secure SSL Payment</div>
                <div className="trust-badge"><span className="trust-badge-icon">👤</span>Human-Written, Never AI</div>
                <div className="trust-badge"><span className="trust-badge-icon">⭐</span>4.9/5 from 12,000+ clients</div>
              </div>
              <button className="btn-submit">✦ Place My Order →</button>
              <div className="secure-note">🔒 Secured by SSL · No subscription</div>
              <div style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "var(--gray-500)" }}>Questions? <a href="/contact" style={{ color: "var(--teal)" }}>Chat with us</a></div>
            </div>
          </div>

          <div className="success-screen" id="successScreen">
            <div className="success-icon">🎉</div>
            <div className="success-title">Order Received!</div>
            <div className="success-desc">Thank you for choosing ProCareerVista. Your dedicated writer will reach out within 2 business hours to confirm your order and ask any clarifying questions.</div>
            <div className="next-steps">
              <div className="next-step-item"><div className="next-step-num">1</div><div className="next-step-text"><strong>Check your email</strong><span>Confirmation sent to your inbox with order details.</span></div></div>
              <div className="next-step-item"><div className="next-step-num">2</div><div className="next-step-text"><strong>Meet your writer</strong><span>We&apos;ll introduce you to your assigned specialist within 2 hours.</span></div></div>
              <div className="next-step-item"><div className="next-step-num">3</div><div className="next-step-text"><strong>Receive your resume</strong><span>Delivered to your email in Word & PDF within your chosen timeframe.</span></div></div>
            </div>
            <a href="/" className="btn btn-primary" style={{ marginTop: "32px" }}>← Back to Home</a>
          </div>
        </div>
      </div>
    </>
  );
}
