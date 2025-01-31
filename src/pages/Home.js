import { useState, useEffect } from "react";

//style
import '../components/styleSheets/sk.css';

const Home = () => {

    const [bgImage, setBgImage] = useState("");

    useEffect(() => {
        const updateBackground = () => {
            if (window.innerWidth < 768) {
                setBgImage("https://greattakes.s3.us-east-2.amazonaws.com/sk/mobile_BG.png");
            } else {
                setBgImage("https://greattakes.s3.us-east-2.amazonaws.com/sk/web_BG.png");
            }
        };

        updateBackground(); // Set initial background
        window.addEventListener("resize", updateBackground);

        return () => window.removeEventListener("resize", updateBackground);
    }, []);


    return (
        <div className="background">
            {/* <div className="content">Responsive Background</div> */}
            <style jsx>{`
        .background {
          width: 100vw;
          height: 100vh;
          background: url(${bgImage}) no-repeat center center / cover;
          transition: background 0.3s ease-in-out;
        }
        .content {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: white;
          font-size: 2rem;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
        </div>
    );

};

export default Home;

