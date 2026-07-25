import TeamContent from "@/components/pages/TeamContent";
import { api } from "@/lib/api";

export const metadata = {
  title: "Our Team",
  description:
    "Meet our team of 15 certified resume writers, career coaches, and ATS specialists dedicated to getting you hired.",
};

export const revalidate = 60;

export default async function TeamPage() {
  const members = await api.team.list().catch(() => []);
  return <TeamContent initialMembers={members} />;
}
