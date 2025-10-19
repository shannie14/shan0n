import React from "react";
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
    // {
    //     app: "Film Script BreakDown",
    //     foundation: "O&O AI model",
    //     description:
    //         "Generates production tools such shooting schedule, DOOD, prop and wardrobe lists, etc. from PDF of film script.",
    //     link: "/script",
    // },
    {
        app: "Dashboard",
        foundation: "Full-Stack Web App (React, Node.js, MongoDB)",
        description:
            "Listing of media assets and performance metrics.",
        link: "https://mb-front.vercel.app/",
    },
];

const Projects = () => (
    <div className="pl-[2.5%] m-0 max-w-[95%]">
        {projects.map((project, idx) => (
            <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
            >
                <div className=" bg-[#D1E231] rounded-2xl shadow-[3px_3px_10px_rgba(0,0,0,0.3)] transition-shadow duration-300 ease-in-out hover:shadow-[6px_6px_15px_rgba(0,0,0,0.5)] mb-[1.53rem]">

                    <div className="p-4">

                        <h2 className="font-mono font-extrabold text-xl sm:text-4xl text-black mb-3">
                            {project.app}
                        </h2>

                        <p className="font-mono text-sm sm:text-base mb-[5px] font-semibold text-black mb-3">
                            {project.description}
                        </p>

                        <p className="font-mono text-sm sm:text-base text-black mb-3">
                            {project.foundation}
                        </p>

                        <button
                            onClick={() => window.open(project.link, "_blank")}
                            className="w-full mt-[10px] font-mono font-semibold text-xs sm:text-base text-[#D1E231] bg-black py-2 rounded-md hover:opacity-90"
                        >
                            Visit Site
                        </button>
                    </div>
                </div>
            </motion.div>
        ))}
    </div>
);

export default Projects;
