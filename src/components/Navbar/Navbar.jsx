import React from "react";
import AvatarSVG from "../../assets/avatar.svg";
import "./Navbar.css";

function Navbar() {
    return (
        <nav>
            <div className="logo">
                <span>ResumeAI</span>
            </div>
            <div className="avatar">
                <img src={AvatarSVG} alt="User Avatar" />
            </div>
        </nav>
    );
}

export default Navbar;
