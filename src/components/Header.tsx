import Link from "next/link";
import { Droplets } from "lucide-react";
import { CTALink } from "@/components/CTAButton";
import { SITE } from "@/lib/site";

// Minimal header: wordmark on the left, one primary CTA on the right.
// No extra nav, so the focus stays on the diagnose and fix flow.
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
        <CTALink href="/tool" className="px-4 py-2 text-sm">
          Find My Cabinet Fix
        </CTALink>
      </div>
    </header>
  );
}
