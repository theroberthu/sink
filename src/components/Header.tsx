import Link from "next/link";
import { Droplets } from "lucide-react";
import { CTALink } from "@/components/CTAButton";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/kitchen-sink-reset", label: "Kitchen Sink Reset" },
  { href: "/under-sink-organizer-measurement-guide", label: "Measurement Guide" },
];

// Sticky site header with the wordmark and the primary path into the tool.
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Droplets className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>{SITE.name}</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <CTALink href="/tool" className="px-4 py-2 text-sm">
          Find My Fix
        </CTALink>
      </div>
    </header>
  );
}
