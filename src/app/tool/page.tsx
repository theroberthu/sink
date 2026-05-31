import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ToolFlow } from "@/components/ToolFlow";

export const metadata: Metadata = {
  title: "Find My Cabinet Fix",
  description:
    "Pick your under sink mess and goal to get a simple 3 piece kitchen sink reset plan in under a minute.",
  // The tool is interactive and not a content target. Keep it out of the index.
  robots: { index: false, follow: true },
};

export default function ToolPage() {
  return (
    <Section className="pt-10">
      <ToolFlow />
    </Section>
  );
}
