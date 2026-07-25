import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ProCareerVista collects, uses, and protects personal information and resume files you submit.",
};

export default function PrivacyPage() {
  return (
    <section className="page-hero" style={{ paddingBottom: 0 }}>
      <div className="container" style={{ maxWidth: 760, paddingBottom: 80 }}>
        <span className="section-label">Legal</span>
        <h1 style={{ marginBottom: 12 }}>Privacy Policy</h1>
        <p style={{ color: "var(--gray-500)", marginBottom: 32 }}>
          Last updated: July 25, 2026
        </p>
        <div style={{ color: "var(--navy)", lineHeight: 1.75, fontSize: 15 }}>
          <p>
            ProCareerVista (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides professional resume writing and career services.
            This Privacy Policy explains how we collect, use, store, and share information when you use
            our website and services.
          </p>
          <h2 style={{ marginTop: 28, fontSize: "1.35rem" }}>Information we collect</h2>
          <ul>
            <li>Contact details such as name, email address, and phone number</li>
            <li>Career information you provide (industry, experience level, target roles, achievements)</li>
            <li>Resume and related documents you upload (PDF, DOC, DOCX)</li>
            <li>Order and consultation details, including selected plans and add-ons</li>
            <li>Technical data such as browser type, IP address, and basic usage analytics</li>
          </ul>
          <h2 style={{ marginTop: 28, fontSize: "1.35rem" }}>How we use your information</h2>
          <ul>
            <li>To fulfill resume writing, LinkedIn, coaching, and related service orders</li>
            <li>To respond to inquiries and schedule free consultations</li>
            <li>To improve our website, services, and customer support</li>
            <li>To send transactional emails related to your order or request</li>
          </ul>
          <h2 style={{ marginTop: 28, fontSize: "1.35rem" }}>Resume and document handling</h2>
          <p>
            Files you upload are used solely to deliver the services you request. Access is limited to
            authorized team members assigned to your project. We do not sell your resume content or
            personal data to third parties.
          </p>
          <h2 style={{ marginTop: 28, fontSize: "1.35rem" }}>Sharing</h2>
          <p>
            We may share information with trusted service providers (for example hosting, email delivery,
            payment, or scheduling tools) only as needed to operate our business. We may also disclose
            information when required by law.
          </p>
          <h2 style={{ marginTop: 28, fontSize: "1.35rem" }}>Retention</h2>
          <p>
            We retain order and project records for as long as needed to provide services, meet legal
            obligations, and resolve disputes. You may request deletion of personal data subject to
            applicable law and legitimate business needs.
          </p>
          <h2 style={{ marginTop: 28, fontSize: "1.35rem" }}>Your choices</h2>
          <p>
            Contact us to access, correct, or request deletion of your information, or to ask questions
            about this policy.
          </p>
          <p style={{ marginTop: 24 }}>
            Questions? Visit our <Link href="/contact" style={{ color: "var(--teal)" }}>Contact</Link> page.
          </p>
        </div>
      </div>
    </section>
  );
}
