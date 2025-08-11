// src/components/VideoCarousel.tsx
"use client";

import React, { useState, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Video = {
  title: string;
  description?: string;
  url: string;
};

/** Accepts:
 *  - YouTube: https://www.youtube.com/watch?v=ID or https://youtu.be/ID
 *  - Vimeo:   https://vimeo.com/ID or https://player.vimeo.com/video/ID
 */
function getEmbedUrl(url: string): string {
  try {
    const u = new URL(url);

    // YouTube
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    // Vimeo
    if (u.hostname.includes("vimeo.com")) {
      const parts = u.pathname.split("/").filter(Boolean);
      const id = parts.pop();
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
      if (u.hostname.includes("player.vimeo.com")) return url;
    }

    return url;
  } catch {
    return url;
  }
}

const videos: Video[] = [
  { title: "Bros - the series", description: "Producer • 2016", url: "https://vimeo.com/257750168" },
  { title: "Word To The Trees by whatever mike", description: "Producer • 2021", url: "https://www.youtube.com/watch?v=bmpoazNzOYE" },
  { title: "Hedgehog", description: "Associate Producer • 2017", url: "https://www.youtube.com/watch?v=7OrVI_qSGw4" },
  { title: "Chocolate City", description: "Production Manager • 2015", url: "https://www.youtube.com/watch?v=3Uiba2NxTtc" },
  { title: "Tom Colicchio's The Pantry", description: "Assistant Director • 2024", url: "https://www.youtube.com/watch?v=oJmy8Wr6Cwo" },
  { title: "Riddle Room", description: "Producer • 2011", url: "https://www.youtube.com/watch?v=RJPL5tYTF54" },
  { title: "Kissing Booth - festival short", description: "Producer • 2015", url: "https://vimeo.com/78923296" },
];

export default function VideoCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((i) => (i === 0 ? videos.length - 1 : i - 1));
  }, []);
  const next = useCallback(() => {
    setCurrent((i) => (i === videos.length - 1 ? 0 : i + 1));
  }, []);

  // Guaranteed non-undefined via fallback
  const active = useMemo<Video>(() => videos[current] ?? videos[0], [current]);

  return (
    <div className="max-w-[800px] mx-auto w-full px-8">
      <div className="relative">
        {/* Prev / Next */}
        <button
          onClick={prev}
          aria-label="Previous video"
          className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition"
        >
          <ChevronLeft className="size-5 sm:size-6 text-gray-700" />
        </button>
        <button
          onClick={next}
          aria-label="Next video"
          className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition"
        >
          <ChevronRight className="size-5 sm:size-6 text-gray-700" />
        </button>

        {/* Slide */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45 }}
            className="p-5 sm:p-7"
          >
            <header className="mb-2">
              <h3 className="text-base sm:text-lg font-semibold text-white">{active.title}</h3>
              {active.description && <p className="text-sm text-gray-400 mt-1">{active.description}</p>}
            </header>

            {/* 16:9 */}
            <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden bg-black">
              <iframe
                src={getEmbedUrl(active.url)}
                className="absolute inset-0 w-full h-full"
                title={active.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 sm:gap-3 mt-6">
        {videos.map((v, idx) => (
          <button
            key={v.url}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => setCurrent(idx)}
            className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition ${
              idx === current ? "bg-gray-900" : "bg-gray-400 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
