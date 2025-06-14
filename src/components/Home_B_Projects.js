// src/components/ProjectsCarousel.jsx
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MousePointerClick } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

const projects = [
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

export default function ProjectsCarousel() {
    const [current, setCurrent] = useState(0);
    const prev = () =>
        setCurrent((i) => (i === 0 ? projects.length - 1 : i - 1));
    const next = () =>
        setCurrent((i) => (i === projects.length - 1 ? 0 : i + 1));

    return (
        <div className="flex flex-col items-center py-6">
            <div className="relative w-[90%] sm:w-full sm:max-w-[650px] mx-auto">
                {/* ← Prev / Next */}
                <button
                    onClick={prev}
                    className="absolute -left-6 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition"
                >
                    <ChevronLeft size={24} className="text-gray-700" />
                </button>
                <button
                    onClick={next}
                    className="absolute -right-6 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition"
                >
                    <ChevronRight size={24} className="text-gray-700" />
                </button>

                {/* ← AnimatePresence with mode="wait" */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col justify-between w-full"
                    >
                        <div className="flex flex-col flex-1 ">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                {projects[current].app}
                            </h3>
                            <p className="text-base text-gray-700 leading-relaxed mb-4">
                                {projects[current].description}
                            </p>
                        </div>

                        <div className="flex flex-row items-center gap-6">
                            <div className="flex flex-col gap-4 ">
                                <p>Architecture</p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-bold">Current:</span>
                                    <br />
                                    {projects[current].foundation}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-bold">Future:</span>
                                    <br />
                                    {projects[current].foundation}
                                </p>
                            </div>

                            <div className="relative w-1/2 h-[200px]">
                                <Image
                                    src={projects[current].photo}
                                    alt={`${projects[current].app} screenshot`}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                window.open(projects[current].link, "_blank")
                            }
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-[#f5e1c2] text-gray-800 font-medium py-2 rounded-md hover:bg-[#e8d3ac] transition"
                        >
                            View Project <MousePointerClick size={16} />
                        </button>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ← Dots */}
            <div className="flex justify-center gap-3 mt-6">
                {projects.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`transition rounded-full ${idx === current ? "bg-gray-800" : "bg-gray-400"
                            } w-4 h-4 sm:w-3 sm:h-3`}
                    />
                ))}
            </div>
        </div>
    );
}
