"use client";

import { useContactForm } from "@/hooks/usePageInteractivity";

export default function ContactContent() {
  useContactForm();

  return (
    <>
      <section className="page-hero">
        <div className="blob b1"></div><div className="blob b2"></div>
        <div className="container">
          <span className="section-label">Get In Touch</span>
          <h1>We're Here to <span>Help You</span></h1>
          <p>Have a question about our services? Ready to get started? Our team responds within 2 business hours.</p>
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
                  <a href="mailto:hello@procareervista.com" className="info-card-val">hello@procareervista.com</a>
                  <div className="info-card-sub">We reply within 2 business hours</div>
                </div>
                <div className="info-card reveal reveal-delay-1">
                  <div className="info-card-icon">💬</div>
                  <div className="info-card-title">Live Chat</div>
                  <a href="#" className="info-card-val">Start a live chat →</a>
                  <div className="info-card-sub">Available Mon–Fri, 9am–6pm EST</div>
                </div>
                <div className="info-card reveal reveal-delay-2">
                  <div className="info-card-icon">📞</div>
                  <div className="info-card-title">Phone / WhatsApp</div>
                  <a href="/tel:+15550000000" className="info-card-val">+1 (555) 000-0000</a>
                  <div className="info-card-sub">Mon–Fri, 9am–5pm EST</div>
                </div>
              </div>
              <div className="response-box reveal" style={{marginTop: "20px"}}>
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
              <div className="form-title">Send Us a Message</div>
              <div className="form-subtitle">Fill out the form and we'll get back to you shortly.</div>
              <div className="subject-chips">
                <button className="subject-chip active" >General Question</button>
                <button className="subject-chip" >Order Support</button>
                <button className="subject-chip" >Revision Request</button>
                <button className="subject-chip" >Partnership</button>
              </div>
              <div className="form-row">
                <div className="form-group"><label>First Name *</label><input type="text" placeholder="Your first name" /></div>
                <div className="form-group"><label>Last Name *</label><input type="text" placeholder="Your last name" /></div>
              </div>
              <div className="form-group"><label>Email Address *</label><input type="email" placeholder="you@email.com" /></div>
              <div className="form-group"><label>Subject</label><input type="text" placeholder="How can we help you?" /></div>
              <div className="form-group"><label>Message *</label><textarea placeholder="Tell us what's on your mind..."></textarea></div>
              <button className="btn-submit-contact" >✦ Send Message →</button>
              <div className="success-msg" id="successMsg">
                <div className="s-icon">✅</div>
                <strong>Message sent successfully!</strong>
                <span>We'll get back to you within 2 business hours.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
