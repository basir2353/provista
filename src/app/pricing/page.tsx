import PricingContent from "@/components/pages/PricingContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent one-time pricing for professional resume writing, LinkedIn optimization, and career packages. No subscriptions.",
};

export default function PricingPage() {
  return <PricingContent />;
}
