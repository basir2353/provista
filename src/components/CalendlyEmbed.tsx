"use client";

import { useEffect, useRef } from "react";
import { api } from "@/lib/api";

type CalendlyEmbedProps = {
  url: string;
  height?: number;
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

type CalendlyMessage = {
  event?: string;
  payload?: {
    event?: { name?: string; start_time?: string; uri?: string };
    invitee?: { name?: string; email?: string; phone?: string; timezone?: string; uri?: string };
  };
};

export default function CalendlyEmbed({ url, height = 680 }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!url) return;

    const onMessage = (event: MessageEvent) => {
      const data = event.data as CalendlyMessage;
      if (data?.event !== "calendly.event_scheduled" || !data.payload) return;

      const invitee = data.payload.invitee;
      const calEvent = data.payload.event;
      if (!invitee?.email) return;

      void api.bookCalls.submit({
        name: invitee.name || "Calendly Guest",
        email: invitee.email,
        phone: invitee.phone,
        eventName: calEvent?.name,
        scheduledAt: calEvent?.start_time,
        timezone: invitee.timezone,
        calendlyUri: invitee.uri || calEvent?.uri,
      }).catch(() => {
        // Booking still succeeded on Calendly; admin sync may use webhook
      });
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [url]);

  useEffect(() => {
    if (!url || !containerRef.current) return;

    const initWidget = () => {
      if (!containerRef.current || !window.Calendly) return;
      containerRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({ url, parentElement: containerRef.current });
    };

    const existing = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (existing && window.Calendly) {
      initWidget();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = initWidget;
    document.body.appendChild(script);

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [url]);

  if (!url) return null;

  return (
    <div
      ref={containerRef}
      className="calendly-inline-widget"
      style={{ minWidth: "280px", height: `${height}px` }}
    />
  );
}
