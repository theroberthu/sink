import Link from "next/link";
import { SITE } from "@/lib/site";

const AFFILIATE_NOTE =
  "Some product links may earn us a commission at no extra cost to you. We recommend products based on fit, usefulness, and availability.";

// Footer with the affiliate disclosure note and legal links.
export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <p className="mb-6 max-w-2xl text-sm text-slate-600">{AFFILIATE_NOTE}</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
          <Link href="/privacy" className="hover:text-blue-700">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-blue-700">
            Terms of Use
          </Link>
          <Link href="/affiliate-disclosure" className="hover:text-blue-700">
            Affiliate Disclosure
          </Link>
        </nav>
        <p className="mt-6 text-xs text-slate-500">
          {String.fromCharCode(169)} {new Date().getFullYear()} {SITE.name}. {SITE.tagline}
        </p>
      </div>
    </footer>
  );
}
