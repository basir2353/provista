"use client";

import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { TrustpilotReviewLink } from "@/components/TrustpilotWidget";
import { useCmsData } from "@/hooks/useCmsData";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { api } from "@/lib/api";

const SOCIALS = [
  { key: "social_linkedin", label: "LinkedIn", fallback: "in" },
  { key: "social_twitter", label: "Twitter", fallback: "𝕏" },
  { key: "social_facebook", label: "Facebook", fallback: "f" },
  { key: "social_instagram", label: "Instagram", fallback: "ig" },
  { key: "social_youtube", label: "YouTube", fallback: "▶" },
] as const;

const FALLBACK_SERVICES = [
  { title: "Resume Writing", anchorId: "resume-writing" },
  { title: "Cover Letter", anchorId: "cover-letter" },
  { title: "LinkedIn Optimization", anchorId: "linkedin" },
  { title: "Executive Bio", anchorId: "executive-bio" },
  { title: "Career Coaching", anchorId: "coaching" },
  { title: "Interview Prep", anchorId: "interview-prep" },
];

export default function Footer() {
  const settings = useSiteSettings();
  const { data: services } = useCmsData(() => api.services.list(), [], []);
  const siteName = settings.site_name || "ProCareerVista";
  const tagline = settings.site_tagline || "Transforming careers through expert resume writing, ATS optimization, and professional storytelling since 2015.";
  const year = new Date().getFullYear();

  const footerServices =
    services.length > 0
      ? services.map((s) => ({
          title: s.title,
          anchorId: s.anchorId || s.slug,
        }))
      : FALLBACK_SERVICES;

  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo variant="footer" />
            <p className="footer-tagline">{tagline}</p>
            <div className="footer-socials">
              {SOCIALS.map(({ key, label, fallback }) => {
                const href = settings[key];
                if (href) {
                  return (
                    <a key={key} href={href} className="footer-social" target="_blank" rel="noopener noreferrer" aria-label={label}>
                      {fallback}
                    </a>
                  );
                }
                return null;
              })}
            </div>
            {(settings.contact_email || settings.contact_phone) && (
              <div style={{ marginTop: 16, fontSize: 13, color: "var(--gray-400)", lineHeight: 1.7 }}>
                {settings.contact_email && <div>{settings.contact_email}</div>}
                {settings.contact_phone && <div>{settings.contact_phone}</div>}
              </div>
            )}
            <div style={{ marginTop: 20 }}>
              <TrustpilotReviewLink textColor="#ffffff" />
            </div>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              {footerServices.map((service) => (
                <li key={service.anchorId}>
                  <Link href={`/services#${service.anchorId}`} prefetch>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Industries</div>
            <ul className="footer-links">
              <li><Link href="/#industries" prefetch>Technology</Link></li>
              <li><Link href="/#industries" prefetch>Finance</Link></li>
              <li><Link href="/#industries" prefetch>Healthcare</Link></li>
              <li><Link href="/#industries" prefetch>Engineering</Link></li>
              <li><Link href="/#industries" prefetch>Legal</Link></li>
              <li><Link href="/#industries" prefetch>Marketing</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><Link href="/about" prefetch>About Us</Link></li>
              <li><Link href="/team" prefetch>Our Team</Link></li>
              <li><Link href="/blog" prefetch>Blog</Link></li>
              <li><Link href="/templates" prefetch>Templates</Link></li>
              <li><Link href="/#testimonials" prefetch>Reviews</Link></li>
              <li><Link href="/pricing" prefetch>Pricing</Link></li>
              <li><Link href="/contact" prefetch>Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} {siteName}. All rights reserved.</span>
          <div className="footer-bottom-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/cookies">Cookie Policy</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
