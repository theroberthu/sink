import Link from "next/link";
import { Droplets } from "lucide-react";
import { DisclosureNote } from "@/components/DisclosureNote";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/kitchen-sink-reset", label: "Kitchen Sink Reset" },
  { href: "/under-sink-organizer-measurement-guide", label: "Measurement Guide" },
  { href: "/tool", label: "Find My Fix" },
];

const LEGAL = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
];

// Footer with the affiliate disclosure note and navigation.
export function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-muted">
      <div className="mx-auto w-full max-w-5xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Droplets className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>{SITE.name}</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">{SITE.tagline}</p>
          </div>
          <nav aria-label="Site" className="flex flex-col gap-2 text-sm">
            <p className="type-caption">Explore</p>
            {LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Legal" className="flex flex-col gap-2 text-sm">
            <p className="type-caption">Legal</p>
            {LEGAL.map((item) => (
              <Link key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <DisclosureNote className="max-w-2xl" />
          <p className="mt-4 text-xs text-muted-foreground">
            {String.fromCharCode(169)} {new Date().getFullYear()} {SITE.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}
