"use client";

import { createContext, useContext, useMemo } from "react";
import { useCmsData } from "@/hooks/useCmsData";
import { api, uploadUrl } from "@/lib/api";

export type SiteSettingsMap = Record<string, string>;

const DEFAULTS: SiteSettingsMap = {
  site_name: "ProCareerVista",
  site_tagline: "Transforming careers through expert resume writing, ATS optimization, and professional storytelling since 2015.",
  contact_email: "hello@procareervista.com",
  contact_phone: "+1 (555) 123-4567",
  meta_description:
    "Professional resume writers crafting career stories that get noticed. ATS-optimized, industry-tailored, and designed to get you interviews.",
};

const SiteSettingsContext = createContext<SiteSettingsMap>(DEFAULTS);

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const { data } = useCmsData(() => api.settings.getMap(), [], DEFAULTS);

  const settings = useMemo(() => ({ ...DEFAULTS, ...data }), [data]);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

export function settingImageUrl(path?: string | null, fallback = "/logo1.jpg") {
  if (!path) return fallback;
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return uploadUrl(path);
}
