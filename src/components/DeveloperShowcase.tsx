// components/DeveloperShowcase.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {devProjects, type Project} from './data/devProjects'

// export type DevProject = {
//   app: string;
//   description: string;
//   foundation: string;
//   future?: string;
//   photo: string;
//   link: string;
// };

type Props = {
  projects?: Project[];   // <-- optional
  className?: string;
  title?: string;
  subtitle?: string;
};

export default function DeveloperShowcase({
  projects = devProjects,     // <-- default to your data
  className = '',
  title = 'Digital Portfolio',
  subtitle,
}: Props) {
  // Helpful dev-time hint if somehow empty:
  if (process.env.NODE_ENV !== 'production' && projects.length === 0) {
    console.warn('DeveloperShowcase: no projects provided.');
  }

return (
    <section className={className}>
      <div className="mx-auto max-w-6xl px-2 ">
        <h2 className="mb-14 sm:mb-16 uppercase font-[600] tracking-[0.1em] sm:tracking-[0.2em] text-[30px] sm:text-[50px] text-cadetGray/40 text-center">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-center text-cadetGray/80">{subtitle}</p>
        )}

        {projects.length === 0 ? (
          <div className="p-4 text-white/70">No projects to show.</div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {projects.map((proj, i) => (
              <motion.a
                key={proj.link || `${proj.app}-${i}`}
                href={proj.link}
                target={proj.link?.startsWith('/') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="block p-6  bg-babypowder rounded-2xl shadow-lg hover:shadow-2xl transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
              >
                <div className="flex flex-col">
                  <h3 className="mb-2 text-xl font-bold text-cadetGray/60 tracking-wide">{proj.app}</h3>
                  <p className="text-base text-cadetGray/60 italic leading-relaxed mb-3">
                    {proj.description}
                  </p>
                  <div className="text-sm text-cadetGray/60">
                    <span className="font-semibold">Foundation:</span> {proj.foundation}
                  </div>

                  <div className="mt-4 flex items-center gap-6">
                    <div className="relative w-[120px] h-[200px] flex-shrink-0">
                      <Image
                        src={proj.photo}
                        alt={`${proj.app} screenshot`}
                        fill
                        className="object-contain"
                        sizes="120px"
                      />
                    </div>
                    <span className="inline-block font-semibold text-bone hover:text-black font-mono">
                      View Project →
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}