import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import "./BitePilotLogo.css";
import { Link } from "react-router-dom";

const BitePilotLogo = () => {
  const [phase, setPhase] = useState("entering"); // 'entering' → 'visible' → 'shrinking'

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("visible"), 100);        // slight delay to trigger animation
    const timer2 = setTimeout(() => setPhase("shrinking"), 3500);     // shrink after 3.5s

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className={`bitepilot-container ${phase}`}>
      <div className="logo-wrapper">
        <Link to={'/about'}>
        <img src={logo} alt="BitePilot Logo" className="logo" />
        </Link>
      </div>
      <h1 className="tagline">Your Food's Fast Lane.</h1>
    </div>
  );
};

export default BitePilotLogo;
