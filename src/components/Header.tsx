import Link from "next/link";
import { SITE } from "@/lib/site";

// Simple site header. Placeholder styling, semantic structure for a later redesign.
export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold">
          {SITE.name}
        </Link>
        <nav aria-label="Primary" className="hidden gap-6 text-sm font-medium sm:flex">
          <Link href="/kitchen-sink-reset" className="hover:text-blue-700">
            Kitchen Sink Reset
          </Link>
          <Link href="/under-sink-organizer-measurement-guide" className="hover:text-blue-700">
            Measurement Guide
          </Link>
          <Link href="/tool" className="hover:text-blue-700">
            Find My Fix
          </Link>
        </nav>
      </div>
    </header>
  );
}
