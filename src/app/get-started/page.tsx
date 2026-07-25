import GetStartedContent from "@/components/pages/GetStartedContent";
import { api } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Place your resume writing order with ProCareerVista. Choose a plan, share your goals, and get matched with a certified writer.",
};

export const dynamic = "force-dynamic";

export default async function GetStartedPage() {
  const [plans, addons] = await Promise.all([
    api.pricing.plans.list().catch(() => []),
    api.pricing.addons.list().catch(() => []),
  ]);

  return <GetStartedContent initialPlans={plans} initialAddons={addons} />;
}
