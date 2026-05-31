import { Section } from "@/components/Section";
import type { FaqItem } from "@/lib/types";

interface FAQSectionProps {
  items: FaqItem[];
  id?: string;
  title?: string;
}

// Accessible FAQ list using native disclosure elements. JSON-LD is injected separately.
export function FAQSection({ items, id = "faq", title = "FAQ" }: FAQSectionProps) {
  return (
    <Section id={id} title={title} muted>
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <summary className="cursor-pointer font-semibold">{item.question}</summary>
            <p className="mt-2 text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
