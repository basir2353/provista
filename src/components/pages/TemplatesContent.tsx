"use client";

import Link from "next/link";
import { useTemplatesFilter } from "@/hooks/usePageInteractivity";
import { useCmsData } from "@/hooks/useCmsData";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import CmsLoadState from "@/components/CmsLoadState";
import { hasTemplatePreview, TemplatePreviewMedia } from "@/components/TemplatePreviewMedia";
import { api, Template } from "@/lib/api";
import { staggerDelay } from "@/lib/cms";

function TemplateCard({ template, index }: { template: Template; index: number }) {
  const formats = template.formats.split(",").map((f) => f.trim()).filter(Boolean);
  const categoryLabel = template.category.charAt(0).toUpperCase() + template.category.slice(1);
  const hasPreview = hasTemplatePreview(template);

  return (
    <div
      className={`template-card reveal ${staggerDelay(index)} ${template.featured ? "featured-card" : ""}`}
      data-cat={template.category}
      key={template.id}
    >
      <div className={`template-preview ${hasPreview ? "has-media" : ""}`}>
        <TemplatePreviewMedia template={template} />
        <span className="template-badge" style={{ background: template.badgeColor || "#0d1b21" }}>
          {template.featured ? "★ Most Popular" : categoryLabel}
        </span>
      </div>
      <div className="template-info">
        <div className="template-name">{template.name}</div>
        {template.tags && <div className="template-tag">{template.tags.replace(/,/g, " · ")}</div>}
        {template.description && <p style={{ fontSize: "13px", color: "var(--gray-500)", marginTop: "6px" }}>{template.description}</p>}
        <div className="template-meta">
          <div className="template-formats">
            {formats.map((format) => (
              <span className="format-chip" key={format}>{format}</span>
            ))}
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--teal)" }}>ATS {template.atsScore}/100</span>
        </div>
        <div className="template-actions">
          <a href={`/get-started?template=${template.id}`} className="btn btn-primary btn-sm" style={{ flex: "1", justifyContent: "center" }}>Use This Template</a>
          <a href="/pricing" className="btn btn-outline btn-sm">See Plans</a>
        </div>
      </div>
    </div>
  );
}

export default function TemplatesContent({ initialTemplates }: { initialTemplates?: Template[] } = {}) {
  const settings = useSiteSettings();
  const { data: templates, loading, error, retry } = useCmsData(
    () => api.templates.list(),
    [],
    [],
    initialTemplates
  );
  useTemplatesFilter();

  const categories = ["all", ...Array.from(new Set(templates.map((t) => t.category)))];

  return (
    <>
      <section className="page-hero">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="container">
          <span className="section-label">{settings.templates_hero_label}</span>
          <h1>
            {settings.templates_hero_title}{" "}
            <span>{settings.templates_hero_highlight}</span>
          </h1>
          <p>{settings.templates_hero_description}</p>
          <div className="page-hero-actions" style={{ position: "relative", zIndex: 2, marginTop: 8 }}>
            <Link href="/get-started" className="btn btn-primary" style={{ marginRight: 12 }} prefetch>
              {settings.templates_hero_cta_primary || "✦ Get Started"}
            </Link>
            <Link
              href="/pricing"
              className="btn btn-outline"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}
              prefetch
            >
              {settings.templates_hero_cta_secondary || "View Pricing"}
            </Link>
          </div>
        </div>
      </section>

      <div className="filter-bar">
        <div className="container">
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button className={`filter-tab ${cat === "all" ? "active" : ""}`} data-cat={cat} key={cat}>
                {cat === "all" ? "All Templates" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="templates-section">
        <div className="container">
          <div className="templates-grid" id="templatesGrid">
            <CmsLoadState
              loading={loading}
              error={error}
              empty={!loading && !error && templates.length === 0}
              loadingLabel="Loading templates…"
              emptyLabel="No templates available yet."
              onRetry={retry}
              variant="cards"
              count={6}
            />
            {!loading && !error && templates.map((template, i) => (
              <TemplateCard template={template} index={i} key={template.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>All Templates Included With Every Package</h2>
          <p>No extra charge; choose your template when you place your order.</p>
          <a href="/get-started" className="btn btn-white">✦ Start Your Order Today</a>
        </div>
      </section>
    </>
  );
}
