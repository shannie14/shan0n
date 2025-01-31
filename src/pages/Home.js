import { useState, useEffect } from "react";

import Projects from '../components/Projects';

//style
import '../components/styleSheets/sk.css';
import { BsJustify } from "react-icons/bs";

const Home = () => {

    const [headerImage, setHeaderImage] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const updateHeader = () => {
            if (window.innerWidth < 429) {
                setHeaderImage("https://greattakes.s3.us-east-2.amazonaws.com/sk/mobile_header.png");
            } else {
                setHeaderImage("https://greattakes.s3.us-east-2.amazonaws.com/sk/web_header.png");
            }
        };
        updateHeader();
        window.addEventListener("resize", updateHeader);
        return () => window.removeEventListener("resize", updateHeader);
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText("shannonkendall14@gmail.com")
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Hide notification after 2 seconds
            })
            .catch(err => console.error("Failed to copy:", err));
    };

    return (
        <div >
            <div className="header" style={{ backgroundImage: `url(${headerImage})` }}>

                <div className="email" onClick={copyToClipboard} style={{ cursor: "pointer" }}>
                    shannonkendall14@gmail.com
                </div>
                <div>Portfolio:  </div>
            </div >

            {copied && (
                <div className="copied-popup" style={{
                    fontFamily: '"Fira Code", serif',
                    position: "fixed",
                    top: "20px",
                    left: "50%",
                    width: "300px",
                    textAlign: "center",
                    transform: "translateX(-50%)",
                    background: "#4CAF50",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    zIndex: 1000
                }}>
                    Email copied to clipboard!
                </div>
            )
            }

            <div style={{ width: "100%", overflow: "hidden", padding: "0", margin: "0" }}>
                <Projects />
            </div>

            <div className="footerQuote">"Simplicity is the ultimate sophistication." – Leonardo da Vinci</div>

        </div >
    );

};

export default Home;

