import PricingContent from "@/components/pages/PricingContent";
import { api } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent one-time pricing for professional resume writing, LinkedIn optimization, and career packages. No subscriptions.",
};

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const [plans, addons] = await Promise.all([
    api.pricing.plans.list().catch(() => []),
    api.pricing.addons.list().catch(() => []),
  ]);

  return <PricingContent initialPlans={plans} initialAddons={addons} />;
}
