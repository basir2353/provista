import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of ProCareerVista website and professional resume writing services.",
};

export default function TermsPage() {
  return (
    <section className="page-hero" style={{ paddingBottom: 0 }}>
      <div className="container" style={{ maxWidth: 760, paddingBottom: 80 }}>
        <span className="section-label">Legal</span>
        <h1 style={{ marginBottom: 12 }}>Terms of Service</h1>
        <p style={{ color: "var(--gray-500)", marginBottom: 32 }}>
          Last updated: July 25, 2026
        </p>
        <div style={{ color: "var(--navy)", lineHeight: 1.75, fontSize: 15 }}>
          <p>
            By accessing procareervista.com or purchasing services from ProCareerVista, you agree to
            these Terms of Service.
          </p>
          <h2 style={{ marginTop: 28, fontSize: "1.35rem" }}>Services</h2>
          <p>
            We provide professional resume writing, cover letters, LinkedIn optimization, coaching, and
            related career services as described on our site. Deliverables, timelines, and revisions
            depend on the plan or package you select.
          </p>
          <h2 style={{ marginTop: 28, fontSize: "1.35rem" }}>Orders and payments</h2>
          <p>
            Prices are listed in USD unless otherwise stated. Orders are one-time purchases unless a
            separate agreement says otherwise. You are responsible for providing accurate contact and
            career information so we can complete your project.
          </p>
          <h2 style={{ marginTop: 28, fontSize: "1.35rem" }}>Your content</h2>
          <p>
            You represent that information and documents you submit are accurate and that you have the
            right to share them with us. You grant us a limited license to use that material solely to
            perform the services you request.
          </p>
          <h2 style={{ marginTop: 28, fontSize: "1.35rem" }}>Refunds</h2>
          <p>
            Refund eligibility follows the guarantee stated at checkout and on our pricing pages.
            Requests should be submitted through our contact channels within the applicable window.
          </p>
          <h2 style={{ marginTop: 28, fontSize: "1.35rem" }}>Limitation of liability</h2>
          <p>
            Career outcomes (interviews, offers, salary) depend on many factors outside our control.
            To the fullest extent permitted by law, ProCareerVista is not liable for indirect or
            consequential damages arising from use of our services.
          </p>
          <h2 style={{ marginTop: 28, fontSize: "1.35rem" }}>Contact</h2>
          <p>
            For questions about these terms, visit our{" "}
            <Link href="/contact" style={{ color: "var(--teal)" }}>Contact</Link> page.
          </p>
        </div>
      </div>
    </section>
  );
}
