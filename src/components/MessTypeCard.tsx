import { Card } from "@/components/Card";
import type { MessType } from "@/lib/types";

interface MessTypeCardProps {
  messType: MessType;
  /** When provided, the card becomes a selectable button (used in the tool). */
  onSelect?: (id: MessType["id"]) => void;
  selected?: boolean;
}

// Large card describing one mess type. Static on content pages, selectable in the tool.
export function MessTypeCard({ messType, onSelect, selected }: MessTypeCardProps) {
  const content = (
    <>
      <h3 className="text-xl font-bold">{messType.name}</h3>
      <p className="mt-2 text-slate-600">{messType.shortDescription}</p>
      <ul className="mt-4 space-y-1 text-sm text-slate-700">
        {messType.components.map((component) => (
          <li key={component} className="flex items-start gap-2">
            <span aria-hidden="true">+</span>
            <span>{component}</span>
          </li>
        ))}
      </ul>
    </>
  );

  if (!onSelect) {
    return <Card as="article">{content}</Card>;
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(messType.id)}
      aria-pressed={selected}
      className={`h-full rounded-xl border bg-white p-6 text-left shadow-sm transition-colors hover:border-blue-400 ${
        selected ? "border-blue-600 ring-2 ring-blue-200" : "border-slate-200"
      }`}
    >
      {content}
    </button>
  );
}
