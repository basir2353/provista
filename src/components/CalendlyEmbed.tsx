"use client";

import { useEffect, useRef } from "react";

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

export default function CalendlyEmbed({ url, height = 680 }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
