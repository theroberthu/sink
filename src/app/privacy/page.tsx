import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Sink Cabinet Fix handles your information.",
};

export default function PrivacyPage() {
  return (
    <Section title="Privacy Policy" className="pt-12">
      <div className="max-w-2xl space-y-4 text-slate-700">
        <p>
          This is a placeholder privacy policy for Sink Cabinet Fix. We will replace it with full
          legal copy before launch.
        </p>
        <p>
          We collect basic information you choose to share, such as your email when you ask us to
          send a plan or join the kit waitlist. We also collect anonymous usage events to learn
          which mess types and goals are most common.
        </p>
        <p>
          We do not sell your personal information. You can ask us to remove your email at any time
          by contacting us.
        </p>
        <p>Last updated: placeholder date.</p>
      </div>
    </Section>
  );
}
