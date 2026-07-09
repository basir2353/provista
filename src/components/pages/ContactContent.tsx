"use client";

import CalendlyEmbed from "@/components/CalendlyEmbed";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { useContactForm } from "@/hooks/usePageInteractivity";

export default function ContactContent() {
  const settings = useSiteSettings();
  useContactForm();

  const email = settings.contact_email || "hello@procareervista.com";
  const phone = settings.contact_phone || "+1 (555) 123-4567";
  const hours = settings.business_hours || "Mon–Fri, 9am–6pm EST";
  const calendlyUrl = settings.calendly_url?.trim() || "";

  return (
    <>
      <section className="page-hero">
        <div className="blob b1"></div><div className="blob b2"></div>
        <div className="container">
          <span className="section-label">Get In Touch</span>
          <h1>
            {settings.contact_hero_title || "We're Here to"}{" "}
            <span>{settings.contact_hero_highlight || "Help You"}</span>
          </h1>
          <p>{settings.contact_hero_description}</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="contact-info-cards">
                <div className="info-card reveal">
                  <div className="info-card-icon">📧</div>
                  <div className="info-card-title">Email Us</div>
                  <a href={`mailto:${email}`} className="info-card-val">{email}</a>
                  <div className="info-card-sub">We reply within 2 business hours</div>
                </div>
                {calendlyUrl && (
                  <div className="info-card reveal reveal-delay-1">
                    <div className="info-card-icon">📅</div>
                    <div className="info-card-title">Book a Call</div>
                    <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="info-card-val">
                      {settings.calendly_button_text || "Schedule on Calendly →"}
                    </a>
                    <div className="info-card-sub">Free 30-minute consultation</div>
                  </div>
                )}
                <div className={`info-card reveal ${calendlyUrl ? "reveal-delay-2" : "reveal-delay-1"}`}>
                  <div className="info-card-icon">📞</div>
                  <div className="info-card-title">Phone / WhatsApp</div>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="info-card-val">{phone}</a>
                  <div className="info-card-sub">{hours}</div>
                </div>
              </div>
              <div className="response-box reveal" style={{ marginTop: "20px" }}>
                <div className="response-box-title">⚡ Our Response Times</div>
                <div className="response-items">
                  <div className="response-item"><span className="response-item-label">General Inquiries</span><span className="response-item-val">Within 2 hrs</span></div>
                  <div className="response-item"><span className="response-item-label">Order Support</span><span className="response-item-val">Within 1 hr</span></div>
                  <div className="response-item"><span className="response-item-label">Revision Requests</span><span className="response-item-val">Within 24 hrs</span></div>
                  <div className="response-item"><span className="response-item-label">Rush Orders</span><span className="response-item-val">Immediate</span></div>
                </div>
              </div>
            </div>

            <div className="contact-form-card reveal">
              <div className="form-title">{settings.contact_form_title}</div>
              <div className="form-subtitle">{settings.contact_form_subtitle}</div>
              <div className="subject-chips">
                <button className="subject-chip active" type="button">General Question</button>
                <button className="subject-chip" type="button">Order Support</button>
                <button className="subject-chip" type="button">Revision Request</button>
                <button className="subject-chip" type="button">Partnership</button>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{settings.contact_label_first_name}</label>
                  <input type="text" placeholder="Your first name" />
                </div>
                <div className="form-group">
                  <label>{settings.contact_label_last_name}</label>
                  <input type="text" placeholder="Your last name" />
                </div>
              </div>
              <div className="form-group">
                <label>{settings.contact_label_email}</label>
                <input type="email" placeholder="you@email.com" />
              </div>
              <div className="form-group">
                <label>{settings.contact_label_subject}</label>
                <input type="text" placeholder="How can we help you?" />
              </div>
              <div className="form-group">
                <label>{settings.contact_label_message}</label>
                <textarea placeholder="Tell us what's on your mind..."></textarea>
              </div>
              <button className="btn-submit-contact" type="button">{settings.contact_form_button}</button>
              <div className="success-msg" id="successMsg">
                <div className="s-icon">✅</div>
                <strong>Message sent successfully!</strong>
                <span>We&apos;ll get back to you within 2 business hours.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {calendlyUrl && (
        <section className="calendly-section">
          <div className="container">
            <div className="calendly-section-header reveal">
              <span className="section-label">Schedule a Call</span>
              <h2 className="section-title">{settings.calendly_title}</h2>
              <p className="section-sub">{settings.calendly_description}</p>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary calendly-fallback-btn"
              >
                {settings.calendly_button_text}
              </a>
            </div>
            <div className="calendly-embed-wrap reveal">
              <CalendlyEmbed url={calendlyUrl} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
