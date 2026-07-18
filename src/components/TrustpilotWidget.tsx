"use client";

import { useEffect, useRef } from "react";

// ── SETUP ──────────────────────────────────────────────────────────────
// 1. Create a free account at https://business.trustpilot.com
// 2. Go to Widgets in your dashboard, copy your Business Unit ID
// 3. Paste it below, replacing "YOUR_BUSINESS_UNIT_ID"
// ─────────────────────────────────────────────────────────────────────
export const TRUSTPILOT_BUSINESS_UNIT_ID = "6a5a0bb3cdddbcc488315e7b";
export const TRUSTPILOT_REVIEW_URL = "https://www.trustpilot.com/evaluate/procareervista.com";

export const TRUSTPILOT_TEMPLATE_IDS = {
  micro: "5419b6ffb0d04a076446a9af",
} as const;

type TrustpilotWidgetProps = {
  variant?: keyof typeof TRUSTPILOT_TEMPLATE_IDS | "custom";
  templateId?: string;
  businessUnitId?: string;
  height?: number | string;
  width?: number | string;
  theme?: "light" | "dark";
  locale?: string;
};

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: Element, forceReload?: boolean) => void;
    };
  }
}

const WIDGET_SCRIPT_SRC = "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";

/**
 * Live Trustpilot star-rating badge (pulls your real score once you have reviews).
 * Note: Trustpilot's own script controls where clicks on this badge go
 * (your public profile page) — this cannot be overridden.
 */
export default function TrustpilotWidget({
  variant = "micro",
  templateId,
  businessUnitId = TRUSTPILOT_BUSINESS_UNIT_ID,
  height = 24,
  width = "100%",
  theme = "light",
  locale = "en-US",
}: TrustpilotWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const resolvedTemplateId = variant === "custom" ? templateId : TRUSTPILOT_TEMPLATE_IDS[variant];

  useEffect(() => {
    if (!containerRef.current || !resolvedTemplateId) return;

    const loadWidget = () => {
      if (containerRef.current && window.Trustpilot) {
        window.Trustpilot.loadFromElement(containerRef.current, true);
      }
    };

    const existing = document.querySelector(`script[src="${WIDGET_SCRIPT_SRC}"]`);
    if (existing) {
      if (window.Trustpilot) {
        loadWidget();
      } else {
        existing.addEventListener("load", loadWidget, { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = WIDGET_SCRIPT_SRC;
    script.async = true;
    script.onload = loadWidget;
    document.body.appendChild(script);
  }, [resolvedTemplateId]);

  if (!resolvedTemplateId) return null;

  const isPlaceholder = !businessUnitId || businessUnitId === "YOUR_BUSINESS_UNIT_ID";

  if (isPlaceholder) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 12px",
          borderRadius: 8,
          border: "1px dashed #C8D0D5",
          color: "#8A9BAA",
          fontSize: 13,
        }}
        title="Add your Trustpilot Business Unit ID to activate this widget"
      >
        ★ Trustpilot widget (connect your account to activate)
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="trustpilot-widget"
      data-locale={locale}
      data-template-id={resolvedTemplateId}
      data-businessunit-id={businessUnitId}
      data-style-height={typeof height === "number" ? `${height}px` : height}
      data-style-width={typeof width === "number" ? `${width}px` : width}
      data-theme={theme}
    >
      <a href={TRUSTPILOT_REVIEW_URL} target="_blank" rel="noopener noreferrer">
        Trustpilot
      </a>
    </div>
  );
}

/**
 * Simple "Trustpilot" text link that always goes straight to the
 * write-a-review page. Fully under our control (not a Trustpilot embed),
 * so the click destination is guaranteed — no live star rating shown.
 */
export function TrustpilotReviewLink({
  href = TRUSTPILOT_REVIEW_URL,
  starColor = "#00b67a",
  textColor,
}: {
  href?: string;
  starColor?: string;
  textColor?: string;
}) {
  return (
    
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 14,
        fontWeight: 600,
        textDecoration: "none",
        color: textColor || "inherit",
      }}
    >
      <span style={{ color: starColor, fontSize: 16 }}>★</span>
      Trustpilot
    </a>
  );
}
