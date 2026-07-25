import ServicesContent from "@/components/pages/ServicesContent";
import { api } from "@/lib/api";

export const metadata = {
  title: "Services",
  description:
    "From resume rewrites to interview coaching — a complete suite of career services to give you a decisive competitive edge.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await api.services.list().catch(() => []);
  return <ServicesContent initialServices={services} />;
}
