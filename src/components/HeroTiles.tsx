// HeroTiles.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';


export default function HeroTiles() {

  return (
    <section className="relative isolate w-full overflow-hidden text-white mb-8 sm:mb-12 ">
      {/* Animation */}
        <div className="relative mx-8 sm:mx-auto flex max-w-4xl flex-col items-center px-4 pt-6 sm:pt-12 sm:pt-16">
            
            {/* Tiles */}
            <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid w-full gap-4 sm:gap-6 md:grid-cols-2 ">
            <Tile href="#dev" label="Digital" />
            <Tile href="#video" label="Creative" delay={0.08} />
            </motion.div>

            {/* PROFESSIONAL */}
            <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 sm:mt-6 text-center">

            <span className="uppercase font-[400] tracking-[0.2em] sm:tracking-[0.2em] text-[30px] sm:text-[80px] text-cadetGray/40"  >
                Professional
            </span>
            </motion.div>
        </div>
    </section>
  );
}

/* ------------------------ Title Animation ------------------------ */
function Tile({
  href,
  label,
  delay = 0,
}: {
  href: string;
  label: string;
  delay?: number;
}) {
  const tilePopDuration = 0.55;
  const textStartDelay = delay + tilePopDuration * 0.7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: tilePopDuration, ease: [0.22, 1, 0.36, 1], delay }}>

        <Link
            href={href}
            className="group block rounded-2xl border-x-4 border-cadetGray/40 px-2 py-8 sm:py-16 text-center transition-transform duration-300 will-change-transform hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
    
            <WriteOnText text={label} delay={textStartDelay} />
        
        </Link>

    </motion.div>
  );
}

/* ------------------------ Text Animation ------------------------ */
function WriteOnText({ text, delay = 0 }: { text: string; delay?: number }) {

const fontStack =
  '"Cookie", "Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive';

  return (
    <div className="relative z-10 flex items-center justify-center">
      <motion.svg
        viewBox="0 0 1000 200"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-[56px] sm:h-[68px] md:h-[80px]"
        initial={false} >

        {/* stroke text */}
        <motion.text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="font-medium stroke-bone text-[200px] tracking-wider"
        style={{ fontFamily: fontStack }}
        fill="transparent"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ delay, duration: 1.1, ease: 'easeInOut' }}>
        {text}
        </motion.text>

        {/* filled text */}
        <motion.text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="font-light text-[200px] text-bone tracking-wider"
        fill="currentColor"
        style={{ fontFamily: fontStack }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.9, duration: 0.35 }}>
        {text}
        </motion.text>

      </motion.svg>
    </div>
  );
}
