import { Check } from "lucide-react";
import { AssetImage } from "@/components/AssetImage";
import { getMessImage } from "@/lib/images";
import type { MessType } from "@/lib/types";

interface MessTypeCardProps {
  messType: MessType;
  /** When provided, the card becomes a selectable button (used in the tool). */
  onSelect?: (id: MessType["id"]) => void;
  selected?: boolean;
}

// Image led card for one mess type. The visual leads, copy stays short.
// Static on content pages, selectable in the tool.
export function MessTypeCard({ messType, onSelect, selected }: MessTypeCardProps) {
  const image = getMessImage(messType.id);

  const inner = (
    <>
      <div className="relative">
        <AssetImage
          asset={image}
          className="aspect-[4/3] w-full"
          sizes="(min-width: 640px) 30vw, 90vw"
        />
        {onSelect && selected ? (
          <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
            <Check className="h-4 w-4" aria-hidden="true" />
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="type-card-title">{messType.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {messType.shortDescription}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {messType.components.map((component) => (
            <li
              key={component}
              className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {component}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const shell =
    "overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-soft transition-all duration-150";

  if (!onSelect) {
    return <article className={`${shell} border-border`}>{inner}</article>;
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(messType.id)}
      aria-pressed={selected}
      className={[
        shell,
        "h-full w-full text-left hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift",
        selected ? "border-primary ring-2 ring-primary/30" : "border-border",
      ].join(" ")}
    >
      {inner}
    </button>
  );
}
