"use client";

import { usePricingToggle } from "@/hooks/usePageInteractivity";
import { useCmsData } from "@/hooks/useCmsData";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import CmsLoadState from "@/components/CmsLoadState";
import { api, Addon, PricingPlan } from "@/lib/api";
import { isIncluded, parseJsonArray, revealDelay } from "@/lib/cms";

function PlanCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const features = parseJsonArray<string>(plan.features);
  const displayPrice = plan.price;

  return (
    <div
      className={`pricing-card ${plan.popular ? "featured" : ""} reveal ${revealDelay(index)}`}
      data-slug={plan.slug}
      data-price={plan.price}
      data-bundle-price={plan.bundlePrice ?? plan.price}
    >
      {plan.popular && <div className="popular-badge">⭐ Most Popular</div>}
      <div className="plan-name">{plan.name}</div>
      <div className="plan-price">
        <span className="price-currency">$</span>
        <span className="price-val">{displayPrice}</span>
      </div>
      <div className="plan-period">one-time · no subscription</div>
      {plan.description && <div className="plan-desc">{plan.description}</div>}
      <div className="plan-divider"></div>
      <ul className="plan-features">
        {features.map((feature) => {
          const included = !feature.startsWith("✗");
          return (
            <li key={feature}>
              <span className={included ? "check" : "cross"}>{included ? "✓" : "✗"}</span>
              <span style={included ? undefined : { color: "var(--gray-300)" }}>{feature.replace(/^[✓✗]\s*/, "")}</span>
            </li>
          );
        })}
        {!features.length && (
          <>
            <li><span className="check">✓</span>Professional Resume Rewrite</li>
            <li><span className="check">✓</span>ATS Optimization</li>
            <li><span className="check">✓</span>{plan.delivery} Delivery</li>
            <li><span className="check">✓</span>{plan.revisions} Revisions</li>
            <li>
              <span className={isIncluded(plan.coverLetter) ? "check" : "cross"}>{isIncluded(plan.coverLetter) ? "✓" : "✗"}</span>
              <span style={isIncluded(plan.coverLetter) ? undefined : { color: "var(--gray-300)" }}>Cover Letter</span>
            </li>
            <li>
              <span className={isIncluded(plan.linkedin) ? "check" : "cross"}>{isIncluded(plan.linkedin) ? "✓" : "✗"}</span>
              <span style={isIncluded(plan.linkedin) ? undefined : { color: "var(--gray-300)" }}>LinkedIn Optimization</span>
            </li>
          </>
        )}
      </ul>
      <a href={`/get-started?plan=${plan.slug}`} className={`btn btn-plan ${plan.popular ? "btn-featured" : "btn-dark"}`}>
        Get Started — ${displayPrice}
      </a>
      <p className="plan-guarantee" style={plan.popular ? { color: "rgba(255,255,255,0.4)" } : undefined}>🛡️ 7-day money-back guarantee</p>
    </div>
  );
}

const addonIcons: Record<string, string> = {
  "cover-letter": "💼",
  linkedin: "🔗",
  rush: "⚡",
  coaching: "🎯",
  "thank-you": "📋",
  ats: "📊",
};

function AddonCard({ addon, index }: { addon: Addon; index: number }) {
  const icon = addonIcons[addon.slug] || "✦";
  return (
    <div className={`addon-card reveal ${revealDelay(index)}`} key={addon.id}>
      <div className="addon-icon">{icon}</div>
      <div className="addon-name">{addon.name}</div>
      {addon.description && <div className="addon-desc">{addon.description}</div>}
      <div className="addon-price">+${addon.price}</div>
    </div>
  );
}

export default function PricingContent() {
  const settings = useSiteSettings();
  const { data: plans, loading: plansLoading, error: plansError, retry: retryPlans } = useCmsData(() => api.pricing.plans.list(), [], []);
  const { data: addons, loading: addonsLoading, error: addonsError, retry: retryAddons } = useCmsData(() => api.pricing.addons.list(), [], []);
  const { data: faqs } = useCmsData(() => api.faqs.list(), [], []);
  usePricingToggle();

  const pricingFaqs = faqs.filter((f) => f.page === "pricing").slice(0, 8);

  return (
    <>
      <section className="page-hero">
        <div className="blob b1"></div><div className="blob b2"></div>
        <div className="container">
          <span className="section-label">{settings.pricing_hero_label}</span>
          <h1>
            {settings.pricing_hero_title}{" "}
            <span>{settings.pricing_hero_highlight}</span>
          </h1>
          <p>{settings.pricing_hero_description}</p>
        </div>
      </section>

      <div className="toggle-bar">
        <div className="toggle-wrap">
          <span className="toggle-label">One-Time</span>
          <label className="toggle-switch">
            <input type="checkbox" id="billingToggle" />
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
            <CmsLoadState
              loading={plansLoading}
              error={plansError}
              empty={!plansLoading && !plansError && plans.length === 0}
              loadingLabel="Loading plans..."
              emptyLabel="No plans available yet."
              onRetry={retryPlans}
            />
            {plans.map((plan, i) => (
              <PlanCard plan={plan} index={i} key={plan.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="addons-section">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto" }}>
            <span className="section-label">Optional Add-Ons</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: "700", color: "var(--navy)" }}>Enhance Your <span style={{ color: "var(--teal)" }}>Package</span></h2>
            <p style={{ color: "var(--gray-500)", marginTop: "12px", fontSize: "15px", lineHeight: "1.7" }}>Add any of these services to any plan at checkout.</p>
          </div>
          <div className="addons-grid">
            <CmsLoadState
              loading={addonsLoading}
              error={addonsError}
              empty={!addonsLoading && !addonsError && addons.length === 0}
              loadingLabel="Loading add-ons..."
              emptyLabel="No add-ons available yet."
              onRetry={retryAddons}
            />
            {addons.map((addon, i) => (
              <AddonCard addon={addon} index={i} key={addon.id} />
            ))}
          </div>
        </div>
      </section>

      {plans.length >= 2 && (
        <section className="compare-section">
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 0" }}>
              <span className="section-label">Compare Plans</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: "700", color: "var(--navy)" }}>Find the Right <span style={{ color: "var(--teal)" }}>Fit</span></h2>
            </div>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.id} className={plan.popular ? "highlight-col" : undefined}>
                      {plan.name} ${plan.price}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Delivery Time</td>
                  {plans.map((plan) => (
                    <td key={plan.id} className={plan.popular ? "highlight-col" : undefined}>{plan.delivery}</td>
                  ))}
                </tr>
                <tr>
                  <td>Revisions</td>
                  {plans.map((plan) => (
                    <td key={plan.id} className={plan.popular ? "highlight-col" : undefined}>{plan.revisions}</td>
                  ))}
                </tr>
                <tr>
                  <td>Cover Letter</td>
                  {plans.map((plan) => (
                    <td key={plan.id} className={plan.popular ? "highlight-col" : undefined}>
                      {isIncluded(plan.coverLetter) ? <span className="tick">✓</span> : <span className="cross-mark">—</span>}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>LinkedIn Optimization</td>
                  {plans.map((plan) => (
                    <td key={plan.id} className={plan.popular ? "highlight-col" : undefined}>
                      {isIncluded(plan.linkedin) ? <span className="tick">✓</span> : <span className="cross-mark">—</span>}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="guarantee-section">
        <div className="container">
          <span className="section-label" style={{ display: "block", textAlign: "center" }}>Our Promises</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: "700", color: "var(--navy)", textAlign: "center" }}>Your Success Is <span style={{ color: "var(--teal)" }}>Guaranteed</span></h2>
          <div className="guarantee-icons">
            <div className="guarantee-item reveal"><div className="guarantee-icon-wrap">🛡️</div><div className="guarantee-title">7-Day Refund</div><div className="guarantee-desc">Not satisfied? Full refund within 7 days, no questions asked.</div></div>
            <div className="guarantee-item reveal reveal-delay-1"><div className="guarantee-icon-wrap">♾️</div><div className="guarantee-title">Unlimited Revisions</div><div className="guarantee-desc">We revise until your resume is exactly how you want it.</div></div>
            <div className="guarantee-item reveal reveal-delay-2"><div className="guarantee-icon-wrap">🎯</div><div className="guarantee-title">ATS Certified</div><div className="guarantee-desc">Every resume scores 90+ on leading ATS platforms.</div></div>
            <div className="guarantee-item reveal reveal-delay-3"><div className="guarantee-icon-wrap">👤</div><div className="guarantee-title">Human Written</div><div className="guarantee-desc">Real certified writers.</div></div>
          </div>
        </div>
      </section>

      <section className="faq-mini">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "500px", margin: "0 auto 0" }}>
            <span className="section-label">{settings.pricing_faq_label}</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: "700", color: "var(--navy)" }}>
              {settings.pricing_faq_title}{" "}
              <span style={{ color: "var(--teal)" }}>{settings.pricing_faq_highlight}</span>
            </h2>
          </div>
          <div className="faq-mini-grid">
            {pricingFaqs.map((faq, i) => (
              <div className={`faq-mini-item reveal ${revealDelay(i)}`} key={faq.id}>
                <div className="faq-mini-q">{faq.question}</div>
                <div className="faq-mini-a">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>Ready to Invest in Your Career?</h2>
          <p>Join 3000+ professionals who landed better jobs with ProCareerVista.</p>
          <a href="/get-started" className="btn btn-white">✦ Get Started Today</a>
        </div>
      </section>
    </>
  );
}
