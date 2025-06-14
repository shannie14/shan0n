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
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#fdfbf5] to-white text-neutral-900 font-sans">


            <header className="relative h-[60vh] overflow-hidden">
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
                    <div
                        className="bg-white bg-[url('https://greattakes.s3.us-east-2.amazonaws.com/sk/mobile_dove.png')] bg-cover bg-center
                       md:bg-[url('https://greattakes.s3.us-east-2.amazonaws.com/sk/tablet_dove.png')]
                       lg:bg-[url('https://greattakes.s3.us-east-2.amazonaws.com/sk/desktop_dove.png')]
                       backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20"
                    >
                        <p className="text-xl md:text-2xl lg:text-3xl font-playfair text-white leading-snug drop-shadow-sm">
                            &quot;Creative Technologist with a Producer&apos;s Soul.
                        </p>
                        <p className="mt-4 text-base md:text-lg text-gray-300 font-light italic">
                            A whip-smart builder at the intersection of art and code.&quot; <br></br>– ChatGPT
                        </p>
                    </div>
                </motion.div>

                {/* Optional accent border on bottom */}
                <div className="absolute bottom-0 w-full h-[3px] bg-gradient-to-r from-[#fceabb] via-[#f8b500] to-[#fceabb]" />
            </header>




            <div className="flex flex-wrap items-center justify-center gap-4">
                {/* Email Button */}
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2  rounded-md hover:bg-green-600 transition"
                >
                    <Mail size={18} />{" "}
                    <span className="font-mono text-sm md:text-base">
                        shannonkendall14@gmail.com
                    </span>
                </button>

                {/* Layout Switch */}
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 px-4 py-2 border border-white rounded-md hover:bg-white hover:text-gray-900 transition"
                >
                    <LayoutGrid size={18} />{" "}
                    <span className="font-mono text-sm md:text-base">Alternate View</span>
                </button>
            </div>

            {copied && (
                <div className="absolute top-6 flex items-center gap-2 bg-green-600 px-4 py-2 rounded shadow-lg">
                    <Mail size={16} /> <span>Email copied!</span>
                </div>
            )}


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
