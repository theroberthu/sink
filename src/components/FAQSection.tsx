import { Plus } from "lucide-react";
import { Section } from "@/components/Section";
import type { FaqItem } from "@/lib/types";

interface FAQSectionProps {
  items: FaqItem[];
  id?: string;
  title?: string;
}

// Accessible FAQ list using native disclosure elements. JSON-LD is injected separately.
export function FAQSection({ items, id = "faq", title = "Questions, answered" }: FAQSectionProps) {
  return (
    <Section id={id} title={title} muted>
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-border bg-card p-5 shadow-soft"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {item.question}
              <Plus
                className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
