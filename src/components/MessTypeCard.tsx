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
    "overflow-hidden rounded-2xl bg-card text-card-foreground transition-colors duration-150";

  if (!onSelect) {
    return <article className={`${shell} border border-border`}>{inner}</article>;
  }

  // Selected state: 2px primary green border plus a soft sage wash. No glow.
  return (
    <button
      type="button"
      onClick={() => onSelect(messType.id)}
      aria-pressed={selected}
      className={[
        shell,
        "h-full w-full border-2 text-left",
        selected ? "border-primary bg-sage" : "border-border hover:border-foreground/30",
      ].join(" ")}
    >
      {inner}
    </button>
  );
}
