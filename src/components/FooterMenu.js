import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdOutlineRestaurantMenu } from "react-icons/md";
import './styleSheets/sk.css'

const FooterMenu = () => {

    const navigate = useNavigate();

    const ClickToHome = () => {
        navigate("/", { replace: true });
        window.location.reload();
    };

    const ClickToDashboard = () => {
        navigate("/dashboard", { replace: true });
        window.location.reload();
    };

    return (
        <div>
            <div className="bottom-menu">
                <div className="menu-item" onClick={ClickToHome}>
                    <FaRegCalendarAlt className="menu-icon" />
                    <span className="menu-label">TODAY</span>
                </div>

                <div className="menu-item" onClick={ClickToDashboard}>
                    <MdOutlineRestaurantMenu className="menu-icon" />
                    <span className="menu-label">DASHBOARD</span>
                </div>

            </div>
        </div>
    )
}
export default FooterMenu