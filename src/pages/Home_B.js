import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import ProjectsCarousel from "../components/Home_B_Projects";

export default function Home() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText("shannonkendall14@gmail.com")
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(console.error);
    };
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#fdfbf5] to-white text-neutral-900 font-josefin">


            <header className="relative h-[45vh] overflow-hidden">
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


                {/* Optional accent border on bottom */}
                {/* <div className="absolute bottom-0 w-full h-[3px] bg-gradient-to-r from-[#fceabb] via-[#f8b500] to-[#fceabb]" /> */}
            </header>

            <ProjectsCarousel />

            {/* ——— Footer Quote ——— */}
            <footer className="text-center py-8">
                <p className="italic font-serif text-neutral-700">
                    “Simplicity is the ultimate sophistication.”
                    <span className="block mt-2 font-medium">– Leonardo da Vinci</span>
                </p>
            </footer>
        </div>
    );
}
