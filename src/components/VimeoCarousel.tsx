// components/VideoCarousel.tsx
import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const vimeoIds = [
  "949790343",
  "551238716",
  "264896253",
  "234933050",
  "949782281",
  "949784520",
  "949791871",
  "368199617",
];

function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function getItemsPerView(w: number) {
  if (w < 450) return 1;
  if (w < 1080) return 2;
  return 4;
}

export default function VideoCarousel() {
  const [itemsPerView, setItemsPerView] = useState<number>(
    typeof window !== "undefined" ? getItemsPerView(window.innerWidth) : 1
  );
  const [current, setCurrent] = useState(0);

  // Update itemsPerView on resize
  useEffect(() => {
    const onResize = () => {
      const next = getItemsPerView(window.innerWidth);
      setItemsPerView((prev) => {
        if (prev !== next) setCurrent(0); // reset to first page when layout changes
        return next;
      });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pages = useMemo(() => chunk(vimeoIds, itemsPerView), [itemsPerView]);
  const pageCount = pages.length;

  const prev = () => setCurrent((i) => (i === 0 ? pageCount - 1 : i - 1));
  const next = () => setCurrent((i) => (i === pageCount - 1 ? 0 : i + 1));

  return (
    <section className="py-6">
      <div className="max-w-[1080px] mx-auto w-full px-4">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow">
          {/* Buttons */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 shadow hover:bg-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 shadow hover:bg-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Track */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)`, width: `${pageCount * 100}%` }}
          >
            {pages.map((page, idx) => (
              <div key={idx} className="w-full flex-shrink-0 px-3 sm:px-4">
                <div className="flex gap-4">
                  {page.map((id) => (
                    <div
                      key={id}
                      className="relative overflow-hidden rounded-xl bg-black"
                      style={{ width: `${100 / itemsPerView}%` }}
                    >
                      {/* 16:9 box */}
                      <div className="pt-[56.25%]" />
                      <iframe
                        src={`https://player.vimeo.com/video/${id}`}
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        title={`Vimeo video ${id}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === current ? "bg-gray-900" : "bg-gray-400 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
