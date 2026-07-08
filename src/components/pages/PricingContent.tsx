"use client";

import { usePricingToggle } from "@/hooks/usePageInteractivity";

export default function PricingContent() {
  usePricingToggle();

  return (
    <>
      <section className="page-hero">
        <div className="blob b1"></div><div className="blob b2"></div>
        <div className="container">
          <span className="section-label">Transparent Pricing</span>
          <h1>Simple Pricing, <span>Big Results</span></h1>
          <p>One-time payment. No subscriptions. Unlimited revisions until you're 100% satisfied. 30-day money-back guarantee.</p>
        </div>
      </section>
      
      <div className="toggle-bar">
        <div className="toggle-wrap">
          <span className="toggle-label">One-Time</span>
          <label className="toggle-switch">
            <input type="checkbox" id="billingToggle"  />
            <div className="toggle-track"></div>
            <div className="toggle-thumb"></div>
          </label>
          <span className="toggle-label">Bundle & Save</span>
          <span className="save-badge">Save 20%</span>
        </div>
      </div>
      
      <section className="pricing-section">
        <div className="container">
          <div className="pricing-grid">
            <div className="pricing-card reveal">
              <div className="plan-name">Starter</div>
              <div className="plan-price"><span className="price-currency">$</span><span className="price-val">99</span></div>
              <div className="plan-period">one-time · no subscription</div>
              <div className="plan-desc">Perfect for entry-level professionals and recent graduates entering the job market for the first time.</div>
              <div className="plan-divider"></div>
              <ul className="plan-features">
                <li><span className="check">✓</span>Professional Resume Rewrite</li>
                <li><span className="check">✓</span>ATS Optimization & Keyword Tuning</li>
                <li><span className="check">✓</span>2 Template Choices</li>
                <li><span className="check">✓</span>3 Rounds of Revisions</li>
                <li><span className="check">✓</span>72-Hour Delivery</li>
                <li><span className="check">✓</span>Word & PDF Formats</li>
                <li><span className="cross">✗</span><span style={{color: "var(--gray-300)"}}>Cover Letter</span></li>
                <li><span className="cross">✗</span><span style={{color: "var(--gray-300)"}}>LinkedIn Optimization</span></li>
              </ul>
              <a href="/get-started?plan=starter" className="btn btn-plan btn-dark">Get Started — $99</a>
              <p className="plan-guarantee">🛡️ 30-day money-back guarantee</p>
            </div>
      
            <div className="pricing-card featured reveal reveal-delay-1">
              <div className="popular-badge">⭐ Most Popular</div>
              <div className="plan-name">Professional</div>
              <div className="plan-price"><span className="price-currency">$</span><span className="price-val">199</span></div>
              <div className="plan-period">one-time · no subscription</div>
              <div className="plan-desc">For mid-career professionals targeting roles at top companies and aiming for higher salary brackets.</div>
              <div className="plan-divider"></div>
              <ul className="plan-features">
                <li><span className="check">✓</span>Expert Resume + Cover Letter</li>
                <li><span className="check">✓</span>LinkedIn Profile Optimization</li>
                <li><span className="check">✓</span>All 9 Premium Templates</li>
                <li><span className="check">✓</span>Unlimited Revisions</li>
                <li><span className="check">✓</span>48-Hour Express Delivery</li>
                <li><span className="check">✓</span>Interview Coaching Guide</li>
                <li><span className="check">✓</span>60-Day Job Search Support</li>
                <li><span className="check">✓</span>ATS Score Report Included</li>
              </ul>
              <a href="/get-started?plan=professional" className="btn btn-plan btn-featured">Get Started — $199</a>
              <p className="plan-guarantee" style={{color: "rgba(255,255,255,0.4)"}}>🛡️ 30-day money-back guarantee</p>
            </div>
      
            <div className="pricing-card reveal reveal-delay-2">
              <div className="plan-name">Executive</div>
              <div className="plan-price"><span className="price-currency">$</span><span className="price-val">349</span></div>
              <div className="plan-period">one-time · no subscription</div>
              <div className="plan-desc">For senior leaders, C-suite executives, and professionals targeting six-figure compensation packages.</div>
              <div className="plan-divider"></div>
              <ul className="plan-features">
                <li><span className="check">✓</span>Executive Resume + Bio</li>
                <li><span className="check">✓</span>Full LinkedIn Makeover</li>
                <li><span className="check">✓</span>Board Resume & Cover Letter</li>
                <li><span className="check">✓</span>Unlimited Revisions</li>
                <li><span className="check">✓</span>24-Hour Rush Delivery</li>
                <li><span className="check">✓</span>1:1 Strategy Call (30 min)</li>
                <li><span className="check">✓</span>90-Day Priority Support</li>
                <li><span className="check">✓</span>Career Branding Package</li>
              </ul>
              <a href="/get-started?plan=executive" className="btn btn-plan btn-dark">Get Started — $349</a>
              <p className="plan-guarantee">🛡️ 30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>
      
      
      <section className="addons-section">
        <div className="container">
          <div style={{textAlign: "center", maxWidth: "560px", margin: "0 auto"}}>
            <span className="section-label">Optional Add-Ons</span>
            <h2 style={{fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: "700", color: "var(--navy)"}}>Enhance Your <span style={{color: "var(--teal)"}}>Package</span></h2>
            <p style={{color: "var(--gray-500)", marginTop: "12px", fontSize: "15px", lineHeight: "1.7"}}>Add any of these services to any plan at checkout.</p>
          </div>
          <div className="addons-grid">
            <div className="addon-card reveal"><div className="addon-icon">💼</div><div className="addon-name">Cover Letter</div><div className="addon-desc">Tailored cover letter matched to your target role and company culture.</div><div className="addon-price">+$49</div></div>
            <div className="addon-card reveal reveal-delay-1"><div className="addon-icon">🔗</div><div className="addon-name">LinkedIn Optimization</div><div className="addon-desc">Full profile overhaul — headline, summary, skills, and experience sections.</div><div className="addon-price">+$79</div></div>
            <div className="addon-card reveal reveal-delay-2"><div className="addon-icon">⚡</div><div className="addon-name">24-Hour Rush Delivery</div><div className="addon-desc">Need it fast? Get your completed resume within 24 business hours.</div><div className="addon-price">+$59</div></div>
            <div className="addon-card reveal"><div className="addon-icon">🎯</div><div className="addon-name">Interview Coaching</div><div className="addon-desc">60-minute 1:1 session with a career coach to prep for your interviews.</div><div className="addon-price">+$129</div></div>
            <div className="addon-card reveal reveal-delay-1"><div className="addon-icon">📋</div><div className="addon-name">Thank You Letter</div><div className="addon-desc">Professional post-interview thank you letter template personalized for you.</div><div className="addon-price">+$29</div></div>
            <div className="addon-card reveal reveal-delay-2"><div className="addon-icon">📊</div><div className="addon-name">ATS Score Report</div><div className="addon-desc">Detailed ATS analysis report with keyword gap analysis for your target roles.</div><div className="addon-price">+$39</div></div>
          </div>
        </div>
      </section>
      
      
      <section className="compare-section">
        <div className="container">
          <div style={{textAlign: "center", maxWidth: "560px", margin: "0 auto 0"}}>
            <span className="section-label">Compare Plans</span>
            <h2 style={{fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: "700", color: "var(--navy)"}}>Find the Right <span style={{color: "var(--teal)"}}>Fit</span></h2>
          </div>
          <table className="compare-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Starter $99</th>
                <th className="highlight-col">Professional $199</th>
                <th>Executive $349</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Resume Rewrite</td><td><span className="tick">✓</span></td><td className="highlight-col"><span className="tick">✓</span></td><td><span className="tick">✓</span></td></tr>
              <tr><td>ATS Optimization</td><td><span className="tick">✓</span></td><td className="highlight-col"><span className="tick">✓</span></td><td><span className="tick">✓</span></td></tr>
              <tr><td>Cover Letter</td><td><span className="cross-mark">—</span></td><td className="highlight-col"><span className="tick">✓</span></td><td><span className="tick">✓</span></td></tr>
              <tr><td>LinkedIn Optimization</td><td><span className="cross-mark">—</span></td><td className="highlight-col"><span className="tick">✓</span></td><td><span className="tick">✓</span></td></tr>
              <tr><td>Templates Available</td><td>2</td><td className="highlight-col">All 9</td><td>All 9</td></tr>
              <tr><td>Revisions</td><td>3 rounds</td><td className="highlight-col">Unlimited</td><td>Unlimited</td></tr>
              <tr><td>Delivery Time</td><td>72 hours</td><td className="highlight-col">48 hours</td><td>24 hours</td></tr>
              <tr><td>1:1 Strategy Call</td><td><span className="cross-mark">—</span></td><td className="highlight-col"><span className="cross-mark">—</span></td><td><span className="tick">✓</span></td></tr>
              <tr><td>Executive Bio</td><td><span className="cross-mark">—</span></td><td className="highlight-col"><span className="cross-mark">—</span></td><td><span className="tick">✓</span></td></tr>
              <tr><td>Job Search Support</td><td><span className="cross-mark">—</span></td><td className="highlight-col">60 days</td><td>90 days</td></tr>
              <tr><td>Money-Back Guarantee</td><td>30 days</td><td className="highlight-col">30 days</td><td>30 days</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      
      
      <section className="guarantee-section">
        <div className="container">
          <span className="section-label" style={{display: "block", textAlign: "center"}}>Our Promises</span>
          <h2 style={{fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: "700", color: "var(--navy)", textAlign: "center"}}>Your Success Is <span style={{color: "var(--teal)"}}>Guaranteed</span></h2>
          <div className="guarantee-icons">
            <div className="guarantee-item reveal"><div className="guarantee-icon-wrap">🛡️</div><div className="guarantee-title">30-Day Refund</div><div className="guarantee-desc">Not satisfied? Full refund within 30 days, no questions asked.</div></div>
            <div className="guarantee-item reveal reveal-delay-1"><div className="guarantee-icon-wrap">♾️</div><div className="guarantee-title">Unlimited Revisions</div><div className="guarantee-desc">We revise until your resume is exactly how you want it.</div></div>
            <div className="guarantee-item reveal reveal-delay-2"><div className="guarantee-icon-wrap">🎯</div><div className="guarantee-title">ATS Certified</div><div className="guarantee-desc">Every resume scores 90+ on leading ATS platforms.</div></div>
            <div className="guarantee-item reveal reveal-delay-3"><div className="guarantee-icon-wrap">👤</div><div className="guarantee-title">Human Written</div><div className="guarantee-desc">Real certified writers — no AI-generated content ever.</div></div>
          </div>
        </div>
      </section>
      
      
      <section className="faq-mini">
        <div className="container">
          <div style={{textAlign: "center", maxWidth: "500px", margin: "0 auto 0"}}>
            <span className="section-label">Quick Answers</span>
            <h2 style={{fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: "700", color: "var(--navy)"}}>Pricing <span style={{color: "var(--teal)"}}>FAQs</span></h2>
          </div>
          <div className="faq-mini-grid">
            <div className="faq-mini-item reveal"><div className="faq-mini-q">Is there a subscription or recurring charge?</div><div className="faq-mini-a">No — all plans are one-time payments. You pay once and own your resume forever with no ongoing fees.</div></div>
            <div className="faq-mini-item reveal reveal-delay-1"><div className="faq-mini-q">Can I upgrade my plan later?</div><div className="faq-mini-a">Yes! You can upgrade at any time and only pay the difference between your current and new plan.</div></div>
            <div className="faq-mini-item reveal reveal-delay-2"><div className="faq-mini-q">What payment methods do you accept?</div><div className="faq-mini-a">We accept all major credit cards, PayPal, and bank transfers. All payments are secured via SSL encryption.</div></div>
            <div className="faq-mini-item reveal reveal-delay-3"><div className="faq-mini-q">How does the money-back guarantee work?</div><div className="faq-mini-a">If you're not satisfied after revisions within 30 days of delivery, contact us and we'll issue a full refund immediately.</div></div>
          </div>
        </div>
      </section>
      
      <section className="cta-banner">
        <div className="container">
          <h2>Ready to Invest in Your Career?</h2>
          <p>Join 12,000+ professionals who landed better jobs with ProCareerVista.</p>
          <a href="/get-started" className="btn btn-white">✦ Get Started Today</a>
        </div>
      </section>
    </>
  );
}
