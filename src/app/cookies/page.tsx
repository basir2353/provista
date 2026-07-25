import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How ProCareerVista uses cookies and similar technologies on our website.",
};

export default function CookiesPage() {
  return (
    <section className="page-hero" style={{ paddingBottom: 0 }}>
      <div className="container" style={{ maxWidth: 760, paddingBottom: 80 }}>
        <span className="section-label">Legal</span>
        <h1 style={{ marginBottom: 12 }}>Cookie Policy</h1>
        <p style={{ color: "var(--gray-500)", marginBottom: 32 }}>
          Last updated: July 25, 2026
        </p>
        <div style={{ color: "var(--navy)", lineHeight: 1.75, fontSize: 15 }}>
          <p>
            This Cookie Policy explains how ProCareerVista uses cookies and similar technologies when
            you visit our website.
          </p>
          <h2 style={{ marginTop: 28, fontSize: "1.35rem" }}>What are cookies?</h2>
          <p>
            Cookies are small text files stored on your device. They help websites remember preferences,
            keep sessions secure, and understand how pages are used.
          </p>
          <h2 style={{ marginTop: 28, fontSize: "1.35rem" }}>How we use cookies</h2>
          <ul>
            <li>Essential cookies required for site functionality and security</li>
            <li>Preference cookies that remember basic settings</li>
            <li>Analytics cookies that help us improve performance and content (where enabled)</li>
          </ul>
          <h2 style={{ marginTop: 28, fontSize: "1.35rem" }}>Your choices</h2>
          <p>
            Most browsers let you block or delete cookies. Disabling certain cookies may affect site
            features. For more about how we handle personal data, see our{" "}
            <Link href="/privacy" style={{ color: "var(--teal)" }}>Privacy Policy</Link>.
          </p>
          <p style={{ marginTop: 24 }}>
            Questions? <Link href="/contact" style={{ color: "var(--teal)" }}>Contact us</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
