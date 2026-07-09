"use client";

import { useEffect } from "react";
import { settingImageUrl, useSiteSettings } from "@/context/SiteSettingsContext";

export default function DynamicFavicon() {
  const settings = useSiteSettings();

  useEffect(() => {
    const href = settings.favicon ? settingImageUrl(settings.favicon, "") : "";
    if (!href) return;

    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = href;
  }, [settings.favicon]);

  return null;
}
