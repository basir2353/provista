import FreeConsultationContent from "@/components/pages/FreeConsultationContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Consultation",
  description:
    "Book a free career consultation with ProCareerVista. Share your goals, then schedule a call with our writing team.",
};

export default function FreeConsultationPage() {
  return <FreeConsultationContent />;
}
