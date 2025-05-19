import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, MousePointerClick } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
    const [headerImage, setHeaderImage] = useState("");
    const [copied, setCopied] = useState(false);

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

    useEffect(() => {
        const updateHeader = () => {
            if (window.innerWidth < 429) {
                setHeaderImage(
                    "https://greattakes.s3.us-east-2.amazonaws.com/sk/mobile_header.png"
                );
            } else {
                setHeaderImage(
                    "https://greattakes.s3.us-east-2.amazonaws.com/sk/web_header.png"
                );
            }
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
            .catch((err) => console.error("Failed to copy:", err));
    };

    return (
        <div className="bg-black min-h-screen flex flex-col">

            {/* Header */}
            <div
                className="w-screen max-h-[200px] p-6 
                flex flex-col justify-start items-center  /* ← added items-center */
                 text-white 
                bg-center bg-cover 
                transition-all duration-300 ease-in-out"
                style={{ backgroundImage: `url(${headerImage})` }}>

                <button
                    onClick={copyToClipboard}
                    className="text-lg sm:text-xl  mt-4 flex items-center  rounded-md hover:bg-pink-600 transition-colors tracking-wider font-mono">
                    <Mail size={24} />
                    <span style={{ marginLeft: '7px' }}>shannonkendall14@gmail.com </span>

                </button>

                <Link
                    to="/layout2"
                    aria-label="Switch layout"
                    className="mt-4 flex items-center hover:text-gray-300 transition-colors text-[#D1E231]">
                    <span className="mr-2 ">Prefer a different layout?</span>
                    <MousePointerClick size={24} />
                </Link>

                {copied && (
                    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 w-72 text-center px-5 py-2 rounded-md shadow-lg bg-[#D1E231] text-black font-mono z-50">
                        Email copied to clipboard!
                    </div>
                )}
            </div>

            {/* ——— Portfolio Grid ——— */}
            <main className="flex-1 flex items-center justify-center w-full px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {projects.map((proj, i) => (
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
                            <h3 className="mb-2 text-2xl font-bold text-[#fff] tracking-wide">{proj.app}</h3>

                            <p className="mb-4 font-mono text-sm opacity-80 text-[#D1E231] " >{proj.foundation}</p>

                            <p className="mb-6 text-base leading-relaxed text-[#fff] ">{proj.description}</p><span className="inline-block font-semibold text-[#D1E231] hover:underline text-mono ">View Project →</span>
                        </motion.a>
                    ))}
                </div>
            </main>
            <div className="font-mono text-white flex justify-center my-8 w-full px-4">
                “Simplicity is the ultimate sophistication.” – Leonardo da Vinci
            </div>
        </div>
    );
};

export default Home;