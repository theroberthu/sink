import { AssetImage } from "@/components/AssetImage";
import { TrackedCTALink } from "@/components/TrackedCTALink";
import { getMessImage } from "@/lib/images";
import type { MessType } from "@/lib/types";

interface HomeMessCardProps {
  messType: MessType;
  /** 1 based position, shown as Cabinet Type 0X. */
  index: number;
  tagline: string;
}

// Diagnostic mess card used on the homepage in both the desktop grid and the
// mobile carousel. Big image, short copy, clear full width CTA.
export function HomeMessCard({ messType, index, tagline }: HomeMessCardProps) {
  const image = getMessImage(messType.id);
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-150 hover:border-foreground/20">
      <div className="relative">
        <AssetImage
          asset={image}
          className="aspect-[4/3] w-full"
          sizes="(min-width: 640px) 30vw, 90vw"
        />
        <span className="absolute left-3 top-3 z-10 rounded-lg border border-border bg-cream/95 px-2.5 py-1 text-xs font-medium tracking-wide text-foreground">
          {`Type 0${index + 1}`}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="type-card-title">{messType.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{tagline}</p>
        <TrackedCTALink
          href="/tool"
          event="find_fix_clicked"
          className="mt-4 min-h-[44px] w-full"
        >
          That&apos;s mine
        </TrackedCTALink>
      </div>
    </article>
  );
}
