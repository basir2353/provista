import GetStartedContent from "@/components/pages/GetStartedContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Place your resume writing order with ProCareerVista. Choose a plan, share your goals, and get matched with a certified writer.",
};

export default function GetStartedPage() {
  return <GetStartedContent />;
}
