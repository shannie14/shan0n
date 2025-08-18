'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// import Link from 'next/link';
// import { MousePointerClick } from 'lucide-react';


// tsx
import ClickableEmail from '../components/clickableEmail';
import ResumeA from '../components/resumeA';
import VimeoCarousel from '../components/VimeoCarousel'
import DeveloperShowcase from '../components/DeveloperShowcase';

//ts
import { devProjects } from '../components/data/devProjects';

// dynamic import (only downloaded when this page needs it)
const VideoCarousel = dynamic(() => import('../components/VideoCarousel'), { ssr: false });

export default function HomeA() {
  const [headerImage, setHeaderImage] = useState<string>('');
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  // render responsive header image
  useEffect(() => {
    const updateHeader = () => {
      const isMobile = window.innerWidth < 450;
      setHeaderImage(
        isMobile
          ? 'https://greattakes.s3.us-east-2.amazonaws.com/sk/mobile_header.png'
          : 'https://greattakes.s3.us-east-2.amazonaws.com/sk/web_header.png'
      );
    };
    updateHeader();
    window.addEventListener('resize', updateHeader);
    return () => window.removeEventListener('resize', updateHeader);
  }, []);

  return (
    <div className="bg-black flex flex-col">

      {/* Layout Alternate */}
      {/* <Link
        href="/home-b"
        title="Switch to alternate layout"
        className="fixed top-3 right-3 z-50 inline-flex items-center gap-1.5
                   rounded-full border border-white/15 bg-white/5 backdrop-blur
                   px-3 py-1.5 text-xs font-medium text-white/90
                   transition hover:bg-white/10 focus:outline-none
                   focus-visible:ring-2 focus-visible:ring-[#D1E231]/60"
      >
        <span>Layout&nbsp;B</span>
        <MousePointerClick className="h-3.5 w-3.5" />
      </Link> */}

      {/* Header */}
      <div
        className="w-screen max-h-[200px] p-6 flex flex-col justify-start items-center text-white bg-center bg-cover transition-all duration-300 ease-in-out"
        style={{ backgroundImage: headerImage ? `url(${headerImage})` : undefined }}
      >
      <ClickableEmail />
      </div>

      {/* Main */}
      <main className="scroll-smooth">
        {/* bio and resume */}
        <div className="w-full sm:w-2/3 pt-4 mx-auto">
          <p className="px-4 text-gray-300 text-center text-base sm:text-lg leading-relaxed sm:leading-8 font-sans antialiased">
          With a background in media operations, creative production, and full-stack development, I specialize in
          leading content-driven campaigns, building digital tools, and managing cross-platform distribution.
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

        {/* row menu */}
        <nav className="sticky max-w-[50%] mx-auto mb-4 z-40 " aria-label="Section navigation">

          <ul className="flex justify-center text-center text-sm text-black tracking-widest gap-2">
            <li>
              <a href="#films" 
                className="inline-flex items-center justify-center text-center h-[50px] w-[110px] sm:w-[200px] rounded-lg bg-[#D1E231]/90 transition hover:text-[#FF1DCE]">
                TV / Film
              </a>
            </li>
         
            <li>
              <a href="#marketing"
                className="inline-flex items-center justify-center text-center h-[50px] w-[110px] sm:w-[200px] rounded-lg bg-[#D1E231]/90 transition hover:text-[#FF1DCE]">
                Marketing Content
              </a>
            </li>
          
            <li>
              <a href="#dev"
                className="inline-flex items-center justify-center text-center h-[50px] w-[110px] sm:w-[200px] rounded-lg bg-[#D1E231]/90 transition hover:text-[#FF1DCE]">
                Full-stack Applications
              </a>
            </li>
          </ul>
        </nav>

        {/* part 1 */}
        <section
          id="films"
          className="scroll-mt-24 mx-auto w-full sm:w-1/2 rounded-lg pt-2
                    bg-[radial-gradient(80%_60%_at_20%_10%,#22d3ee33_0%,transparent_60%),radial-gradient(80%_60%_at_80%_90%,#ff1dce33_0%,transparent_60%),linear-gradient(180deg,#0a0d18,#0c0f1c)]
                    ring-1 ring-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
        >
          <h1 className="text-white text-lg font-bold text-center">TV / FILM / MUSIC VIDEOS</h1>
          <VideoCarousel />
        </section>

        {/* part 2 */}
        <section
          id="marketing"
          className="scroll-mt-24 mx-auto w-full sm:w-1/2 rounded-lg pt-4 mt-4
                    bg-[radial-gradient(78%_58%_at_85%_15%,#22d3ee29_0%,transparent_60%),radial-gradient(78%_58%_at_15%_85%,#ff1dce29_0%,transparent_60%),linear-gradient(180deg,#0a0d18,#0c0f1c)]
                    ring-1 ring-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
        >
          <div className="text-center">
            <h1 className="text-white text-lg font-bold mb-0">MARKETING CONTENT</h1>
            <p className="mt-0 text-gray-400">Showcase of editing skills.</p>
          </div>
          <VimeoCarousel />
        </section>

        {/* part 3 */}
        <section id="dev" className="scroll-mt-24 w-full sm:w-1/2 mx-auto">
          <div
            className="rounded-lg p-4 mt-4 text-center
                      bg-[linear-gradient(135deg,#ff1dce29_0%,transparent_60%),linear-gradient(315deg,#22d3ee29_0%,transparent_60%),linear-gradient(180deg,#0a0d18,#0c0f1c)]
                      ring-1 ring-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
          >
            <h1 className="text-white text-lg font-bold tracking-wide mb-0">FULL-STACK APPS</h1>
            <p className="text-med text-gray-400 mt-0">Portfolio of projects I’ve architected and developed.</p>
          </div>
          <div className="mx-auto rounded-lg">
            <DeveloperShowcase projects={devProjects} />
          </div>
        </section>
      </main>


      {/* Footer */}
      <footer className="text-center m-4">
        <div className="font-mono text-white text-xs">
          &quot;Simplicity is the ultimate sophistication.&quot; – Leonardo da Vinci
        </div>
      </footer>
    </div>
  );
}
