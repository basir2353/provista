"use client";

import Link from "next/link";
import { settingImageUrl, useSiteSettings } from "@/context/SiteSettingsContext";

type LogoProps = {
  variant?: "header" | "footer";
  onClick?: () => void;
};

export default function Logo({ variant = "header", onClick }: LogoProps) {
  const settings = useSiteSettings();
  const siteName = settings.site_name || "ProCareerVista";
  const logoSrc = settingImageUrl(settings.site_logo, "/logo1.jpg");

  return (
    <Link
      href="/"
      className={`logo logo-${variant}`}
      prefetch
      onClick={onClick}
      aria-label={`${siteName} home`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoSrc} alt={siteName} className="logo-image" />
    </Link>
  );
}
