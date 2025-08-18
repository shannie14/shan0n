// components/DeveloperShowcase.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export type DevProject = {
  app: string;
  description: string;
  foundation: string;
  future?: string;
  photo: string;
  link: string;
};

type Props = {
  projects?: DevProject[];   // <-- optional
  className?: string;
  title?: string;
  subtitle?: string;
};

export default function DeveloperShowcase({
  projects = [],           
  className = '',
}: Props) {
  if (process.env.NODE_ENV !== 'production' && projects.length === 0) {
    console.warn('DeveloperShowcase: no projects provided.');
  }

  return (
    <section className={className}>

      {projects.length === 0 ? (
        <div className="p-4 text-white/70">No projects to show.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-2 sm:py-4">
          {projects.map((proj, i) => (
            <motion.a
              key={proj.link || `${proj.app}-${i}`}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-[#003253]/50 rounded-2xl shadow-lg hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className="flex flex-col flex-1">
                {/* Project Name & Description */}
                <div >
                  <h3 className="mb-2 text-xl font-bold text-white tracking-wide">{proj.app}</h3>
                  <p className="text-base text-gray-300 italic leading-relaxed mb-4">{proj.description}</p>
                  <div className="border-b border-gray-400 w-[300px] sm:w-[200px]"> </div>
                </div>
          
                {/* Architecture & Image */}
                <div className="flex flex-row items-center gap-6 mt-4">
                  <div className="flex flex-col gap-4 text-white rounded-lg tracking-wider ">
                    <p>Architecture:</p>
                    <p className="text-sm text-gray-400">
                      <span className="font-bold">Current:</span>
                      <br />
                      {proj.foundation}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold">Future:</span>
                      <br />
                      {proj.future ?? proj.foundation}
                    </p>
                  </div>

                  <div className="relative w-[120px] h-[200px] flex-shrink-0">
                    <Image
                      src={proj.photo}
                      alt={`${proj.app} screenshot`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <span className="inline-block font-semibold text-[#D1E231] hover:underline font-mono mt-4">
                  View Project →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </section>
  );
}
