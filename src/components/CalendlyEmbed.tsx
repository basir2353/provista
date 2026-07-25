"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";

type CalendlyEmbedProps = {
  url: string;
  height?: number;
  /** Prefill invitee fields from intake form */
  prefill?: {
    name?: string;
    email?: string;
  };
  /** Show “Open Calendly” link under the embed (default true) */
  showOpenLink?: boolean;
};

type CalendlyMessage = {
  event?: string;
  payload?: {
    event?: { name?: string; start_time?: string; uri?: string };
    invitee?: { name?: string; email?: string; phone?: string; timezone?: string; uri?: string };
  };
};

function buildEmbedSrc(url: string, prefill?: CalendlyEmbedProps["prefill"]) {
  try {
    const parsed = new URL(url.trim());
    parsed.searchParams.set("embed_type", "Inline");
    parsed.searchParams.set("hide_gdpr_banner", "1");
    if (typeof window !== "undefined") {
      parsed.searchParams.set("embed_domain", window.location.hostname);
    }
    if (prefill?.name?.trim()) parsed.searchParams.set("name", prefill.name.trim());
    if (prefill?.email?.trim()) parsed.searchParams.set("email", prefill.email.trim());
    return parsed.toString();
  } catch {
    return url;
  }
}

export default function CalendlyEmbed({
  url,
  height = 680,
  prefill,
  showOpenLink = true,
}: CalendlyEmbedProps) {
  const [embedHeight, setEmbedHeight] = useState(height);
  const [failed, setFailed] = useState(false);

  const embedSrc = useMemo(() => buildEmbedSrc(url, prefill), [url, prefill?.name, prefill?.email]);

  useEffect(() => {
    const updateHeight = () => {
      setEmbedHeight(window.innerWidth < 600 ? 720 : window.innerWidth < 900 ? 680 : height);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [height]);

  useEffect(() => {
    if (!url) return;

    const onMessage = (event: MessageEvent) => {
      const data = event.data as CalendlyMessage;
      if (data?.event !== "calendly.event_scheduled" || !data.payload) return;

      const invitee = data.payload.invitee;
      const calEvent = data.payload.event;
      if (!invitee?.email) return;

      void api.bookCalls
        .submit({
          name: invitee.name || "Calendly Guest",
          email: invitee.email,
          phone: invitee.phone,
          eventName: calEvent?.name,
          scheduledAt: calEvent?.start_time,
          timezone: invitee.timezone,
          calendlyUri: invitee.uri || calEvent?.uri,
        })
        .catch(() => {
          // Booking still succeeded on Calendly; admin sync may use webhook
        });
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [url]);

  if (!url) return null;

  return (
    <div className="calendly-embed-wrap">
      {!failed ? (
        <iframe
          title="Schedule a consultation"
          src={embedSrc}
          className="calendly-inline-widget"
          style={{
            width: "100%",
            minWidth: 280,
            height: embedHeight,
            border: 0,
            display: "block",
            background: "#fff",
          }}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : null}

      {(showOpenLink || failed) && (
        <div style={{ textAlign: "center", padding: failed ? "24px 12px" : "12px 8px 4px" }}>
          {failed && (
            <p style={{ marginBottom: 12, color: "var(--gray-700)", fontSize: 14 }}>
              Calendar couldn&apos;t load here. Open Calendly to pick a time:
            </p>
          )}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary calendly-fallback-btn"
          >
            Open Calendly →
          </a>
        </div>
      )}
    </div>
  );
}
