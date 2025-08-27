// home.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import HeroTiles from '../components/HeroTiles';
import ClickableEmail from '../components/clickableEmail';
import ResumeA from '../components/resumeA';
import DeveloperShowcase from '../components/DeveloperShowcase';
import VideoCarousel from '../components/VideoCarousel';
import VimeoCarousel from '../components/VimeoCarousel';

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  return (
    <div className="bg-babypowder">
       <main className="flex flex-col">
        <HeroTiles />
  
    <div className="flex flex-col items-center ">
        <Image
          src="https://greattakes.s3.us-east-2.amazonaws.com/SK_beige.png"
          alt="Shannon"
          width={300}
          height={300}
          className="rounded-2xl shadow-lg shadow-black/5 object-cover"
          />
       
        <ClickableEmail />
       
        {/* bio and resume */}
        <div className="mt-6 items-center ">
          <p className="w-[90%] sm:w-[60%] mx-auto text-cadetGray/70 text-center text-base sm:text-lg leading-relaxed sm:leading-8 font-sans antialiased">
            With a background in media operations, creative production and full-stack development, I specialize in
            producing content-driven campaigns, building digital tools, and managing cross-platform distribution.
          </p>
          <ResumeA onOpenResume={() => setIsResumeOpen(true)} className="pt-2 pb-4" />
          {isResumeOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
              onClick={() => setIsResumeOpen(false)}
            >
              <div
                className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 h-3/4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setIsResumeOpen(false)}
                  className="absolute top-2 right-2 text-gray-700 text-2xl leading-none"
                  aria-label="Close"
                >
                  &times;
                </button>
                <iframe
                  src="https://greattakes.s3.us-east-2.amazonaws.com/sk/resume25.pdf"
                  className="w-full h-full rounded-b-lg"
                  title="Resume PDF"
                />
              </div>
            </div>
          )}
        </div>

        </div>

        <section id="dev" className="mt-14 sm:mt-20 pt-16 border-t-[6px] border-cadetGray/20 bg-whiteSmoke/70 w-full">
          <DeveloperShowcase />
        </section>

        <section id="video" className="mt-14 sm:mt-20 pt-10 border-t-[6px] border-cadetGray/20 "> 

          <h2 className="mb-8  uppercase font-[600] tracking-[0.1em] sm:tracking-[0.15em] text-[25px] sm:text-[45px] text-cadetGray/60 text-center">TV / Film / Music Videos  </h2>
          <div className=" w-full mb-8 "><VideoCarousel  /></div>

          <h2 className="uppercase font-[600] tracking-[0.1em] sm:tracking-[0.15em] text-[25px] sm:text-[45px] text-cadetGray/60 text-center">Marketing Content  </h2>
          <p className="text-center text-cadetGray/80 mt-0 mb-4">Showcase of editing skills.</p>
          <div className=" w-full mb-16 "><VimeoCarousel  /></div>

        </section>
      
      </main>

      <footer className="text-center mb-4">
        <div className="font-mono text-black text-xs">
          &quot;Simplicity is the ultimate sophistication.&quot; – Leonardo da Vinci
        </div>
      </footer>

    </div>
  );
}
