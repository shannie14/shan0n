// components/VideoCarousel.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const vimeoIds = [
  "949790343",
  "551238716",
  "234933050",
  "264896253",


  "949782281",
  "949784520",
  "886651481",
  "949791871",
  "368199617",
  "192596156"
];

// Use standard Tailwind breakpoints: 1024 (lg), 640 (sm)
function itemsPerViewForWindow(w: number) {
  if (w >= 1024) return 4; // desktop → 4 across
  if (w >= 640) return 2;  // tablet  → 2 across
  return 1;                // mobile  → 1 across
}

export default function VideoCarousel() {
  const [itemsPerView, setItemsPerView] = useState(1);
  const [start, setStart] = useState(0); // first visible index

  // Decide 1/2/4 based on window width and keep updated on resize
  useEffect(() => {
    const update = () => setItemsPerView(itemsPerViewForWindow(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Build the visible window (length = itemsPerView)
  const visibleIds = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i < itemsPerView; i++) {
      out.push(vimeoIds[(start + i) % vimeoIds.length]);
    }
    return out;
  }, [start, itemsPerView]);

  const next = () => setStart((i) => (i + 1) % vimeoIds.length);
  const prev = () => setStart((i) => (i - 1 + vimeoIds.length) % vimeoIds.length);

  return (
    <section className="py-4">
      <div className="max-w-[1400px] mx-auto w-full px-2 sm:px-4">
        <div className="relative">
          {/* Chevrons */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow"
          >
            <ChevronLeft className="h-5 w-5 text-gray-900" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow"
          >
            <ChevronRight className="h-5 w-5 text-gray-900" />
          </button>

          {/* EXACTLY ONE ROW — 1/2/4 columns */}
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${itemsPerView}, minmax(0,1fr))` }}
          >
            {visibleIds.map((id) => (
              <div key={id} className="relative overflow-hidden rounded-xl bg-black">
                {/* 16:9 ratio */}
                <div className="pt-[56.25%]" />
                <iframe
                  src={`https://player.vimeo.com/video/${id}?badge=0&title=0&byline=0&portrait=0`}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  title={`Vimeo video ${id}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots (optional) */}
        <div className="flex justify-center gap-2 mt-3">
          {vimeoIds.map((_, i) => (
            <button
              key={i}
              onClick={() => setStart(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === start ? "bg-white" : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to video ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
