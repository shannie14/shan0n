// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
    {
        app: "Period.food",
        foundation: "Full-Stack Web App (React, Node.js, MongoDB)",
        description:
            "A tool for females to make hormone-balancing choices based on the current day of their cycle.",
        link: "https://www.period.food/",
    },
    {
        app: "The Red Carpet Lookbook",
        foundation: "Full-Stack Web App (React, Node.js, S3)",
        description: "Browse and search for celebrity red carpet looks.",
        link: "https://oscars-peach.vercel.app/",
    },
    {
        app: "Film Script BreakDown",
        foundation: "O&O AI model",
        description:
            "Generates production tools such shooting schedule, D.O.O.D., prop and wardrobe lists, etc., from a PDF script.",
        link: "/script",
    },
    {
        app: "Dashboard",
        foundation: "Full-Stack Web App (React, Node.js, MongoDB)",
        description: "Listing of media assets and performance metrics.",
        link: "https://mb-front.vercel.app/",
    },
];

export default function Home() {
    const [headerImage, setHeaderImage] = useState("");
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const updateHeader = () => {
            setHeaderImage(
                window.innerWidth < 429
                    ? "https://greattakes.s3.us-east-2.amazonaws.com/sk/mobile_header.png"
                    : "https://greattakes.s3.us-east-2.amazonaws.com/sk/web_header.png"
            );
        };
        updateHeader();
        window.addEventListener("resize", updateHeader);
        return () => window.removeEventListener("resize", updateHeader);
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText("shannonkendall14@gmail.com")
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(console.error);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* ——— Hero Section ——— */}
            <header
                className="relative h-[60vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${headerImage})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center px-6">

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
                            onClick={() => navigate("/layout2")}
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
                </div>
            </header>

            {/* ——— Portfolio Grid ——— */}
            <main className="flex-1 container mx-auto px-6 py-12">
                <h2 className="mb-8 text-3xl font-semibold border-b-2 border-green-500 inline-block">
                    Portfolio Highlights
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((proj, i) => (
                        <motion.a
                            key={i}
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                        >
                            <h3 className="mb-2 text-2xl font-bold">{proj.app}</h3>
                            <p className="mb-4 font-mono text-sm opacity-80">
                                {proj.foundation}
                            </p>
                            <p className="mb-6 text-base leading-relaxed">{proj.description}</p>
                            <span className="inline-block font-semibold text-green-500 hover:underline">
                                View Project →
                            </span>
                        </motion.a>
                    ))}
                </div>
            </main>

            {/* ——— Footer Quote ——— */}
            <footer className="py-8 bg-gray-800">
                <p className="max-w-md mx-auto text-center italic opacity-70">
                    “Simplicity is the ultimate sophistication.” – Leonardo da Vinci
                </p>
            </footer>
        </div>
    );
}
