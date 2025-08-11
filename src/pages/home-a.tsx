import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, MousePointerClick, Video } from "lucide-react";
import { motion } from "framer-motion";
import { copyToClipboard } from "../utils/clipboard";
import Image from 'next/image';

import VimeoGrid from "../components/VimeoGrid";
// wherever you import it
import dynamic from "next/dynamic";
const VideoCarousel = dynamic(() => import("../components/VideoCarousel"), { ssr: false });


interface Project {
    app: string;
    foundation: string;
    description: string;
    link: string;
    photo: string;
  }
  
  const HomeA: React.FC = () => {
    const [headerImage, setHeaderImage] = useState<string>("");
    const [copied, setCopied] = useState<boolean>(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);
  
    const projects: Project[] = [
      {
        app: "Period.food",
        foundation: "Full-Stack Web App (React, Node.js, MongoDB)",
        description:
          "A tool for females to make hormone-balancing choices based on the current day of their cycle.",
        link: "https://www.period.food/",
        photo: "https://greattakes.s3.us-east-2.amazonaws.com/sk/pf_mobile.png",
      },
      {
        app: "The Red Carpet Lookbook",
        foundation: "Full-Stack Web App (React, Node.js, S3)",
        description: "Browse and search for celebrity red carpet looks.",
        link: "https://www.celebritylookbook.com/",
        photo: "https://greattakes.s3.us-east-2.amazonaws.com/sk/oscar_mobile.png",
      },
      {
        app: "Film Script BreakDown",
        foundation: "O&O AI model",
        description:
          "Generates production tools such as shooting schedules, D.O.O.D., prop & wardrobe lists, etc., from a PDF script.",
        link: "/script",
        photo: "https://greattakes.s3.us-east-2.amazonaws.com/sk/hold_mobile.png",
      },
      {
        app: "Dashboard",
        foundation: "Full-Stack Web App (React, Node.js, MongoDB)",
        description: "Listing of media assets and performance metrics.",
        link: "https://lb-front2.vercel.app",
        photo: "https://greattakes.s3.us-east-2.amazonaws.com/sk/hold_mobile.png",
      },
    ];
  
    useEffect(() => {
      const updateHeader = () => {
        const isMobile = window.innerWidth < 429;
        setHeaderImage(
          isMobile
            ? "https://greattakes.s3.us-east-2.amazonaws.com/sk/mobile_header.png"
            : "https://greattakes.s3.us-east-2.amazonaws.com/sk/web_header.png"
        );
      };
  
      updateHeader();
      window.addEventListener("resize", updateHeader);
      return () => window.removeEventListener("resize", updateHeader);
    }, []);
  
    const handleCopy = (): void => {
      copyToClipboard(
        "shannonkendall14@gmail.com",
        (): void => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        },
        (err: unknown): void => {
          console.error("Failed to copy:", err);
        }
      );
    };
    
    return (
      <div className="bg-black min-h-screen flex flex-col">
        {/* Header */}
        <div
          className="w-screen max-h-[200px] p-6 flex flex-col justify-start items-center text-white bg-center bg-cover transition-all duration-300 ease-in-out"
          style={{ backgroundImage: `url(${headerImage})` }}
        >
          <button
            onClick={handleCopy}
            className="text-lg sm:text-xl mt-4 flex items-center rounded-md hover:bg-pink-600 transition-colors tracking-wider font-mono"
          >
            <Mail size={24} />
            <span className="ml-2">shannonkendall14@gmail.com</span>
          </button>
  
          <Link
            href="/home-b"
            className="mt-4 flex items-center hover:text-gray-300 transition-colors text-[#D1E231]"
          >
            <span className="mr-2">Prefer a different layout?</span>
            <MousePointerClick size={24} />
          </Link>
  
          {copied && (
            <div className="fixed top-5 left-1/2 transform -translate-x-1/2 w-72 text-center px-5 py-2 rounded-md shadow-lg bg-[#D1E231] text-black font-mono z-50">
              Email copied to clipboard!
            </div>
          )}
        </div>
  
        {/* Project Grid */}
        <main>
          <div className="text-center mx-auto px-4 max-w-3xl">

            <div className="mt-6">
              <p className="text-white">
                With a background in media operations, creative production, and full-stack development, I specialize in
                leading content-driven campaigns, building digital tools, and managing cross-platform distribution. 
                <button
                onClick={() => setIsResumeOpen(true)}
                className="pt-4 text-[#FF1DCE] hover:text-[#D1E231] focus:outline-none"
              >
                You can find my full experience here.
              </button>
              </p>
            </div>
          </div>

          {isResumeOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setIsResumeOpen(false)}>

              <div className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 h-3/4"
                onClick={e => e.stopPropagation()}>

                  {/* Close button */}
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="absolute top-2 right-2 text-gray-700 text-2xl leading-none"
                    aria-label="Close">
                    &times;
                  </button>

                  {/* PDF viewer */}
                  <iframe
                    src="https://greattakes.s3.us-east-2.amazonaws.com/sk/resume25.pdf"
                    className="w-full h-full rounded-b-lg"
                    title="Resume PDF"/>
              </div>
            </div>
          )}
  
        {/* EDITOR SHOWCASE */}
        <div className="mx-4 py-8 border-b-2 border-b-white">
          <h1>SHORT-FORM CONTENT</h1>
          <p className="text-white text-med mb-4">A selecition of videos I edited and took part in producing.</p>
          <div className=" mx-auto">
          <VimeoGrid />
          </div>
       
          {/* <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://vimeo.com/showcase/8473600/embed"
              allowFullScreen
              frameBorder="0"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
          </div> */}
        </div>

        <div className="mx-4 py-8 border-b-2 border-b-white">
          <h1>FILMS / TV / MUSIC VIDEOS</h1>
          <div className="max-w-[1500px] mx-auto">
          <VideoCarousel />
          </div>
       
          {/* <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://vimeo.com/showcase/8473600/embed"
              allowFullScreen
              frameBorder="0"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
          </div> */}
        </div>


        {/* DEVELOPER SHOWCASE */}
          <div className="m-6">
            <h1>DEVELOPER SHOWCASE</h1>
            <p className="text-white text-lg">
              The projects showcased here are small JavaScript-based demos—just a glimpse into my broader capabilities.
            </p>
          </div>
         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4">          {projects.map((proj, i) => (
            <motion.a
              key={i}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-[#0D98BA]/50 rounded-2xl shadow-lg hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className="flex flex-col flex-1">
                <h3 className="mb-2 text-2xl font-bold text-white tracking-wide">{proj.app}</h3>
                <p className="text-base text-white leading-relaxed mb-4">{proj.description}</p>

                <div className="flex flex-row items-center gap-6">
                  <div className="flex flex-col gap-4 text-white">
                    <p>Architecture</p>
                    <p className="text-sm">
                      <span className="font-bold">Current:</span>
                      <br />
                      {proj.foundation}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold">Future:</span>
                      <br />
                      {proj.foundation}
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

              <span className="inline-block font-semibold text-[#D1E231] hover:underline text-mono mt-4">
                View Project →
              </span>
            </div>
            </motion.a>
          ))}
          </div>


        </main>
  
        <div className="font-mono text-white flex justify-center my-8 w-full px-4">
        &quot;Simplicity is the ultimate sophistication.&quot; – Leonardo da Vinci
        </div>
      </div>
    );
  };
  
  export default HomeA;