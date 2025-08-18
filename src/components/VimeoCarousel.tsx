// components/VimeoCarousel.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const vimeoIds = [
  '551238716',
  '949790343',
  '264896253',
  '234933050',
  '949782281',
  '949784520',
  '949791871',
  '368199617',
];

function getItemsPerView(w: number) {
  if (w < 450) return 1;
  return 2; // cap at 2 on >= 450px
}

export default function VimeoCarousel() {
  // Hydration-safe: start with 1, then compute on mount
  const [itemsPerView, setItemsPerView] = useState<number>(1);
  const [startIndex, setStartIndex] = useState(0);

  // Step: advance by 2 when showing 2, by 1 when showing 1
  const step = itemsPerView === 1 ? 1 : 2;

  // Highest valid starting index so last frame is filled
  const maxStart = useMemo(
    () => Math.max(0, vimeoIds.length - itemsPerView),
    [itemsPerView]
  );

  // Number of "stops" for dots (based on step)
  const stopCount = useMemo(() => {
    if (maxStart === 0) return 1;
    return Math.floor(maxStart / step) + 1;
  }, [maxStart, step]);

  // Update layout on mount + resize
  useEffect(() => {
    const onResize = () => {
      const next = getItemsPerView(window.innerWidth);
      setItemsPerView(prev => {
        if (prev !== next) setStartIndex(0); // reset when layout changes
        return next;
      });
    };
    onResize(); // run once on mount
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const prev = () => {
    const lastAligned = step * Math.floor(maxStart / step);
    setStartIndex(i => (i - step >= 0 ? i - step : lastAligned));
  };

  const next = () => {
    const lastAligned = step * Math.floor(maxStart / step);
    setStartIndex(i => (i + step <= lastAligned ? i + step : 0));
  };

  // Shift by item width
  const translatePct = (startIndex * 100) / itemsPerView;

  return (
    <section className="py-6">
      <div className="mx-auto w-full max-w-[1080px] px-4">
        <div className="relative overflow-hidden rounded-2xl">
          {/* Buttons */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center size-7 rounded-full bg-white/90 text-gray-700 shadow-md ring-1 ring-black/5 backdrop-blur transition duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1E231] focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center size-7 rounded-full bg-white/90 text-gray-700 shadow-md ring-1 ring-black/5 backdrop-blur transition duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D1E231] focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95"
          >
            <ChevronRight className="size-4" />
          </button>

          {/* Track */}
          <div
            className="flex transition-transform duration-500 ease-in-out will-change-transform"
            style={{ transform: `translateX(-${translatePct}%)` }}
          >
            {vimeoIds.map(id => (
              <div
                key={id}
                className="relative overflow-hidden rounded-xl bg-black px-2"
                style={{ flex: `0 0 ${100 / itemsPerView}%` }}
              >
                {/* 16:9 box */}
                <div className="pt-[56.25%]" />
                <iframe
                  src={`https://player.vimeo.com/video/${id}`}
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

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: stopCount }).map((_, stopIdx) => {
            const alignedIndex = stopIdx * step;
            const isActive =
              startIndex >= alignedIndex && startIndex < alignedIndex + step;
            return (
              <button
                key={stopIdx}
                onClick={() => setStartIndex(alignedIndex)}
                aria-label={`Go to set ${stopIdx + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  isActive ? 'bg-gray-900' : 'bg-gray-400 hover:bg-gray-500'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
