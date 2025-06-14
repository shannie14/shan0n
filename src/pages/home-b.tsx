import React, { useState } from "react";
import Link from "next/link";
import { Mail, LayoutGrid, MousePointerClick } from "lucide-react";
import { motion } from "framer-motion";
import { copyToClipboard } from "../utils/clipboard";
import ProjectsCarousel from "../components/Home_B_Projects";

const HomeB: React.FC = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        copyToClipboard(
          "shannonkendall14@gmail.com",
          () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          },
          (err) => console.error("Failed to copy:", err)
        );
      };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#fdfbf5] to-white text-neutral-900 font-josefin">


            <header className="relative h-[25vh] overflow-hidden">
                {/* Responsive Background Image */}
                <div className="absolute inset-0">

                </div>

                {/* Soft spotlight effect */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />

                {/* Animated quote */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-24"
                >

                    <p className="text-xl md:text-2xl lg:text-3xl font-josefin text-black leading-snug drop-shadow-sm ">
                        “Creative Technologist with a Producer’s Soul.
                    </p>
                    <p className="mt-4 text-base md:text-lg text-black font-josefin font-light italic">
                        A whip-smart builder at the intersection of art and code." <br></br>– ChatGPT
                    </p>
                </motion.div>
            </header>

            <Link
  href="/home-a"
  className="mt-8 flex justify-center"
>
  <div className="flex items-center space-x-2 bg-[#f5f5dc] text-black px-4 py-2 rounded-lg shadow-sm hover:bg-[#e6e6c7] transition">
    <span className="font-medium">Prefer a different layout?</span>
    <MousePointerClick size={20} />
  </div>
</Link>


            <ProjectsCarousel />



            {/* ——— Footer Quote ——— */}
            <footer className="text-center py-8">
                <p className="italic font-serif text-neutral-700">
                &quot;Simplicity is the ultimate sophistication.&quot;
                    <span className="block mt-2 font-medium">– Leonardo da Vinci</span>
                </p>
            </footer>
        </div>
    );
}
export default HomeB;