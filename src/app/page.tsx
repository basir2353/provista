import HomeContent from "@/components/pages/HomeContent";
import { api } from "@/lib/api";

export const revalidate = 60;

export default async function HomePage() {
  const [plans, templates] = await Promise.all([
    api.pricing.plans.list().catch(() => []),
    api.templates.list().catch(() => []),
  ]);

  return <HomeContent initialPlans={plans} initialTemplates={templates} />;
}
