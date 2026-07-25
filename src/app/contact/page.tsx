import ContactContent from "@/components/pages/ContactContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ProCareerVista. Ask a question, request a quote, or book a free career consultation with our writing team.",
};

export default function ContactPage() {
  return <ContactContent />;
}
