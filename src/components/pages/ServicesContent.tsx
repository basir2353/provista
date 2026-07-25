"use client";

import { useEffect } from "react";
import { useServiceNav } from "@/hooks/usePageInteractivity";
import { useCmsData } from "@/hooks/useCmsData";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import CmsLoadState from "@/components/CmsLoadState";
import { api, Service } from "@/lib/api";
import { parseJsonArray } from "@/lib/cms";

function ServiceBlock({ service, index }: { service: Service; index: number }) {
  const features = parseJsonArray<string>(service.features);
  const reverse = index % 2 === 1;
  const anchor = service.anchorId || service.slug;

  return (
    <section className="service-section" id={anchor} key={service.id}>
      <div className="container">
        <div className={`service-grid ${reverse ? "reverse" : ""}`}>
          <div className="reveal">
            <div className="service-icon-big" style={{ background: "var(--mint)" }}>📄</div>
            {service.price && <div className="service-price-badge">{service.price}</div>}
            <h2 className="service-title">
              {service.title}
              {service.subtitle && <> <span>{service.subtitle}</span></>}
            </h2>
            <p className="service-desc">{service.description}</p>
            {features.length > 0 && (
              <div className="service-includes">
                <div className="service-includes-title">What&apos;s Included</div>
                <ul className="service-includes-list">
                  {features.map((feature) => (
                    <li key={feature}><span className="service-check">✓</span>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="service-actions">
              <a href="/get-started" className="btn btn-primary">✦ Get Started</a>
              <a href="/pricing" className="btn btn-outline">See Pricing</a>
            </div>
          </div>
          <div className="service-visual reveal rd1">
            <div className="service-card-mockup" style={{ background: "white", padding: "32px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--teal)", letterSpacing: "2px", marginBottom: "16px", textTransform: "uppercase" }}>
                {service.title}
              </div>
              {service.delivery && (
                <div style={{ fontSize: "13px", color: "var(--gray-500)", marginBottom: "12px" }}>Delivery: {service.delivery}</div>
              )}
              <div style={{ height: "6px", background: "var(--mint)", borderRadius: "3px", width: "70%", marginBottom: "12px" }} />
              <div style={{ height: "6px", background: "var(--gray-100)", borderRadius: "3px", width: "100%", marginBottom: "8px" }} />
              <div style={{ height: "6px", background: "var(--gray-100)", borderRadius: "3px", width: "85%", marginBottom: "8px" }} />
              <div style={{ height: "6px", background: "var(--gray-100)", borderRadius: "3px", width: "90%" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesContent({ initialServices }: { initialServices?: Service[] } = {}) {
  const settings = useSiteSettings();
  const { data: services, loading, error, retry } = useCmsData(
    () => api.services.list(),
    [],
    [],
    initialServices
  );
  useServiceNav();

  useEffect(() => {
    if (loading || error || services.length === 0) return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const el = document.getElementById(hash);
    if (!el) return;
    const timer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [loading, error, services]);

  return (
    <>
      <section className="page-hero">
        <div className="blob b1"></div><div className="blob b2"></div>
        <div className="container">
          <span className="section-label">{settings.services_hero_label}</span>
          <h1>
            {settings.services_hero_title}{" "}
            <span>{settings.services_hero_highlight}</span>
          </h1>
          <p>{settings.services_hero_description}</p>
          <a href="/get-started" className="btn btn-primary" style={{ position: "relative", zIndex: 2, marginRight: "12px" }}>
            {settings.services_hero_cta_primary}
          </a>
          <a href="/pricing" className="btn btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.4)", position: "relative", zIndex: 2 }}>
            {settings.services_hero_cta_secondary}
          </a>
        </div>
      </section>

      {services.length > 0 && (
        <div className="service-nav">
          <div className="container">
            <div className="service-nav-inner">
              {services.map((service, i) => (
                <a
                  href={`#${service.anchorId || service.slug}`}
                  className={`service-tab ${i === 0 ? "active" : ""}`}
                  key={service.id}
                >
                  {service.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {(loading || error || (!loading && services.length === 0)) && (
        <div className="container" style={{ padding: "40px 0" }}>
          <CmsLoadState
            loading={loading}
            error={error}
            empty={!loading && !error && services.length === 0}
            loadingLabel="Loading services…"
            emptyLabel="No services available yet."
            onRetry={retry}
            variant="list"
            count={4}
          />
        </div>
      )}

      {!loading && !error && services.map((service, index) => (
        <ServiceBlock service={service} index={index} key={service.id} />
      ))}
    </>
  );
}
