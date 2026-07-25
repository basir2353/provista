import TemplatesContent from "@/components/pages/TemplatesContent";
import { api } from "@/lib/api";

export const metadata = {
  title: "Resume Templates",
  description:
    "9 professionally designed, ATS-optimized resume templates included with every package.",
};

export const revalidate = 60;

export default async function TemplatesPage() {
  const templates = await api.templates.list().catch(() => []);
  return <TemplatesContent initialTemplates={templates} />;
}
