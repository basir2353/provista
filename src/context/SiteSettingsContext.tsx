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
  business_hours: "Mon–Fri, 9am–6pm EST",
  contact_hero_title: "We're Here to",
  contact_hero_highlight: "Help You",
  contact_hero_description: "Have a question about our services? Ready to get started? Our team responds within 2 business hours.",
  contact_form_title: "Send Us a Message",
  contact_form_subtitle: "Fill out the form and we'll get back to you shortly.",
  contact_form_button: "✦ Send Message →",
  contact_label_first_name: "First Name *",
  contact_label_last_name: "Last Name *",
  contact_label_email: "Email Address *",
  contact_label_subject: "Subject",
  contact_label_message: "Message *",
  calendly_title: "Book a Free Consultation Call",
  calendly_description: "Schedule a 30-minute call with our career experts to discuss your resume goals, timeline, and the best package for you.",
  calendly_button_text: "Book a Call on Calendly",
  calendly_url: "",
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
