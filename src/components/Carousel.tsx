"use client";

import { useRef, useState, type ReactNode } from "react";

interface CarouselProps {
  /** One node per slide. Each becomes a scroll snap item. */
  children: ReactNode[];
  /** Accessible label for the scroll region. */
  label: string;
  /** Slide width on mobile. "peek" shows a hint of the next card. */
  slideWidth?: "full" | "peek";
}

// Lightweight CSS scroll snap carousel. No library. Buttons inside each slide stay
// fully usable, swipe is optional, and pagination dots reflect and control position.
// Keyboard users can tab to the dots to jump between slides.
export function Carousel({ children, label, slideWidth = "peek" }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Basis controls how much of the next card peeks in. Slides never get narrower
  // than a comfortable tap size.
  const basis = slideWidth === "full" ? "basis-full" : "basis-[85%]";

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    // The active slide is the one whose left edge is closest to the track's left.
    const center = track.scrollLeft;
    let nearest = 0;
    let best = Infinity;
    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const distance = Math.abs(slide.offsetLeft - track.offsetLeft - center);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    setActive(nearest);
  }

  function goTo(index: number) {
    const slide = slideRefs.current[index];
    const track = trackRef.current;
    if (!slide || !track) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        aria-label={label}
        role="group"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children.map((child, index) => (
          <div
            key={index}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            className={`${basis} shrink-0 snap-start`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Pagination dots, also keyboard controls to jump between slides. */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {children.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to item ${index + 1}`}
            aria-current={active === index ? "true" : undefined}
            className={`h-2.5 rounded-full transition-all ${
              active === index ? "w-6 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
