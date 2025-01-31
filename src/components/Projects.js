import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Typography, Button } from "@mui/material";

const projects = [
    {
        app: "Period.food ",
        type: "Full-Stack Web App (React, Node.js, MongoDB)",
        description: "A tool for females to make hormone-balancing choices based on the current day of their cycle.",
        link: "https://www.period.food/",
    },
    {
        app: "Dashboard",
        description: "Listing of media assets and performance metrics.",
        type: "Full-Stack Web App (React, Node.js, MongoDB)",
        link: "https://mb-front.vercel.app/",
    },
    {
        app: "Gallery",
        description: "Archive photos with shared family access.",
        type: "Full-Stack Web App (React, Node.js, S3)",
        link: "https://kteam.app/",
    },
];

const Projects = () => {
    return (
        <div style={{ paddingLeft: '2.5%', margin: '0px', maxWidth: '95%' }}>

            <div >
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
                        <Card className="custom-card">
                            <CardContent className="custom-card-content">
                                <Typography className="custom-card-title" style={{ fontWeight: '800' }} gutterBottom>
                                    {project.app}
                                </Typography>

                                <Typography className="custom-card-description" style={{ marginBottom: '5px', fontWeight: '600' }}>
                                    {project.description}
                                </Typography>

                                <Typography className="custom-card-description" >
                                    {project.type}
                                </Typography>


                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    className="custom-card-button"
                                    onClick={() => window.open(project.link, "_blank")}
                                >
                                    Visit Site
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Extra Animated Element */}
            <motion.div
                className="mt-12 text-center text-gray-300 text-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >

                <motion.div
                    className="w-12 h-12 bg-blue-500 rounded-full mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
            </motion.div>
        </div>

    );
};

export default Projects;
